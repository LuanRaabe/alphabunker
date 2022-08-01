import { ArrowsLeftRight } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { SmallInput } from '../../components/Form/Panel/SmallInput';
import { Modal } from '../../components/Modal';
import { WhiteCard } from '../../components/WhiteCard';
import { useUser } from '../../providers/UserProvider';
import {
  maskAccountNumber,
  maskAgencyNumber,
  maskValue,
} from '../../utils/Masks';
import { InputReferences } from '../../utils/References';
import {
  validateValue,
  validatePassword,
  validateAgency,
  validateAccount,
} from '../../utils/Validators';

const TAB_INDEX = {
  AGENCY: 1,
  ACCOUNT: 2,
  VALUE: 3,
  PASSWORD: 4,
  BUTTON: 5,
};

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
  const [modal, setModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const references = InputReferences();
  const { loggedAccount } = useUser();
  const [agencyNumber, setAgencyNumber] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.00');
  const [password, setPassword] = useState<string>('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setModal(true);
  }

  function confirSubmit() {
    /* const response = request;
    const {data, error} = response;
    if(error){
      const {name, message} = error;
      references.setError(name, message);
      return;
    }

    */
  }

  return (
    <>
      {modal && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={confirSubmit}
        />
      )}
      <WhiteCard
        icon={<ArrowsLeftRight className="w-5 h-5" />}
        title="Transferência"
        blank={true}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
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
              validators={[
                {
                  validate: validateAgency,
                  errorMessage: 'Número inválido',
                },
              ]}
              callback={setDisableSubmit}
              tabIndex={TAB_INDEX.AGENCY}
              autoFocus
            />
            <SmallInput
              title="Conta"
              value={accountNumber}
              onChange={setAccountNumber}
              mask={maskAccountNumber}
              length={7}
              validators={[
                {
                  validate: validateAccount,
                  errorMessage: 'Número inválido',
                },
              ]}
              callback={setDisableSubmit}
              tabIndex={TAB_INDEX.ACCOUNT}
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
            label="Transferir"
            type="submit"
            isDisabled={disableSubmit}
            tabIndex={TAB_INDEX.BUTTON}
          />
        </form>
      </WhiteCard>
    </>
  );
};
