import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useUser } from '../../providers/UserProvider';
import { maskCpf, maskEmail } from '../../utils/Masks';
import { validateCpf } from '../../utils/Validators';
/**
 * Archive: src/pages/Home.tsx
 *
 * Description: Home page
 *
 * Date: 2022/07/20
 *
 * Author: Rey
 */

export const Home = () => {
  const navigate = useNavigate();
  const { loading } = useUser();
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>(
    'login',
  );
  const [username, setUsername] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isLoginScreen = loginOrRegister === 'login';

  function changeScreen() {
    setUsername('');
    setBirthday('');
    setCpf('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setLoginOrRegister(isLoginScreen ? 'register' : 'login');
  }

  function handleLogin() {
    console.log('login');
    navigate('/profile');
  }

  function handleRegister() {
    console.log('register');
    navigate('/profile');
  }

  function renderLoading() {
    return <div>Loading...</div>;
  }

  function renderLogo() {
    return (
      <>
        <div className={`mb-4 ${isLoginScreen ? 'h-[103px]' : 'h-[69px]'}`}>
          <img src="public/logo.svg" alt="logo" className="h-full" />
        </div>
        <span
          className={`text-brand-base text-2xl ${
            isLoginScreen ? 'mb-14' : 'mb-3'
          }`}
        >
          Alpha Bunker
        </span>
        <span
          className={`text-paragraph-dark text-xl ${
            isLoginScreen ? 'mb-6' : 'mb-7'
          }`}
        >
          {isLoginScreen ? 'Login' : 'Crie sua conta'}
        </span>
      </>
    );
  }

  function renderBottomButtons() {
    return (
      <>
        <Button
          category="primary"
          label={isLoginScreen ? 'Entrar' : 'Cadastrar'}
          onClick={isLoginScreen ? () => handleLogin() : () => handleRegister()}
          className="mb-2"
        />
        <span
          className="text-sm text-paragraph-dark"
          onClick={() => changeScreen()}
        >
          {isLoginScreen ? 'Crie sua conta' : 'Entrar'}
        </span>
      </>
    );
  }

  function renderLogin() {
    return (
      <>
        {renderLogo()}
        <Input
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={setCpf}
          mask={maskCpf}
          validators={[{ validate: validateCpf, message: 'CPF inválido' }]}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={setPassword}
        />
        {renderBottomButtons()}
      </>
    );
  }

  function renderRegister() {
    return (
      <>
        {renderLogo()}
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={setUsername}
        />
        <Input
          type="date"
          placeholder="Digite sua data de nascimento"
          value={birthday}
          onChange={setBirthday}
        />
        <Input
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={setCpf}
          mask={maskCpf}
        />
        <Input
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={setEmail}
          mask={maskEmail}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={setPassword}
        />
        <Input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {renderBottomButtons()}
      </>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        renderLoading()
      ) : (
        <>{isLoginScreen ? renderLogin() : renderRegister()}</>
      )}
    </div>
  );
};
