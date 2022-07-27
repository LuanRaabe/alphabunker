import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MenuProvider } from './providers/MenuProviders';

import { UserProvider } from './providers/UserProvider';
import { Router } from './routes/routes';
import './styles/global.css';

/**
 * Archive: src/App.tsx
 *
 * Description: Main application component
 *
 * Date: 2022/07/17
 *
 * Author: Rey
 */

export const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <MenuProvider>
          <Router />
        </MenuProvider>
      </BrowserRouter>
    </UserProvider>
  );
};
