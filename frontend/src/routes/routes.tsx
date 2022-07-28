import { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '../providers/UserProvider';

import { Home } from '../pages/Home';
import { Extract } from '../pages/Extract';
import { Transfer } from '../pages/Transfer';
import { Deposit } from '../pages/Deposit';
import { Withdraw } from '../pages/Withdraw';
import { Profile } from '../pages/Profile';
import { Transaction } from '../pages/Transaction';
import { useMenu } from '../providers/MenuProviders';

interface ChildrenTypes {
  callback: () => void;
  children: ReactElement;
}

const Private = ({ children, callback }: ChildrenTypes) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/home" />;
  }

  callback();
  return children;
};

const Public = ({ children, callback }: ChildrenTypes) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/deposit" />;
  }

  callback();
  return children;
};

export const Router = () => {
  const { toggleMenu } = useMenu();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <Public callback={() => toggleMenu(false)}>
            <Home />
          </Public>
        }
      />
      <Route
        path="/deposit"
        element={
          <Private callback={() => toggleMenu(true)}>
            <Deposit />
          </Private>
        }
      />
      <Route
        path="/extract"
        element={
          <Private callback={() => toggleMenu(true)}>
            <Extract />
          </Private>
        }
      />
      <Route
        path="/transfer"
        element={
          <Private callback={() => toggleMenu(true)}>
            <Transfer />
          </Private>
        }
      />
      <Route
        path="/withdraw"
        element={
          <Private callback={() => toggleMenu(true)}>
            <Withdraw />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private callback={() => toggleMenu(false)}>
            <Profile />
          </Private>
        }
      />
      <Route path="/transaction/:transactionId" element={<Transaction />} />

      <Route path="*" element={<h1 className="text-white">Error 404</h1>} />
    </Routes>
  );
};
