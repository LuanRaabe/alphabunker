import { ArrowsLeftRight } from 'phosphor-react';
import { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { SmallInput } from '../../components/Form/Panel/SmallInput';
import { WhiteCard } from '../../components/WhiteCard';
import { useUser } from '../../providers/UserProvider';
import {
  maskAccountNumber,
  maskAgencyNumber,
  maskValue,
} from '../../utils/Masks';
import { InputReferences } from '../../utils/References';
import { validateValue, validatePassword } from '../../utils/Validators';

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
  const references = InputReferences();
  const { loggedAccount } = useUser();
  const [agencyNumber, setAgencyNumber] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.00');
  const [password, setPassword] = useState<string>('');

  function handleSubmit() {
    //request api
    //se der erro
    // references.setError(name, mensagemdeerro);
    //
  }

  return (
    <WhiteCard
      icon={<ArrowsLeftRight className="w-5 h-5" />}
      title="Transferência"
      blank={true}
    >
      <form>
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
          name="value"
          placeholder="Valor"
          type="text"
          value={amount}
          onChange={setAmount}
          mask={maskValue}
          validators={[
            { validate: validateValue, errorMessage: 'Valor inválido' },
          ]}
          ref={references.getOrCrateRef('value')}
        />
        <Input
          name="password"
          placeholder="Senha"
          type="text"
          value={password}
          onChange={setPassword}
          validators={[
            { validate: validatePassword, errorMessage: 'Senha inválida' },
          ]}
          ref={references.getOrCrateRef('password')}
        />
        <Button
          category="primary"
          label="Transferir"
          onClick={() => handleSubmit()}
        />
      </form>
    </WhiteCard>
  );
};
