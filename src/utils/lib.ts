"use server";
import { revalidateTag } from "next/cache";

export const getServices = async (
  page?: number,
  perPage?: number,
  urlFilter?: string | null | undefined,
  filter?: string | null | undefined
) => {
  const baseUrl = "http://localhost:3333/services";
  const queryParams = `_page=${page || 1}&_per_page=${
    perPage || 10
  }&_sort=-created_at`;

  let url;

  if (urlFilter && urlFilter?.length > 2) {
    url = `${baseUrl}?id=${urlFilter}&`;
  } else if (filter && filter?.length > 2) {
    url = `${baseUrl}?id=${filter}&`;
  } else {
    url = `${baseUrl}?`;
  }

  const fullUrl = `${url}${queryParams}`;

  console.log(fullUrl);

  const data = await fetch(fullUrl, {
    next: {
      revalidate: 3000,
      tags: ["services"],
    },
  }).then((res) => res.json());
  return data;
};

export const getClientsByDocumentOrId = async (
  document?: string | null | undefined,
  id?: string | null | undefined,
  page?: number,
  perPage?: number,
  urlFilter?: string | null | undefined,
  filter?: string | null | undefined
): Promise<any> => {
  const baseUrl = "http://localhost:3333/clients";
  const queryParams = `&_page=${page || 1}&_per_page=${perPage || 10}`;

  let url;

  if (id) {
    url = `${baseUrl}?id=${id}`;
  } else if (document) {
    url = `${baseUrl}?document=${document}`;
  } else if (urlFilter && urlFilter.length > 2) {
    url = `${baseUrl}?id=${urlFilter}`;
  } else if (filter && filter.length > 2) {
    url = `${baseUrl}?id=${filter}`;
  } else {
    url = baseUrl;
  }

  const fullUrl = `${url}${queryParams}`;
  console.log(fullUrl);
  const data = await fetch(fullUrl, {
    next: {
      revalidate: 1,
      tags: ["clients"],
    },
  }).then((res) => res.json());
  console.log(data);

  return data;
};

export const getTecnics = async () => {
  const baseUrl = "http://localhost:3333/tecnicos";
  const data = await fetch(baseUrl, { next: { revalidate: 3000 * 10 } }).then(
    (res) => res.json()
  );

  return data;
};

export const getStatus = async () => {
  const baseUrl = "http://localhost:3333/status";
  const data = await fetch(baseUrl, { next: { revalidate: 3000 * 10 } }).then(
    (res) => res.json()
  );

  return data;
};

export const createClient = async (data: any) => {
  const baseUrl = "http://localhost:3333/clients";
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const createNewService = async (data: any) => {
  const baseUrl = "http://localhost:3333/services";
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  revalidateTag("services");

  return result;
};
