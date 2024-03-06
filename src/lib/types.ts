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
  serieNumber: string;
  status: string;
  tecnico: string;
  description: string;
  acessories?: string | undefined;
  useBrand?: boolean | undefined;
}

export interface ClientType {
  id: string;
  name: string;
  document: string;
  contact: string;
  address: string;
  city: string;
  cep: string;
  email?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  companyId: string | null;
  roleId: string;
  Role: {
    id: string;
    name: string;
    permissions: string[];
  };
  Profile: {
    id: string;
    userId: string;
    name: string;
    surname: string;
    gender: string;
    birthDate: string | null;
    address: string;
    cep: string;
    city: string;
    state: string;
    country: string;
    email: string;
    phoneNumber: string;
    document: string;
    profileImage: string;
    position: string;
  };
}

export interface UserList {
  users: User[];
}
