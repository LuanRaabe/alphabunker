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
  const { user } = useUser();
  const [transactions, setTransactions] = useState<OrderedTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const fetchTransactions = async () => {
    setLoading(true);
    if (user !== undefined) {
      const mockUser = user.loggedAccount;
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
      const dateFound = orderedTransactions.find((transaction) => {
        return transaction.date === date;
      });
      if (dateFound === undefined) {
        orderedTransactions.push({
          date,
          transactions: [item],
        });
      } else {
        dateFound.transactions.push(item);
      }
    });
    return orderedTransactions;
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <WhiteCard
      icon={<Bank className="w-6 h-6" />}
      title="Extrato de transações"
      blank={true}
    >
      {loading ? (
        <div className="text-center">
          <div className="spinner" />
        </div>
      ) : (
        <div className="text-center">
          <div className="text-red-600">{error}</div>
        </div>
      )}
    </WhiteCard>
  );
};
