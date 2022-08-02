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

interface Transaction {
  id: string;
  account_id: string;
  operation_name: string;
  type: string;
  value: number;
  created_at: string;
}

interface OrderedTransaction {
  date: string;
  transactions: Transaction[];
}

const orderTransactions = (extract: Transaction[]) => {
  const orderedTransactions: OrderedTransaction[] = [];
  extract.forEach((item) => {
    const date = item.created_at.split('T')[0];
    const formatedDate = `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`;
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
  const { transactions, error, loading } = useUser();
  const allTransactions = transactions ?? [];
  const orderedTransactions = orderTransactions(allTransactions);

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
            <div className="text-red-500 text-center">{error}</div>) : (
            <div className='overflow-auto h-4/6'>
              {orderedTransactions.map((transactionDay) => (
                <div className="transaction-day text-neutral-600" key={transactionDay.date}>
                  <p className=' w-5/6'>{transactionDay.date}</p>
                  {transactionDay.transactions.map((transactionItem) => (
                    <div
                      className='flex flex-row justify-between items-center text-neutral-400 mx-2'
                      key={transactionItem.id}
                      onClick={() => {
                        navigate(`/transaction/${transactionItem.id}`);
                      }}>
                      <p className='font-normal'>{transactionItem.operation_name}</p>
                      <p
                        className={transactionItem.type === 'debito' ? 'text-red-500' : 'text-green-500'}
                      >
                        {transactionItem?.type === 'credito' ? '+ $' : '- $'} R${transactionItem.value.toFixed(2).replace('.', ',')}
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
