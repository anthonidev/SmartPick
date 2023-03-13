interface IEnterpriseState {
  loading: boolean;
  entity: IEntity | null;
  enterprise: IEnterprise | null;
}

interface IEntity {
  id: number;
  name: string;
  ruc: string;
  address: string;
  department: string;
  province: string;
  district: string;
  state: string;
}

interface IEnterprise {
  id: number;
  name: string;
  description: string;
  logo: string;
  banner: string;
}

interface IFormEnterprise {
  name: string;
  description: string;
  ruc: string;
  logo: any;
  banner: any;
}
