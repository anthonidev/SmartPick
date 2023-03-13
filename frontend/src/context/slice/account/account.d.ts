interface IAccountState {
  loading: boolean;
  account: IAccount | null;
  suscription: ISuscription | null;
}

interface IAccount {
  id: number;
  phone: string;
  dob: string;
  dni: string;
  first_name: string;
  last_name: string;
  address: string;
  department: string;
  is_subscribed: boolean;
  email: string;
}

interface ISuscription {
  id: number | string;
  status: string;
  is_enterprise: boolean;
}
