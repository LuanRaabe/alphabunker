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

interface MenuProps {
  username: string;
  userphoto?: string;
  extract: number;
  agencyNumber: string;
  accountNumber: string;
}

/**
 * Archive: src/components/Menu.tsx
 *
 * Description: Menu component
 *
 * Date: 2022/07/25
 *
 * Author: Luan
 */

export function Menu(props: MenuProps) {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-0 flex flex-col items-center
      w-full h-52
      bg-header-menu rounded-b-3xl
      text-white"
    >
      <div className="flex flex-row items-center justify-between my-7 w-4/5">
        <span className="text-xl">Bem vindo, {props.username}!</span>
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
              Agência: {props.agencyNumber}
            </span>
            <span className="text-header-gold text-sm">
              Conta: {props.accountNumber}
            </span>
          </div>
          <CaretDown weight="bold" className="w-6 h-6 text-icon-dark-200" />
        </div>
        <div className="flex flex-row items-center text-brand-base">
          <Eye weight="bold" className="w-6 h-6 mx-1 text-icon-dark-200" />
          <div className="flex flex-row items-end">
            <span className="text-2xl mr-1">{props.extract.toFixed(2)}</span>
            <span className="text-sm">R$</span>
          </div>
        </div>
      </div>
    </div>
  );
}