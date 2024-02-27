export interface ServiceType {
  id: string;
  created_at?: string | undefined;

  client: {
    id: string;
    name: string;
    contact: string;
  };
  items: ItemType[];
}
export interface ItemType {
  id: string;
  item: string;
  brand: string;
  model: string;
  nSerie: string;
  status: string;
  tecnico: string;
  description: string;
  acessories?: string | undefined;
  useBrand?: boolean | undefined;
  useBrandValue?: string | undefined;
}

export interface ClientType {
  id: string;
  name: string;
  document: string;
  contact: string;
  address: string;
  cep: string;
  email?: string;
}
