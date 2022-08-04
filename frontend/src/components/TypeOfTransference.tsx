/* eslint-disable indent */
import { useUser } from '../providers/UserProvider';

interface TypeOfTransferenceProps {
  id: string;
}

const TRANSACTION_TYPES = {
  transfer: 'Transferência',
  deposit: 'Depósito',
  withdrawn: 'Saque',
};

type keyOfTT = keyof typeof TRANSACTION_TYPES;

/**
 * Archive: src/components/TypeOfTransference.tsx
 *
 * Description: TypeOfTransference component
 *
 * Date: 2022/07/01
 *
 * Author: Luan
 */

export function TypeOfTransference(props: TypeOfTransferenceProps) {
  const { loggedAccount, transactions } = useUser();
  const foundTransaction = transactions?.find(
    (transaction) => transaction.id === props.id,
  );
  const type = TRANSACTION_TYPES[foundTransaction?.operation_name as keyOfTT];
  const isTransfer = type === TRANSACTION_TYPES.transfer;
  const isSameUser = loggedAccount?.id === foundTransaction?.account_id;

  function renderType() {
    const type = foundTransaction?.operation_name;
    switch (type) {
      case 'saque':
        return 'Saque';
      case 'deposito':
        return 'Depósito';
      case 'transfêrencia recebida':
        return 'Transferência recebida';
      case 'transfêrencia enviada':
        return 'Transferência enviada';
      case 'taxa':
        return 'Taxa';
    }
  }

  function renderDate() {
    const today = new Date(foundTransaction?.created_at ?? '');
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
    const yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  function renderValue() {
    return (
      <span
        className={
          foundTransaction?.type === 'credito' ? 'text-green-500' : 'text-red-500'}
      >
        {foundTransaction?.type === 'credito' ? '+ R$' : '- R$'}
        {foundTransaction?.value ? parseFloat(foundTransaction.value).toFixed(2).replace('.', ',') : '0.00'}
      </span>
    );
  }

  return (
    <div className=' bg-body-light-100 dark:bg-body-dark'>
      <p className='text-paragraph-light-100 flex'>Tipo: {renderType()}</p>
      <p className='text-paragraph-light-200'>Data: {renderDate()}</p>
      {isTransfer && (
        <>
          <p className='text-paragraph-light-100'>Dados de {isSameUser ? 'destino' : 'origem'}</p>
          <p className='text-paragraph-light-100'>Nome: </p>
          <p className='text-paragraph-light-100'>Agência: </p>
          <p className='text-paragraph-light-100'>Conta: </p>
        </>
      )}
      <div className='text-paragraph-light-100'>Valor: {renderValue()}</div>
    </div>
  );
}
