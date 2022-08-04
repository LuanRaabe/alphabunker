/**
 * Archive: src/utils/Maks.ts
 *
 * Description: Masks functions
 *
 * Date: 2022/07/30
 *
 * Author: Luan
 */

export const maskCpf = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

export const maskAgencyNumber = (value: string): string => {
  return value.replace(/\D/g, '').replace(/^(\d{4})(\d)/, '$1-$2');
};

export const maskAccountNumber = (value: string): string => {
  return value.replace(/\D/g, '').replace(/^(\d{4})(\d)/, '$1-$2');
};

export const maskValue = (value: string): string => {
  value = value.replace(/\D/g, '');
  if (value.length > 15) value = value.substring(0, value.length - 1);

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100,
  );

  return 'R$' + result;
};

export function maskDate(value: string): string {
  const date = new Date(value);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
