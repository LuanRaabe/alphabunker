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
  birthDate: string;
  photo?: string;
}

interface AccountTypes {
  id: string;
  cpf: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  balance: string;
}

interface ITransaction {
  id: string;
  account_id: string;
  operation_name: string;
  type: string;
  value: number;
  created_at: string;
}

interface ContextTypes {
  user: UserTypes;
  accounts: AccountTypes[];
  loggedAccount: AccountTypes;
  transactions: ITransaction[];
  loading: boolean;
  error: string;
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
    value: number,
  ) => void;
  makeWithdraw: (
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: number,
  ) => void;
  makeTransfer: (
    ownerCpf: string,
    ownerPassword: string,
    onweraccount: string,
    onweraccountDigit: string,
    onweragency: string,
    onweragencyDigit: string,
    value: number,
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
  const [transactions, setTansactions] = useState<
    ITransaction[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  function loginUser(cpf: string, password: string) {
    setLoading(true);
    bankAPI
      .createSession(cpf, password)
      .then((response) => {
        const { name, email, cpf, birthDate, photo } = response.data.owner;
        setUser({ name, email, cpf, birthDate, photo });
        cookie.ObjectToCookies(user);
      })
      .then(() => setLoading(false))
      .catch((e) => setError(e));
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
        const { name, email, cpf, birthDate, photo } = response.data.owner;
        setUser({ name, email, cpf, birthDate, photo });
        cookie.ObjectToCookies(user);
        const {
          id,
          ownerCpf,
          account,
          accountDigit,
          agency,
          agencyDigit,
          balance,
        } = response.data.account;
        setLoggedAccount({
          id,
          cpf: ownerCpf,
          account,
          accountDigit,
          agency,
          agencyDigit,
          balance,
        });
        cookie.ObjectToCookies(account);
      })
      .then(() => setLoading(false))
      .catch((e) => setError(e));
  }

  function makeDeposit(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    valueTransaction: number,
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
      .then(() => {
        setLoading(false);
      })
      .catch((e) => setError(e));
  }

  function makeWithdraw(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    valueTransaction: number,
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
      .then(() => {
        setLoading(false);
      })
      .catch((e) => setError(e));
  }

  function makeTransfer(
    ownerCpf: string,
    ownerPassword: string,
    onweraccount: string,
    onweraccountDigit: string,
    onweragency: string,
    onweragencyDigit: string,
    value: number,
    transferCpf: string,
    transferAccount: string,
    transferAccountDigit: string,
    transferAgency: string,
    transferAgencyDigit: string,
  ) {
    setLoading(true);
    bankAPI.makeTransfer(
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
  }

  useEffect(() => {
    setUser({
      name: 'Fulano',
      email: 'fulano@mail.com',
      cpf: '123456789',
      birthDate: '01/01/2000',
    });
    setAccounts([
      {
        id: '1',
        cpf: '34515222617',
        balance: '234',
        agency: '123',
        agencyDigit: '6',
        account: '9876',
        accountDigit: '5',
      },
      {
        id: '2',
        cpf: '34515552617',
        balance: '321',
        agency: '564',
        agencyDigit: '6',
        account: '6658',
        accountDigit: '5',
      },
    ]);
    setLoggedAccount({
      id: '1',
      cpf: '34515222617',
      balance: '234',
      agency: '123',
      agencyDigit: '6',
      account: '9876',
      accountDigit: '5',
    });
    setTansactions([
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        value: 60,
        type: 'debito',
        created_at: '2022-07-29T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 6000,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 300,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 30,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 60,
        created_at: '2022-07-28T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 6000,
        created_at: '2022-07-28T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 60,
        created_at: '2022-07-27T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 6000,
        created_at: '2022-07-27T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 60,
        created_at: '2022-07-29T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 6000,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 300,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 30,
        created_at: '2022-07-29T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 60,
        created_at: '2022-07-28T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 6000,
        created_at: '2022-07-28T12:24:01.728Z',
      },
      {
        id: '3ad28711-ba20-4aec-85a6-4646fd8a815f',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'taxa',
        type: 'debito',
        value: 60,
        created_at: '2022-07-27T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        type: 'credito',
        value: 6000,
        created_at: '2022-07-27T12:24:01.728Z',
      },
    ]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        accounts,
        loggedAccount,
        transactions,
        loading,
        error,
        loginUser,
        createAccount,
        makeDeposit,
        makeWithdraw,
        makeTransfer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
