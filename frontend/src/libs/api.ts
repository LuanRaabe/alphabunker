// Language: typescript
// Path: frontend\src\libs\api.ts

import axios, { Axios } from 'axios';
import {
  ResponseCreateAccount,
  ResponseLogin,
  ResponseExtract,
  ResponseAccounts,
  ResponseDeposit,
  ResponseWithdraw,
  ResponseTransfer,
  ResponseBalance,
} from '../../Types';

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export class BankAPI {
  api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8000/',
    });
  }

  async createSession(cpf: string, password: string) {
    const response = await this.api.post('/login', {
      cpf,
      password,
    });
    return response.data as unknown as ResponseLogin;
  }

  async createAccount(
    name: string,
    email: string,
    password: string,
    cpf: string,
    birthdate: string,
  ) {
    const response = await this.api.post('/create', {
      name,
      email,
      password,
      cpf,
      birthdate,
    });
    console.log(response.data);
    return response.data as unknown as ResponseCreateAccount;
  }

  async makeDeposit(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: string,
  ) {
    const response = await this.api.post('/deposit', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
      value,
    });
    return response.data as unknown as ResponseDeposit;
  }

  async makeWithdraw(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: string,
    password: string,
  ) {
    const response = await this.api.post('/withdraw', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
      value,
      password,
    });
    return response.data as unknown as ResponseWithdraw;
  }

  async getTransactions(
    ownerCpf: string,
    password: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
  ) {
    const response = await this.api.post('/extract', {
      ownerCpf,
      account,
      password,
      accountDigit,
      agency,
      agencyDigit,
    });
    return response.data as unknown as ResponseExtract;
  }

  async makeTransfer(
    ownerCpf: string,
    ownerPassword: string,
    ownerAccount: string,
    ownerAccountDigit: string,
    ownerAgency: string,
    ownerAgencyDigit: string,
    value: string,
    transferCpf: string,
    transferAccount: string,
    transferAccountDigit: string,
    transferAgency: string,
    transferAgencyDigit: string,
  ) {
    const response = await this.api.post('/transfer', {
      ownerCpf,
      ownerPassword,
      ownerAccount,
      ownerAccountDigit,
      ownerAgency,
      ownerAgencyDigit,
      transferCpf,
      transferAccount,
      transferAccountDigit,
      transferAgency,
      transferAgencyDigit,
      value,
    });
    return response.data as unknown as ResponseTransfer;
  }

  async getAccounts(cpf: string) {
    const response = await this.api.post('/search', {
      cpf,
    });
    return response.data as unknown as ResponseAccounts;
  }

  async getBalance(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    password: string,
  ) {
    const response = await this.api.post('/balance', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
      password,
    });
    return response.data as unknown as ResponseBalance;
  }
}
export const bankAPI = new BankAPI();
export default bankAPI;
