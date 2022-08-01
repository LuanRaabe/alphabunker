import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

//import { api, createSession } from '../libs/api';

interface ContextTypes {
  user: UserTypes;
  accounts: AccountTypes[];
  loggedAccount: AccountTypes;
  transactions: TransactionTypes[];
  loading: boolean;
}

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
  password: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  balance: string;
}

interface TransactionTypes {
  id: string;
  account_id: string;
  operation_name: string;
  value: number;
  created_at: string;
}

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderTypes) => {
  const [user, setUser] = useState<UserTypes | undefined>(undefined);
  const [accounts, setAccounts] = useState<AccountTypes[] | undefined>(
    undefined,
  );
  const [loggedAccount, setLoggedAccount] = useState<AccountTypes | undefined>(
    undefined,
  );
  const [transactions, setTansactions] = useState<
    TransactionTypes[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

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
        password: 'jubileu',
        balance: '234',
        agency: '123',
        agencyDigit: '6',
        account: '9876',
        accountDigit: '5',
      },
      {
        id: '2',
        cpf: '34515552617',
        password: 'jubileu',
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
      password: 'jubileu',
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
        created_at: '2022-07-29T12:24:01.916Z',
      },
      {
        id: 'f6903dc3-fc8d-4a30-b1ec-90684bda2e23',
        account_id: '0cb63ab4-7763-4056-8540-b4d9335b87cb',
        operation_name: 'deposito',
        value: 6000,
        created_at: '2022-07-29T12:24:01.728Z',
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
