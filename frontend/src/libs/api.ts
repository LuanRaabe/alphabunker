import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const createSession = async (
  ownerCpf: string,
  password: string,
  account: string,
  accountDigit: string,
  agency: string,
  agencyDigit: string,
) => {
  return api.post('/balance', {
    ownerCpf,
    password,
    account,
    accountDigit,
    agency,
    agencyDigit,
  });
};
