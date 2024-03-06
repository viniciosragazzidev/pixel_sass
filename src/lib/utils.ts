import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookies = (key: string, value: any) => {
  document.cookie = `${key}=${value}`;
};

export function validarCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]/g, ""); // Elimina caracteres no numéricos
  if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false; // Verifica longitud y repeticiones

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}
