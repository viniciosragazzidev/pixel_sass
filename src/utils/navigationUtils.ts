import { useRouter, usePathname, useSearchParams } from "next/navigation";

// Interface para os parâmetros de consulta da URL
interface QueryParams {
  searchParams: URLSearchParams;
  pathname: string;
}

// Hook para obter os parâmetros de consulta da URL e o pathname
export const useQueryParams = (): QueryParams => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return { searchParams, pathname };
};

// Hook para navegar para uma nova URL com base nos parâmetros de consulta
export const useNavigateWithQuery = () => {
  const route = useRouter();
  const { searchParams, pathname } = useQueryParams();

  const navigateWithQuery = (queryParams: string) => {
    const queryString = new URLSearchParams(queryParams).toString();
    route.replace(pathname + "?" + queryString);
  };

  return navigateWithQuery;
};
