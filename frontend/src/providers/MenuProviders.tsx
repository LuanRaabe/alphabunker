import { ReactNode, createContext, useState, useContext } from 'react';
import { Menu } from '../components/Menu/Menu';

export const MenuContext = createContext({
  showMenu: false,
  toggleMenu: (p: boolean) => console.log(p),
});

interface MenuProviderTypes {
  children: ReactNode;
}

export const MenuProvider = ({ children }: MenuProviderTypes) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  function toggleMenu(state: boolean) {
    setShowMenu(state);
  }

  return (
    <MenuContext.Provider value={{ showMenu, toggleMenu }}>
      <>
        {showMenu && (
          <Menu
            username="Fulano"
            extract={0}
            agencyNumber="0000-0"
            accountNumber="00000-0"
          />
        )}
        {children}
      </>
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
