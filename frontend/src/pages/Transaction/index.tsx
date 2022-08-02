import { Receipt } from 'phosphor-react';
import { useParams } from 'react-router-dom';
import { TypeOfTransference } from '../../components/TypeOfTransference';
import { WhiteCard } from '../../components/WhiteCard';
/**
 * Archive: src/pages/Extract.tsx
 *
 * Description: Extract page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Transaction = () => {
  const { transactionId } = useParams<Record<string, string | undefined>>();
  console.log(transactionId);

  return (
    <WhiteCard
      icon={<Receipt className="w-5 h-5" />}
      title="Comprovante da transação"
      childs={[<TypeOfTransference key={1} id={transactionId || ''} />]}
    />
  );
};
