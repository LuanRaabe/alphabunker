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
  const transaction = transactions?.find(
    (transaction) => transaction.id === props.id,
  );
  const type = TRANSACTION_TYPES[transaction?.operation_name as keyOfTT];
  const isTransfer = type === TRANSACTION_TYPES.transfer;
  const isSameUser = loggedAccount?.id === transaction?.account_id;

  function renderType() {
    if (isTransfer) {
      return type + ' - ' + isSameUser ? 'Enviada' : 'Recebida';
    }
    return type;
  }

  function renderDate() {
    const today = new Date(transaction?.created_at ?? '');
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
    const yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  function renderValue() {
    const isPositive = (transaction?.value || 0) > 0;
    return (
      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {isPositive ? '+ $' : '- $'}
        {transaction?.value}
      </span>
    );
  }

  return (
    <div>
      <span>Tipo: {renderType()}</span>
      <span>Data: {renderDate()}</span>
      {isTransfer && (
        <>
          <span>Dados de {isSameUser ? 'destino' : 'origem'}</span>
          <span>Nome: </span>
          <span>Agência: </span>
          <span>Conta: </span>
        </>
      )}
      <div>Valor: {renderValue()}</div>
    </div>
  );
}
