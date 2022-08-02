export interface Transaction {
  id: string;
  operation_name: string;
  account_id: string;
  value: string;
  created_at: string;
  type: string;
}

export interface Owner {
  name: string;
  email: string;
  birthdate: string;
  photo?: string;
}

export interface Account {
  id?: string;
  owners_cpf: string;
  password?: string;
  agency: string;
  agency_digit: string;
  account: string;
  account_digit: string;
  balance: string;
}

export interface DataCreateAccount {
  owner: Owner;
  account: Account;
}

export interface ResponseCreateAccount {
  data: DataCreateAccount;
  message: string[];
}

export interface DataLogin {
  owner: Owner;
  account: Account;
}

export interface ResponseLogin {
  data: DataLogin;
  message: string[];
}

export interface DataExtract {
  account: Account;
  extract: Transaction[];
}

export interface ResponseExtract {
  data: DataExtract;
  message: string[];
}

export interface ResponseAccounts {
  data: Partial<Account>[];
  message: string[];
}

export interface Transaction {
  id: string;
  value: string;
  cpf: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  created_at: string;
}

export interface DepositData {
  deposit: Transaction;
}

export interface ResponseDeposit {
  data: DepositData;
  message: string[];
}

export interface Fee {
  id: string;
  value: string;
}

export interface WithdrawData {
  withdraw: Transaction;
  fee: Fee;
}

export interface ResponseWithdraw {
  data: WithdrawData;
  message: string[];
}

export interface TransferData {
  transfer_out: Transaction;
  transfer_in: Transaction;
  fee: Fee;
}

export interface ResponseTransfer {
  data: TransferData;
  message: string[];
}
