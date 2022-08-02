import { DownloadSimple } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { SmallInput } from '../../components/Form/Panel/SmallInput';
import { Modal } from '../../components/Modal';
import { WhiteCard } from '../../components/WhiteCard';
import { useUser } from '../../providers/UserProvider';
import { maskValue } from '../../utils/Masks';
import { InputReferences } from '../../utils/References';
import { validateValue, validatePassword } from '../../utils/Validators';

const TAB_INDEX = {
  VALUE: 1,
  PASSWORD: 2,
  BUTTON: 3,
};

/**
 * Archive: src/pages/Withdraw.tsx
 *
 * Description: Withdraw page
 *
 * Date: 2022/07/30
 *
 * Author: Rey, Luan
 */

export const Withdraw = () => {
  const [modal, setModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const references = InputReferences();
  const { loggedAccount } = useUser();
  const [amount, setAmount] = useState<string>('0.00');
  const [password, setPassword] = useState<string>('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setModal(true);
  }

  function confirmSubmit() {
    /* const response = request;
    const {data, error} = response;
    if(error){
      const {name, message} = error;
      references.setError(name, message);
      return;
    }
    navigate('/transaction', {state: {transactionId: });
    */
  }

  return (
    <>
      {modal && (
        <Modal
          title="Saque"
          setModal={setModal}
          handleConfirmModal={confirmSubmit}
        />
      )}
      <WhiteCard
        icon={<DownloadSimple className="w-5 h-5" />}
        title="Saque"
        blank={true}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <span className="text-base font-normal">Dados para saque</span>
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
            callback={setDisableSubmit}
            tabIndex={TAB_INDEX.VALUE}
            autoFocus
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
            callback={setDisableSubmit}
            tabIndex={TAB_INDEX.PASSWORD}
          />
          <Button
            category="primary"
            label="Sacar"
            type="submit"
            isDisabled={disableSubmit}
            tabIndex={TAB_INDEX.BUTTON}
          />
        </form>
      </WhiteCard>
    </>
  );
};
