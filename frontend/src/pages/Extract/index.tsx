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
import { useEffect, useState } from 'react';
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
  const { setTransactions, orderedTransactions, setOrderedTransactions, loggedAccount, error, loading } = useUser();

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
  }, []);

  return (
    <WhiteCard
      icon={<Bank className="w-6 h-6" />}
      title="Extrato de transações"
      blank
      className="font-semibold h-3/6"
    >
      {loading ? (
        <div className="text-center">
          <div className="animate-pulse" />
        </div>
      ) : (
        <div>
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <div className="overflow-auto">
              {orderedTransactions?.map((transactionDay) => (
                <div
                  className="transaction-day text-neutral-600"
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
                        {transactionItem.operation_name}
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
