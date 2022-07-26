import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Form/Button';
import { FormSubmit } from '../../components/Form/FormSubmit';
import { Input } from '../../components/Form/Input';
import { useUser } from '../../providers/UserProvider';
import { maskCpf, maskPassword } from '../../utils/Masks';
import {
  validateConfirmPassword,
  validateCpf,
  validateDate,
  validateEmail,
  validatePassword,
  validateUsername,
} from '../../utils/Validators';
/**
 * Archive: src/pages/Home.tsx
 *
 * Description: Home page
 *
 * Date: 2022/07/20
 *
 * Author: Rey, Luan
 */

export const Home = () => {
  const navigate = useNavigate();
  const { error, loading, loginUser, createAccount } = useUser();
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>(
    'login',
  );
  const [username, setUsername] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);

  const isLoginScreen = () => loginOrRegister === 'login';

  function handleSubmit() {
    //request api
    //se der erro
    // references.setError(name, mensagemdeerro);
    //
    if (isLoginScreen()) {
      console.log('login');
      loginUser?.(cpf.replace(/\D/g, ''), password);
      if (!error) {
        navigate('/deposit');
      }
    } else {
      createAccount?.(username, email, password, cpf.replace(/\D/g, ''), birthday);
      if (!error) {
        navigate('/home');
      }
    }
  }

  function changeScreen() {
    setUsername('');
    setBirthday('');
    setCpf('');
    setEmail('');
    setPassword('');
    setDisableSubmit(false);
    setLoginOrRegister(isLoginScreen() ? 'register' : 'login');
  }

  function renderLoading() {
    return <div>Loading...</div>;
  }

  function renderLogo() {
    return (
      <>
        <div className={`mb-4 ${isLoginScreen() ? 'h-[103px]' : 'h-[69px]'}`}>
          <img src="/logo.svg" alt="logo" className="h-full" />
        </div>
        <span
          className={`text-brand-base text-2xl
          ${isLoginScreen() ? 'mb-14' : 'mb-3'}`}
        >
          Alpha Bunker
        </span>
        <span
          className={`text-paragraph-dark text-xl dark:text-white ${isLoginScreen() ? 'mb-6' : 'mb-7'}`}
        >
          {isLoginScreen() ? 'Login' : 'Crie sua conta'}
        </span>
      </>
    );
  }

  function renderBottomButtons() {
    return (
      <>
        <Button
          category="primary"
          type="submit"
          label={isLoginScreen() ? 'Entrar' : 'Cadastrar'}
          className="mb-2"
          isDisabled={disableSubmit}
        />
        <span
          className="text-sm text-paragraph-dark cursor-pointer dark:text-paragraph-light-100"
          onClick={() => changeScreen()}
        >
          {isLoginScreen() ? 'Crie sua conta' : 'Entrar'}
        </span>
      </>
    );
  }

  function renderLogin() {
    return (
      <>
        {renderLogo()}
        <Input
          name="cpflogin"
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={setCpf}
          mask={maskCpf}
          validators={[
            {
              validate: validateCpf,
              errorMessage: 'CPF inválido',
            },
          ]}
          callback={setDisableSubmit}
          autoFocus={isLoginScreen()}
        />
        <Input
          name="passwordlogin"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={setPassword}
          mask={maskPassword}
          validators={[
            { validate: validatePassword, errorMessage: 'Senha inválida' },
          ]}
          callback={setDisableSubmit}
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
          name="name"
          type="text"
          placeholder="Digite seu nome"
          value={username}
          onChange={setUsername}
          validators={[
            {
              validate: validateUsername,
              errorMessage: 'Nome inválido',
            },
          ]}
          callback={setDisableSubmit}
          autoFocus={!isLoginScreen()}
        />
        <Input
          name="date"
          type="date"
          placeholder="Digite sua data de nascimento"
          value={birthday}
          onChange={setBirthday}
          validators={[
            {
              validate: validateDate,
              errorMessage: 'Data inválida',
            },
          ]}
          callback={setDisableSubmit}
        />
        <Input
          name="cpf"
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={setCpf}
          mask={maskCpf}
          validators={[
            {
              validate: validateCpf,
              errorMessage: 'CPF inválido',
            },
          ]}
          callback={setDisableSubmit}
        />
        <Input
          name="email"
          type="text"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={setEmail}
          validators={[
            { validate: validateEmail, errorMessage: 'Email inválido' },
          ]}
          callback={setDisableSubmit}
        />
        <Input
          name="passwordregister"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={setPassword}
          mask={maskPassword}
          validators={[
            {
              validate: validatePassword,
              errorMessage: 'Senha deve conter 4 dígitos',
            },
          ]}
          callback={setDisableSubmit}
        />
        <Input
          name="passwordconfirm"
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={setConfirmPassword}
          mask={maskPassword}
          validators={[
            {
              validate: () =>
                validateConfirmPassword(password, confirmPassword),
              errorMessage: 'Senha não confere',
            },
          ]}
          callback={setDisableSubmit}
        />
        {error && <span className="error">{error}</span>}
        {renderBottomButtons()}
      </>
    );
  }

  return (
    <FormSubmit submitForm={handleSubmit}>
      {loading ? (
        renderLoading()
      ) : (
        <>{isLoginScreen() ? renderLogin() : renderRegister()}</>
      )}
    </FormSubmit>
  );
};
