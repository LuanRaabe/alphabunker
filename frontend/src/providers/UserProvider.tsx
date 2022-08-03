import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import bankAPI from '../libs/api';
import { cookie } from '../libs/cookie';

//import { api, createSession } from '../libs/api';

interface UserTypes {
  name: string;
  email: string;
  cpf: string;
  birthdate: string;
  password: string;
  photo?: string;
}

interface AccountTypes {
  id?: string;
  owners_cpf: string;
  agency: string;
  password: string;
  agency_digit: string;
  account: string;
  account_digit: string;
  balance: string;
}

export interface ITransaction {
  id: string;
  account_id: string;
  operation_name: string;
  type: string;
  value: string;
  created_at: string;
}

export interface OrderedTransaction {
  date: string;
  transactions: ITransaction[];
}

interface ContextTypes {
  user: UserTypes;
  accounts: AccountTypes[];
  loggedAccount: AccountTypes;
  transactions: ITransaction[];
  orderedTransactions: OrderedTransaction[];
  loading: boolean;
  error: string;
  setOrderedTransactions: (orderedTransactions: OrderedTransaction[]) => void;
  setTransactions: (transactions: ITransaction[]) => void;
  loginUser: (cpf: string, password: string) => void;
  createAccount: (
    name: string,
    email: string,
    cpf: string,
    birthDate: string,
  ) => void;
  makeDeposit: (
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: string,
  ) => void;
  makeWithdraw: (
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: string,
  ) => void;
  makeTransfer: (
    ownerCpf: string,
    ownerPassword: string,
    onweraccount: string,
    onweraccountDigit: string,
    onweragency: string,
    onweragencyDigit: string,
    value: string,
    transferCpf: string,
    transferAccount: string,
    transferAccountDigit: string,
    transferAgency: string,
    transferAgencyDigit: string,
  ) => void;
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<UserTypes | undefined>(undefined);
  const [accounts, setAccounts] = useState<AccountTypes[] | undefined>(
    undefined,
  );
  const [loggedAccount, setLoggedAccount] = useState<AccountTypes | undefined>(
    undefined,
  );
  const [orderedTransactions, setOrderedTransactions] = useState<OrderedTransaction[]>([]);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);

  function loginUser(cpf: string, password: string) {
    setLoading(true);
    console.log('antes do login');
    bankAPI
      .createSession(cpf, password)
      .then((response) => {
        const { name, email, birthdate, photo } = response.data.owner;
        setUser({ name, email, cpf: response.data.account.owners_cpf, birthdate, password, photo });
        setLoggedAccount({
          id: response.data.account.id,
          owners_cpf: response.data.account.owners_cpf,
          agency: response.data.account.agency,
          password,
          agency_digit: response.data.account.agency_digit,
          account: response.data.account.account,
          account_digit: response.data.account.account_digit,
          balance: response.data.account.balance,
        });
        //cookie.ObjectToCookies(user); // TODO: n funfa tem que ve
      })
      .catch((e) => setError(e));
    setLoading(false);
  }

  function createAccount(
    name: string,
    email: string,
    cpf: string,
    birthDate: string,
  ) {
    setLoading(true);
    bankAPI
      .createAccount(name, email, cpf, birthDate)
      .then((response) => {
        // TODO: implementar modal para senha
        cookie.ObjectToCookies(user);
        cookie.ObjectToCookies(response.data.account);
      })
      .catch((e) => setError(e));
    setLoading(false);
  }

  function makeDeposit(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    valueTransaction: string,
  ) {
    setLoading(true);
    bankAPI
      .makeDeposit(
        ownerCpf,
        account,
        accountDigit,
        agency,
        agencyDigit,
        valueTransaction,
      )
      .catch((e) => setError(e));
    setLoading(false);
  }
  function makeWithdraw(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    valueTransaction: string,
  ) {
    setLoading(true);
    bankAPI
      .makeWithdraw(
        ownerCpf,
        account,
        accountDigit,
        agency,
        agencyDigit,
        valueTransaction,
      )
      .catch((e) => setError(e));
    setLoading(false);

  }

  function makeTransfer(
    ownerCpf: string,
    ownerPassword: string,
    onweraccount: string,
    onweraccountDigit: string,
    onweragency: string,
    onweragencyDigit: string,
    value: string,
    transferCpf: string,
    transferAccount: string,
    transferAccountDigit: string,
    transferAgency: string,
    transferAgencyDigit: string,
  ) {
    setLoading(true);
    bankAPI
      .makeTransfer(
        ownerCpf,
        ownerPassword,
        onweraccount,
        onweraccountDigit,
        onweragency,
        onweragencyDigit,
        value,
        transferCpf,
        transferAccount,
        transferAccountDigit,
        transferAgency,
        transferAgencyDigit,
      )
      .catch((e) => setError(e));
    setLoading(false);
  }

  // useEffect(() => {
  //   setUser({
  //     name: 'Fulano',
  //     email: 'fulano@mail.com',
  //     cpf: '123456789',
  //     birthDate: '01/01/2000',
  //   });
  //   setAccounts([
  //     {
  //       id: '1',
  //       cpf: '34515222617',
  //       balance: '234',
  //       agency: '123',
  //       agencyDigit: '6',
  //       account: '9876',
  //       accountDigit: '5',
  //     },
  //     {
  //       id: '2',
  //       cpf: '34515552617',
  //       balance: '321',
  //       agency: '564',
  //       agencyDigit: '6',
  //       account: '6658',
  //       accountDigit: '5',
  //     },
  //   ]);
  //   setLoggedAccount({
  //     id: '1',
  //     cpf: '34515222617',
  //     balance: '234',
  //     agency: '123',
  //     agencyDigit: '6',
  //     account: '9876',
  //     accountDigit: '5',
  //   });
  //   setTansactions([
  //     {
  //       id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       value: 60,
  //       type: 'debito',
  //       created_at: '2022-07-29T12:24:01.916Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 6000,
  //       created_at: '2022-07-29T12:24:01.728Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 300,
  //       created_at: '2022-07-29T12:24:01.728Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 30,
  //       created_at: '2022-07-29T12:24:01.728Z',
  //     },
  //     {
  //       id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 60,
  //       created_at: '2022-07-28T12:24:01.916Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 6000,
  //       created_at: '2022-07-28T12:24:01.728Z',
  //     },
  //     {
  //       id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 60,
  //       created_at: '2022-07-27T12:24:01.916Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 6000,
  //       created_at: '2022-07-27T12:24:01.728Z',
  //     },
  //     {
  //       id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 60,
  //       created_at: '2022-07-29T12:24:01.916Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 6000,
  //       created_at: '2022-07-29T12:24:01.728Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 300,
  //       created_at: '2022-07-29T12:24:01.728Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 30,
  //       created_at: '2022-07-29T12:24:01.728Z',
  //     },
  //     {
  //       id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 60,
  //       created_at: '2022-07-28T12:24:01.916Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 6000,
  //       created_at: '2022-07-28T12:24:01.728Z',
  //     },
  //     {
  //       id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'taxa',
  //       type: 'debito',
  //       value: 60,
  //       created_at: '2022-07-27T12:24:01.916Z',
  //     },
  //     {
  //       id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
  //       account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
  //       operation_name: 'deposito',
  //       type: 'credito',
  //       value: 6000,
  //       created_at: '2022-07-27T12:24:01.728Z',
  //     },
  //   ]);
  // }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        accounts,
        loggedAccount,
        transactions,
        orderedTransactions,
        loading,
        error,
        loginUser,
        createAccount,
        makeDeposit,
        makeWithdraw,
        makeTransfer,
        setTransactions,
        setOrderedTransactions
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
