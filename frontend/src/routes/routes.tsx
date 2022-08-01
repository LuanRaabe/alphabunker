import { ReactNode } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

import { Home } from '../pages/Home';
import { Extract } from '../pages/Extract';
import { Transfer } from '../pages/Transfer';
import { Deposit } from '../pages/Deposit';
import { Withdraw } from '../pages/Withdraw';
import { Profile } from '../pages/Profile';
import { Transaction } from '../pages/Transaction';
import { Menu } from '../components/Menu/Menu';

interface ChildrenTypes {
  children: ReactNode;
}

const Private = ({ children }: ChildrenTypes): JSX.Element => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">{children}</div>
  );
};

const Public = ({ children }: ChildrenTypes): JSX.Element => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/extract" />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">{children}</div>
  );
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <Public>
            <Home />
          </Public>
        }
      />
      <Route
        path="/deposit"
        element={
          <Private>
            <Menu />
            <Deposit />
          </Private>
        }
      />
      <Route
        path="/extract"
        element={
          <Private>
            <Menu />
            <Extract />
          </Private>
        }
      />
      <Route
        path="/transfer"
        element={
          <Private>
            <Menu />
            <Transfer />
          </Private>
        }
      />
      <Route
        path="/withdraw"
        element={
          <Private>
            <Menu />
            <Withdraw />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route path="/transaction/:transactionId" element={<Transaction />} />

      <Route path="*" element={<h1 className="text-white">Error 404</h1>} />
    </Routes>
  );
};
