export const maskCpf = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

export const maskEmail = (value: string) => {
  const email = value.replace(/\D/g, '');
  const emailSplit = email.split(/(?=.{3})/);
  const emailMask = emailSplit.map((item, index) => {
    if (index === emailSplit.length - 1) {
      return item;
    }
    return item + '@';
  });
  return emailMask.join('');
};

export const maskAgencyNumber = (value: string): string => {
  return value.replace(/\D/g, '').replace(/^(\d{4})(\d)/, '$1-$2');
};

export const maskAccountNumber = (value: string): string => {
  return value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
};
