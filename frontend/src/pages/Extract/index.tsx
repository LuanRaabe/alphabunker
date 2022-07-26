/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/30
 *
 * Author: Felype Nascimento
 */

import { WhiteCard } from '../../components/WhiteCard';
import { Bank } from 'phosphor-react';
import { useUser } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { bankAPI } from '../../libs/api';
import { ITransaction, OrderedTransaction } from '../../providers/UserProvider';

const orderTransactions = (extract: ITransaction[]) => {
  const orderedTransactions: OrderedTransaction[] = [];
  extract.forEach((item) => {
    const date = item.created_at.split('T')[0];
    const formatedDate = `
    ${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`;
    const dateFound = orderedTransactions.find((transaction) => {
      return transaction.date === formatedDate;
    });
    if (dateFound === undefined) {
      orderedTransactions.push({
        date: formatedDate,
        transactions: [item],
      });
    } else {
      dateFound.transactions.push(item);
    }
  });
  return orderedTransactions;
};

export const Extract = () => {
  const navigate = useNavigate();
  const { setBalance, setTransactions, orderedTransactions, setOrderedTransactions, loggedAccount, error, loading } = useUser();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (loggedAccount?.id === undefined) return;
      const response = await bankAPI.getTransactions(
        loggedAccount?.owners_cpf,
        loggedAccount?.password,
        loggedAccount?.account,
        loggedAccount?.account_digit,
        loggedAccount?.agency,
        loggedAccount?.agency_digit,
      );
      if (response.data.extract) {
        setOrderedTransactions?.(orderTransactions(response.data.extract) || []);
        setTransactions?.(response.data.extract || []);
      }
    };
    fetchTransactions();
    if (loggedAccount?.id === undefined) return;
    (async () => {
      const newBalance = await bankAPI.getBalance(
        loggedAccount?.owners_cpf,
        loggedAccount?.account,
        loggedAccount?.account_digit,
        loggedAccount?.agency,
        loggedAccount?.agency_digit,
        loggedAccount?.password,
      );
      setBalance?.(newBalance.data.balance);
    })();
  }, []);

  const transactionTypes = {
    saque: 'Saque',
    deposito: 'Depósito',
    transferência: 'Transferência',
    'transferência recebida': 'Transf. recebida',
    'transferência efetuada': 'Transf. enviada',
    taxa: 'Taxa',
  };

  return (
    <WhiteCard
      icon={<Bank className="w-6 h-6" />}
      title="Extrato de transações"
      blank
      className="font-normal h-3/6"
    >
      {loading ? (
        <div className="text-center">
          <div className="animate-pulse" />
        </div>
      ) : (
        <div className="w-full">
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="overflow-auto h-full w-full">
              {orderedTransactions?.map((transactionDay) => (
                <div
                  className="transaction-day text-neutral-600 dark:text-paragraph-light-100 w-full"
                  key={transactionDay.date}
                >
                  <p className=" w-5/6">{transactionDay.date}</p>
                  {transactionDay.transactions.map((transactionItem) => (
                    <div
                      className="flex flex-row justify-between items-center text-neutral-400 mx-2"
                      key={transactionItem.id}
                      onClick={() => {
                        navigate(`/transaction/${transactionItem.id}`);
                      }}
                    >
                      <p className="font-normal">
                        {transactionTypes[transactionItem.operation_name as keyof typeof transactionTypes]}
                      </p>
                      <p
                        className={
                          transactionItem.type === 'debito'
                            ? 'text-red-500'
                            : 'text-green-500'
                        }
                      >
                        {transactionItem?.type === 'credito' ? '+' : '-'} R$
                        {parseFloat(transactionItem.value).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </WhiteCard>
  );
};
