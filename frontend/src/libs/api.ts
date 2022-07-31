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
    return response.data;
  }

  async createAccount(
    name: string,
    email: string,
    cpf: string,
    birthdate: string,
  ) {
    const response = await this.api.post('/create-account', {
      name,
      email,
      cpf,
      birthdate,
    });
    return response.data;
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
    return response.data;
  }

  async makeWithdrawal(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
    value: number,
  ) {
    const response = await this.api.post('/withdrawal', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
      value,
    });
    return response.data;
  }

  async getTransactions(
    ownerCpf: string,
    account: string,
    accountDigit: string,
    agency: string,
    agencyDigit: string,
  ) {
    const response = await this.api.post('/transactions', {
      ownerCpf,
      account,
      accountDigit,
      agency,
      agencyDigit,
    });
    return response.data;
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
    return response.data;
  }
}
export const bankAPI = new BankAPI();
export default bankAPI;
