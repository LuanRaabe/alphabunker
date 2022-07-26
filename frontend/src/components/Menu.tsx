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
  userphoto: string;
  extract: string;
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
    <div className="flex flex-col">
      <div className="flex flex-row">
        <span onClick={() => navigate('/profile')}>
          Bem vindo, {props.username}!
        </span>
        <UserCircle weight="bold" className="w-6 h-6 text-icon-dark-200" />
      </div>
      <div className="flex flex-row">
        <SectionButton title="Extrato" onClick={() => navigate('/extract')}>
          <Bank weight="bold" className="w-6 h-6 text-icon-dark-200" />
        </SectionButton>
        <SectionButton title="Transferir" onClick={() => navigate('/transfer')}>
          <ArrowsLeftRight
            weight="bold"
            className="w-6 h-6 text-icon-dark-200"
          />
        </SectionButton>
        <SectionButton title="Depósito" onClick={() => navigate('/deposit')}>
          <UploadSimple weight="bold" className="w-6 h-6 text-icon-dark-200" />
        </SectionButton>
        <SectionButton title="Sacar" onClick={() => navigate('/withdraw')}>
          <DownloadSimple
            weight="bold"
            className="w-6 h-6 text-icon-dark-200"
          />
        </SectionButton>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <span>Agência: {props.agencyNumber}</span>
          <span>Conta: {props.accountNumber}</span>
          <CaretDown weight="bold" className="w-6 h-6 text-icon-dark-200" />
        </div>
        <div className="flex flex-row">
          <Eye weight="bold" className="w-6 h-6 text-icon-dark-200" />
          <span>{props.extract}R$</span>
        </div>
      </div>
    </div>
  );
}
