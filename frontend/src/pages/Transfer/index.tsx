import { ArrowsLeftRight } from 'phosphor-react';
import { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { SmallInput } from '../../components/Form/Panel/SmallInput';
import { WhiteCard } from '../../components/WhiteCard';
import { useUser } from '../../providers/UserProvider';
import { maskAccountNumber, maskAgencyNumber } from '../../utils/Masks';

/**
 * Archive: src/pages/Transfer.tsx
 *
 * Description: Transfer page
 *
 * Date: 2022/07/30
 *
 * Author: Rey, Luan
 */

export const Transfer = () => {
  const { user, loggedAccount } = useUser();
  const [agencyNumber, setAgencyNumber] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <WhiteCard
      icon={<ArrowsLeftRight className="w-5 h-5" />}
      title="Transferência"
      blank={true}
    >
      <span className="text-base font-normal">Origem</span>
      <div className="flex flex-row justify-between mb-4">
        <SmallInput
          title="Agência"
          isDisabled={true}
          value={loggedAccount?.agency + '-' + loggedAccount?.agencyDigit}
        />
        <SmallInput
          title="Conta"
          isDisabled={true}
          value={loggedAccount?.account + '-' + loggedAccount?.accountDigit}
        />
      </div>
      <span className="text-base font-normal">Destino</span>
      <div className="flex flex-row justify-between">
        <SmallInput
          title="Agência"
          value={agencyNumber}
          onChange={setAgencyNumber}
          mask={maskAgencyNumber}
          length={6}
        />
        <SmallInput
          title="Conta"
          value={accountNumber}
          onChange={setAccountNumber}
          mask={maskAccountNumber}
          length={7}
        />
      </div>
      <Input
        placeholder="Valor"
        type="text"
        value={amount}
        onChange={setAmount}
      />
      <Input
        placeholder="Senha"
        type="text"
        value={password}
        onChange={setPassword}
      />
      <Button category="primary" label="Transferir" />
    </WhiteCard>
  );
};
