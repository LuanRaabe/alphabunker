import {
  ReactNode,
  createContext,
  useState,
  useContext,
} from 'react';
import { DataAccounts } from '../../Types';
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
  accounts: DataAccounts[];
  loggedAccount: AccountTypes;
  transactions: ITransaction[];
  orderedTransactions: OrderedTransaction[];
  balance: string;
  loading: boolean;
  error: string;
  setBalance: (balance: string) => void;
  setAccounts: (accounts: DataAccounts[]) => void;
  setOrderedTransactions: (orderedTransactions: OrderedTransaction[]) => void;
  setTransactions: (transactions: ITransaction[]) => void;
  loginUser: (cpf: string, password: string) => void;
  createAccount: (
    name: string,
    email: string,
    password: string,
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
    password: string,
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
  const [balance, setBalance] = useState<string>('0,00');
  const [accounts, setAccounts] = useState<DataAccounts[] | undefined>(
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
        if (response.messages.length > 0) {
          setError(response.messages[0]);
          setLoading(false);
          return;
        }
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
        setBalance(response.data.account.balance);
      })
      .catch((e) => setError(e));
    setLoading(false);
  }

  function createAccount(
    name: string,
    email: string,
    password: string,
    cpf: string,
    birthDate: string,
  ) {
    setLoading(true);
    bankAPI
      .createAccount(name, email, password, cpf, birthDate)
      .then((response) => {
        if (response.messages.length > 0) {
          setError(response.messages[0]);
          setLoading(false);
          return;
        }
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
    password: string,
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
        password
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

  return (
    <UserContext.Provider
      value={{
        user,
        balance,
        accounts,
        loggedAccount,
        transactions,
        orderedTransactions,
        loading,
        error,
        loginUser,
        setBalance,
        setAccounts,
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
