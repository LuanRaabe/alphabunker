// Language: typescript
// Path: frontend\src\libs\api.ts

import axios, { Axios } from 'axios';

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

  async createSession(
    ownerCpf: string,
    password: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
  ) {
    const response = await this.api.post('/login', {
      ownerCpf,
      password,
      account,
      accountDigit,
      agency,
      agencyDigit,
    });
    return response;
  }

  async createAccount(
    name: string,
    email: string,
    cpf: string,
    birthdate: string,
  ) {
    const response = await this.api.post('/create', {
      name,
      email,
      cpf,
      birthdate,
    });
    return response;
  }

  async makeDeposit(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: number,
  ) {
    const response = await this.api.post('/deposit', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
      value,
    });
    return response;
  }

  async makeWithdrawal(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: number,
  ) {
    const response = await this.api.post('/withdraw', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
      value,
    });
    return response;
  }

  async getTransactions(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
  ) {
    const response = await this.api.post('/extract', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
    });
    return response;
  }

  async makeTransfer(
    ownerCpf: string,
    ownerPassword: string,
    onweraccount: string,
    onweraccountDigit: string,
    onweragency: string,
    onweragencyDigit: string,
    value: number,
    transferCpf: string,
    transferAccount: string,
    transferAccountDigit: string,
    transferAgency: string,
    transferAgencyDigit: string,
  ) {
    const response = await this.api.post('/transfer', {
      ownerCpf,
      ownerPassword,
      onweraccount,
      onweraccountDigit,
      onweragency,
      onweragencyDigit,
      transferCpf,
      transferAccount,
      transferAccountDigit,
      transferAgency,
      transferAgencyDigit,
      value,
    });
    return response;
  }

  async getAccounts(ownerCpf: string) {
    const response = await this.api.post('/accounts', {
      ownerCpf,
    });
    return response;
  }
}
export const bankAPI = new BankAPI();
export default bankAPI;
