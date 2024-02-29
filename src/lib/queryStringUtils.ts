import { revalidateTag } from "next/cache";

// Função para criar uma string de consulta com um novo parâmetro
export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);
  return params.toString();
};

// Função para remover um parâmetro de consulta da URL
export const removeQueryParam = (
  searchParams: URLSearchParams,
  name: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(name);
  return params.toString();
};
