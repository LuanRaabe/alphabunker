import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

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
  extract: number;
  agencyNumber: string;
  accountNumber: string;
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
          extract: 234,
          agencyNumber: '123',
          accountNumber: '987654321',
        },
        {
          id: '2',
          extract: 100,
          agencyNumber: '321',
          accountNumber: '123456789',
        },
      ],
      loggedAccount: {
        id: '1',
        extract: 234,
        agencyNumber: '123',
        accountNumber: '987654321',
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
