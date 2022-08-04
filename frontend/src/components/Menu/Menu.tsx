import {
  ArrowsLeftRight,
  Bank,
  CaretDown,
  DownloadSimple,
  Eye,
  EyeSlash,
  UploadSimple,
  UserCircle,
} from 'phosphor-react';
import { SectionButton } from './SectionButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';
import { useState } from 'react';
import { maskValue } from '../../utils/Masks';

/**
 * Archive: src/components/Menu.tsx
 *
 * Description: Menu component
 *
 * Date: 2022/07/25
 *
 * Author: Luan
 */

export function Menu() {
  const { user, loggedAccount, balance } = useUser();
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  function toggleBalance() {
    setShowBalance(!showBalance);
  }

  return (
    <div
      className="relative top-0 flex flex-col items-center
      w-full h-52 mb-20
      bg-header-menu rounded-b-3xl
      text-white"
    >
      <div className="flex flex-row items-center justify-between my-7 w-4/5">
        <span className="text-xl cursor-pointer">Bem vindo, {user?.name}!</span>
        <UserCircle
          weight="bold"
          className="w-6 h-6"
          onClick={() => navigate('/profile')}
        />
      </div>
      <div className="flex flex-row justify-between w-9/12">
        <SectionButton title="Extrato" onClick={() => navigate('/extract')}>
          <Bank weight="bold" className="w-6 h-6" />
        </SectionButton>
        <SectionButton title="Transferir" onClick={() => navigate('/transfer')}>
          <ArrowsLeftRight weight="bold" className="w-6 h-6" />
        </SectionButton>
        <SectionButton title="Depósito" onClick={() => navigate('/deposit')}>
          <UploadSimple weight="bold" className="w-6 h-6" />
        </SectionButton>
        <SectionButton title="Sacar" onClick={() => navigate('/withdraw')}>
          <DownloadSimple weight="bold" className="w-6 h-6" />
        </SectionButton>
      </div>
      <div className="absolute -bottom-10 flex flex-col w-4/5 rounded-xl px-5 py-2 bg-white">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <span className="text-header-gold text-sm mr-2">
              Agência:{' '}
              {loggedAccount?.agency + '-' + loggedAccount?.agency_digit}
            </span>
            <span className="text-header-gold text-sm">
              Conta:{' '}
              {loggedAccount?.account + '-' + loggedAccount?.account_digit}
            </span>
          </div>
          <CaretDown weight="bold" className="w-6 h-6 text-icon-dark-200" />
        </div>
        <div
          className="flex flex-row items-center text-brand-base"
          onClick={() => toggleBalance()}
        >
          {showBalance ? (
            <Eye weight="bold" className="w-4 h-4 mx-1 text-icon-dark-200" />
          ) : (
            <EyeSlash
              weight="bold"
              className="w-4 h-4 mx-1 text-icon-dark-200"
            />
          )}
          <div className="flex flex-row items-end">
            <span className="text-2xl font-bold mr-1">
              {showBalance
                ? maskValue(balance)
                : '-----'}
            </span>
            <span className="text-sm mb-1">R$</span>
          </div>
        </div>
      </div>
    </div>
  );
}
