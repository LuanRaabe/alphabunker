export function validateCpf(cpf: string): boolean {
  const cpfArray = cpf
    .replace(/\D/g, '')
    .split('')
    .map((el) => parseInt(el));

  if (cpfArray.length !== 11) return false;
  const firstDigit = cpfArray[9];
  const secondDigit = cpfArray[10];

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpfArray[i] * (10 - i);
  }

  let firstDigitCalc = 11 - (sum % 11);
  if (firstDigitCalc > 9) firstDigitCalc = 0;
  if (firstDigit !== firstDigitCalc) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpfArray[i] * (11 - i);
  }

  let secondDigitCalc = 11 - (sum % 11);
  if (secondDigitCalc > 9) secondDigitCalc = 0;

  if (secondDigit !== secondDigitCalc) return false;

  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
  const passwordFormamted = password.replace(/\s/g, '');
  return passwordFormamted.length >= 6 && passwordFormamted.length <= 20;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): boolean {
  return password === confirmPassword;
}