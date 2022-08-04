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
    const transactionTypes = {
      saque: 'Saque',
      deposito: 'Depósito',
      transferência: 'Transferência',
      'transferência recebida': 'Transferência recebida',
      'transferência enviada': 'Transferência enviada',
      taxa: 'Taxa',
    };
    return transactionTypes[foundTransaction?.operation_name as keyof typeof transactionTypes];
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
          foundTransaction?.type === 'credito' ? 'text-green-500' : 'text-red-500'
        }
      >
        {foundTransaction?.type === 'credito' ? '+ R$' : '- R$'}
        {foundTransaction?.value ? parseFloat(foundTransaction.value).toFixed(2).replace('.', ',') : '0.00'}
      </span>
    );
  }

  return (
    <div>
      <p>Tipo: {renderType()}</p>
      <p>Data: {renderDate()}</p>
      {isTransfer && (
        <>
          <p>Dados de {isSameUser ? 'destino' : 'origem'}</p>
          <p>Nome: </p>
          <p>Agência: </p>
          <p>Conta: </p>
        </>
      )}
      <div>Valor: {renderValue()}</div>
    </div>
  );
}
