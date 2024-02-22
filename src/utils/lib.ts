"use server";
import { revalidateTag } from "next/cache";

export const getServices = async (
  page?: number,
  perPage?: number,
  urlFilter?: string | null | undefined,
  filter?: string | null | undefined
) => {
  const data = await fetch(
    `http://localhost:3333/services?_page=${page || 1}&_per_page=${
      perPage || 10
    }${
      urlFilter && urlFilter?.length > 2
        ? `&id=${urlFilter}`
        : filter && filter?.length > 2
        ? `&id=${filter}`
        : ""
    }`,
    {
      next: {
        revalidate: 5,
      },
    }
  ).then((res) => res.json());

  return data;
};

export const revalidateTagFunc = (tag: string) => {
  revalidateTag(tag);
};
