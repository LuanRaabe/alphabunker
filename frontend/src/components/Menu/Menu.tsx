import {
  ArrowsLeftRight,
  Bank,
  CaretDown,
  DownloadSimple,
  Eye,
  UploadSimple,
  UserCircle,
} from 'phosphor-react';
import { SectionButton } from './SectionButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../providers/UserProvider';


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
  const { user, loggedAccount } = useUser();
  const navigate = useNavigate();

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
              {loggedAccount?.agency + '-' + loggedAccount?.agencyDigit}
            </span>
            <span className="text-header-gold text-sm">
              Conta:{' '}
              {loggedAccount?.account + '-' + loggedAccount?.accountDigit}
            </span>
          </div>
          <CaretDown weight="bold" className="w-6 h-6 text-icon-dark-200" />
        </div>
        <div className="flex flex-row items-center text-brand-base">
          <Eye weight="bold" className="w-6 h-6 mx-1 text-icon-dark-200" />
          <div className="flex flex-row items-end">
            <span className="text-2xl mr-1">{loggedAccount?.balance}</span>
            <span className="text-sm mb-1">R$</span>
          </div>
        </div>
      </div>
    </div>
  );
}
