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
  loading: boolean;
}

interface UserTypes {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  photo?: string;
  accounts: AccountTypes[];
  loggedAccount: AccountTypes;
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

export const UserContext = createContext<Partial<ContextTypes>>({});

interface UserProviderTypes {
  children: ReactNode;
}


export const UserProvider = ({ children }: UserProviderTypes) => {
  const [user, setUser] = useState<UserTypes | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser({
      name: 'Fulano',
      email: 'fulano@mail.com',
      cpf: '123456789',
      birthDate: '01/01/2000',
      accounts: [
        {
          id: '1',
          cpf: '34515222617',
          password: 'jubileu',
          balance: '234',
          agency: '123',
          agencyDigit: '6',
          account: '9876',
          accountDigit: '5'
        },
        {
          id: '2',
          cpf: '34515552617',
          password: 'jubileu',
          balance: '321',
          agency: '564',
          agencyDigit: '6',
          account: '6658',
          accountDigit: '5'
        },
      ],
      loggedAccount: {
        id: '1',
        cpf: '34515222617',
        password: 'jubileu',
        balance: '234',
        agency: '123',
        agencyDigit: '6',
        account: '9876',
        accountDigit: '5'
      },
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
