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

export const Extract = () => {


  return (
    <WhiteCard
      icon={<Bank className="w-6 h-6" />}
      title="Extrato de transações"
      blank={true}
    >
      <div >

      </div>
    </WhiteCard>
  );
};
