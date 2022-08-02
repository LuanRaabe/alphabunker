import {
  ArrowLeft,
  IdentificationCard,
  UserCircle,
  Vault,
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { WhiteCard } from '../../components/WhiteCard';
import { useUser } from '../../providers/UserProvider';

/**
 * Archive: src/pages/Profile.tsx
 *
 * Description: Profile page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Profile = () => {
  const { user, accounts } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="fixed top-0 flex flex-col items-center w-full h-52 rounded-b-3xl z-10 bg-brand-base">
        <ArrowLeft
          weight="bold"
          className="absolute left-5 top-5 w-6 h-6 text-icon-light cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="rounded-full w-20 h-20 mt-11">
          {user?.photo ? (
            <img
              src={user?.photo}
              alt={user?.name + ' photo'}
              className="w-full h-full"
            />
          ) : (
            <UserCircle className="w-full h-full text-icon-light" />
          )}
        </div>
        <span className="text-white text-xl mt-3">{user?.name}</span>
      </div>
      <div className="flex flex-col items-center mt-60 w-full">
        <WhiteCard
          icon={<IdentificationCard className="w-5 h-5" />}
          title="Meu Dados"
          childs={[
            <>
              <span>Nome: {user?.name}</span>
              <span>Data de nascimento: {user?.birthdate}</span>
              <span>CPF: {user?.cpf}</span>
            </>,
          ]}
          className="mb-9"
        />
        <WhiteCard
          icon={<Vault className="w-5 h-5" />}
          title="Minhas contas correntes"
          childs={accounts?.map((account) => (
            <div className="flex flex-col" key={account.id}>
              <span>Agência: {account.agency + '-' + account.agency_digit}</span>
              <span>Conta: {account.account + '-' + account.account_digit}</span>
            </div>
          ))}
        />
      </div>
    </div>
  );
};
