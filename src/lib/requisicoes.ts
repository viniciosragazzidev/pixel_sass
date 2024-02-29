"use server";
import { revalidateTag } from "next/cache";

const BASE_URL = "http://localhost:3333"; // Constante para o URL base

// Função utilitária para construir a URL com parâmetros de consulta
const buildUrl = (path: string, params: Record<string, any>) => {
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  return `${BASE_URL}/${path}?${queryString}`;
};

// Função para buscar serviços
export const getServices = async (
  page = 1,
  perPage = 10,
  urlFilter?: string | null,
  filter?: string | null
) => {
  page = page < 1 ? 1 : page;
  perPage = perPage < 1 ? 10 : perPage;
  // Validando os parâmetros de entrada
  if (page < 1 || perPage < 1) {
    throw new Error("page e perPage devem ser números positivos.");
  }

  // Construindo a URL
  const queryParams = {
    _page: page,
    _per_page: perPage,
    _sort: "-created_at",
    ...(urlFilter && urlFilter.length > 2 ? { id: urlFilter } : {}),
    ...(filter && filter.length > 2 ? { id: filter } : {}),
  };
  const fullUrl = buildUrl("services", queryParams);

  console.log(fullUrl);

  // Requisição assíncrona dos serviços
  const response = await fetch(fullUrl, {
    next: {
      revalidate: 3000,
      tags: ["services"],
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar serviços.");
  }
  const data = await response.json();
  return data;
};

// Função para buscar clientes por documento ou ID
export const getClientsByDocumentOrId = async ({
  id,
  document,
  page = 1,
  perPage = 10,
  urlFilter,
  filter,
}: {
  id?: string;
  document?: string;
  page?: number;
  perPage?: number;
  urlFilter?: string | null;
  filter?: string | null;
} = {}) => {
  // Construindo a URL
  const queryParams = {
    _page: page,
    _per_page: perPage,
    ...(id ? { id } : {}),
    ...(document ? { document } : {}),
    ...(urlFilter && urlFilter.length > 2 ? { id: urlFilter } : {}),
    ...(filter && filter.length > 2 ? { id: filter } : {}),
  };
  const fullUrl = buildUrl("clients", queryParams);

  console.log(fullUrl);

  // Requisição assíncrona dos clientes
  const response = await fetch(fullUrl, {
    next: {
      revalidate: 1,
      tags: ["clients"],
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar clientes.");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

// Função para buscar técnicos
export const getTecnics = async () => {
  const fullUrl = `${BASE_URL}/tecnicos`;

  const response = await fetch(fullUrl, { next: { revalidate: 3000 * 10 } });
  if (!response.ok) {
    throw new Error("Erro ao buscar técnicos.");
  }
  const data = await response.json();
  return data;
};

// Função para buscar status
export const getStatus = async () => {
  const fullUrl = `${BASE_URL}/status`;

  const response = await fetch(fullUrl, { next: { revalidate: 3000 * 10 } });
  if (!response.ok) {
    throw new Error("Erro ao buscar status.");
  }
  const data = await response.json();
  return data;
};

// Função para criar um novo cliente
export const createClient = async (data: any) => {
  const fullUrl = `${BASE_URL}/clients`;

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar cliente.");
  }
  const result = await response.json();
  return result;
};

// Função para editar um cliente

export const editClient = async (data: any) => {
  const fullUrl = `${BASE_URL}/clients/${data.id}`;

  const response = await fetch(fullUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao editar cliente.");
  }

  const result = await response.json();
  return result;
};

// Função para criar um novo serviço
export const createNewService = async (data: any) => {
  const fullUrl = `${BASE_URL}/services`;

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao criar serviço.");
  }
  const result = await response.json();
  revalidateTag("services");
  return result;
};

// Função para editar um serviço
export const editService = async (data: any) => {
  const fullUrl = `${BASE_URL}/services/${data.id}`;

  const response = await fetch(fullUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao editar serviço.");
  }
  const result = await response.json();
  revalidateTag("services");
  return result;
};

// Função para deletar um serviço
export const deleteService = async (id: string) => {
  const fullUrl = `${BASE_URL}/services/${id}`;

  const response = await fetch(fullUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Erro ao deletar serviço.");
  }
  const result = await response.json();
  revalidateTag("services");
  return result;
};
