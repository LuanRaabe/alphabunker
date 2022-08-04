import { UploadSimple } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import { SmallInput } from '../../components/Form/Panel/SmallInput';
import { Modal } from '../../components/Modal';
import { WhiteCard } from '../../components/WhiteCard';
import bankAPI from '../../libs/api';
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
 * Archive: src/pages/Deposit.tsx
 *
 * Description: Deposit page
 *
 * Date: 2022/07/30
 *
 * Author: Rey, Luan
 */

export const Deposit = () => {
  const references = InputReferences();
  const { loggedAccount } = useUser();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('R$0,00');
  const [password, setPassword] = useState<string>('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setModal(true);
  }

  async function confirmSubmit() {
    if (!loggedAccount) {
      navigate('/');
      return;
    }
    const {
      owners_cpf,
      agency,
      agency_digit,
      account,
      account_digit } = loggedAccount;
    const depositValue = amount.replace('R$', '').replaceAll('.', '').replace(',', '.');
    const response = await bankAPI.makeDeposit(
      owners_cpf,
      account,
      account_digit,
      agency,
      agency_digit,
      depositValue);
    console.log(response);
    if (response.messages.length > 0) {
      console.log('erro no deposito');
      setError(response.messages[0]);
      setModal(false);
      return;
    }
    setModal(false);
    navigate('/extract');
  }

  return (
    <>
      {modal && (
        <Modal
          title="Depósito"
          setModal={setModal}
          handleConfirmModal={confirmSubmit}
        />
      )}
      <WhiteCard
        icon={<UploadSimple className="w-5 h-5" />}
        title="Depósito"
        blank={true}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <span className="text-base font-normal text-paragraph-dark dark:text-header-light">Dados para depósito</span>
          <div className="flex flex-row justify-between mb-4">
            <SmallInput
              title="Agência"
              isDisabled={true}
              value={loggedAccount?.agency + '-' + loggedAccount?.agency_digit}
            />
            <SmallInput
              title="Conta"
              isDisabled={true}
              value={loggedAccount?.account + '-' + loggedAccount?.account_digit}
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
            type="password"
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
            label="Depositar"
            type="submit"
            isDisabled={disableSubmit}
            tabIndex={TAB_INDEX.BUTTON}
          />
          {error && <span className="text-red-600">{error}</span>}
        </form>
      </WhiteCard>
    </>
  );
};
