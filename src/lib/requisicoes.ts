"use server";
import { revalidateTag } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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

  //console.log(fullUrl);

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
export const getClient = async (document: string) => {
  // Construindo a URL

  const fullUrl = `${BASE_URL}/api/company_client?document=${document}`;

  try {
    const response = await fetch(fullUrl, {
      next: {
        revalidate: 300,
        tags: ["client"],
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error("Erro ao buscar clientes.");
  }
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
  const fullUrl = `${BASE_URL}/api/company_client`;
  console.log(fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(
      "criarndo " + JSON.stringify(result) + " - " + JSON.stringify(data)
    );

    return result;
  } catch (error) {
    console.log("error aqui");

    throw new Error("Erro ao criar cliente.");
  }
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

/// users

export const getUser = async (email: string) => {
  const fullURL = `${BASE_URL}/api/users?email=${email}`;

  try {
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1000,
      },
    });

    const data = await response.json();
    //console.log(data, fullURL);

    return data;
  } catch (error) {
    throw new Error("Erro ao buscar usuário.");
  }
};

export const createUser = async (data: any) => {
  const fullURL = `${BASE_URL}/api/users`;

  try {
    const response = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const user = await response.json();
    return user;
  } catch (error) {
    throw new Error("Erro ao criar usuário.");
  }
};

export const getRoles = async (id: string) => {
  const fullURL = `${BASE_URL}/api/role?id=${id}`;

  try {
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1000,
      },
    });

    const data = await response.json();
    //console.log(data, fullURL);

    return data;
  } catch (error) {
    throw new Error("Erro ao buscar usuário.");
  }
};

// Profile

export const getProfile = async ({ email }: { email: string }) => {
  const fullURL = `${BASE_URL}/api/profile`;

  try {
    const response = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    const data = await response.json();
    //console.log(data, fullURL);

    return data;
  } catch (error) {
    throw new Error("Erro ao buscar perfil.");
  }
};

export const createProfile = async (data: any) => {
  const fullURL = `${BASE_URL}/api/profile`;
  try {
    const response = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //console.log(response);

    return response.json();
  } catch (error) {
    throw new Error("Erro ao criar perfil.");
  }
};

// Company

export const getCompany = async (id: string) => {
  const fullURL = `${BASE_URL}/api/company?id=${id}`;

  try {
    const response = await fetch(fullURL, {
      next: {
        revalidate: 3000,
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error("Erro ao buscar empresa.");
  }
};

export const createCompany = async (data: any) => {
  const fullURL = `${BASE_URL}/api/company`;

  try {
    const response = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //console.log(response);

    return response.json();
  } catch (error) {
    //console.log(error);
    throw new Error("Erro ao criar empresa. Req");
  }
};
