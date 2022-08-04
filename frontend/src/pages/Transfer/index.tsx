import bankAPI from '../../libs/api';
import { ArrowsLeftRight } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  validateCpf,
} from '../../utils/Validators';

const TAB_INDEX = {
  AGENCY: 1,
  ACCOUNT: 2,
  CPF: 3,
  VALUE: 4,
  PASSWORD: 5,
  BUTTON: 6,
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
  const references = InputReferences();
  const navigate = useNavigate();
  const { loggedAccount, transactions } = useUser();
  const [modal, setModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [agencyNumber, setAgencyNumber] = useState<string>('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState<string>('R$0,00');
  const [password, setPassword] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setModal(true);
  }

  async function confirmSubmit() {
    if (!loggedAccount) {
      navigate('/');
      return;
    }
    const transferValue = amount.replace('R$', '').replaceAll('.', '').replace(',', '.');
    const response = await bankAPI.makeTransfer(
      loggedAccount.owners_cpf,
      loggedAccount.password,
      loggedAccount.account,
      loggedAccount.account_digit,
      loggedAccount.agency,
      loggedAccount.agency_digit,
      transferValue,
      cpf,
      accountNumber.split('-')[0],
      accountNumber.split('-')[1],
      agencyNumber.split('-')[0],
      agencyNumber.split('-')[1],
    );
    if (response.messages.length > 0) {
      console.log('erro na transferencia');
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
          title="Transferência"
          setModal={setModal}
          handleConfirmModal={confirmSubmit}
        />
      )}
      <WhiteCard
        icon={<ArrowsLeftRight className="w-5 h-5" />}
        title="Transferência"
        blank={true}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <span className="text-base font-normal text-paragraph-dark dark:text-header-light">Origem</span>
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
          <span className="text-base font-normal text-paragraph-dark dark:text-header-light">Destino</span>
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
            name="cpf"
            placeholder="CPF"
            type="text"
            value={cpf}
            onChange={setCpf}
            validators={[
              { validate: validateCpf, errorMessage: 'CPF inválido' },
            ]}
            ref={references.getOrCrateRef('cpf')}
            callback={setDisableSubmit}
            tabIndex={TAB_INDEX.CPF}
          />
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
            label="Transferir"
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
