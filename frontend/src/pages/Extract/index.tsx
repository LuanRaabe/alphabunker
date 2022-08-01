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
import { useEffect, useState } from 'react';
import bankAPI from '../../libs/api';

interface Transaction {
  id: string;
  account_id: string;
  operation_name: string;
  value: number;
  created_at: string;
}

interface OrderedTransaction {
  date: string;
  transactions: Transaction[];
}

export const Extract = () => {
  const { user, loggedAccount } = useUser();
  const [transactions, setTransactions] = useState<OrderedTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchTransactions = async () => {
    setLoading(true);
    if (user !== undefined) {
      const mockUser = {
        id: '1',
        cpf: '34515222617',
        password: 'jubileu',
        balance: '234',
        agency: '123',
        agencyDigit: '6',
        account: '9876',
        accountDigit: '5',
      };
      try {
        const response = await bankAPI.getTransactions(
          mockUser.cpf,
          mockUser.account,
          mockUser.accountDigit,
          mockUser.agency,
          mockUser.agencyDigit,
        );
        setTransactions(orderTransactions(response.data.extract));
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

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

  useEffect(() => {
    const mockTransactions = [
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        created_at: '2022-07-29T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 300,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 30,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        created_at: '2022-07-28T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-28T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        created_at: '2022-07-27T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-27T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        created_at: '2022-07-29T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 300,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 30,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        created_at: '2022-07-28T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-28T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        created_at: '2022-07-27T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-27T12:24:01.728Z',
      },
    ];
    setTransactions(orderTransactions(mockTransactions));
  }, []);

  return (
    <WhiteCard
      icon={<Bank className="w-6 h-6" />}
      title="Extrato de transações"
      blank={true}
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
            <div className='overflow-auto h-5/6'>
              {transactions.map((transactionDay) => (
                <div className="transaction-day text-neutral-600" key={transactionDay.date}>
                  <p className='font-semibold w-5/6'>{transactionDay.date}</p>
                  {transactionDay.transactions.map((transactionItem) => (
                    <div className='flex flex-row justify-between items-center text-neutral-400' key={transactionItem.id}>
                      <p>{transactionItem.operation_name}</p>
                      <p>{transactionItem.value}</p>
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
