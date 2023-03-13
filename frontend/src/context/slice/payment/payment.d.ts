interface IPaymentState {
  pricings: IPricing[] | null;
  loading: boolean;
  card: ICreditCard | null;
  suscription: ISuscriptionUser | null;
}

interface IPricing {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  description: string;
  pricing_include: IPricingInclude[];
  type: "legal" | "natural";
}

interface IPricingInclude {
  id: number;
  name: string;
}

interface ISuscriptionUser {
  id: number | string;
  status: string;
  is_enterprise: boolean;
  created: string;
  pricing: string;
}

interface IFormCard {
  card_number: string;
  cvv: string;
  expiration_month: number;
  expiration_year: string;
  email: string;
}

interface ICreditCard {
  id: string;
  type: string;
  date: string;
  last_four: string;
  card_number: string;
  card_brand: string;
  card_type: string;
}

interface IFormJuridic extends IFormCard {
  ruc: string;
}

interface ISendDataSuscriber extends IFormCard {
  ruc?: string;
  type: string;
  pricing_id: number | string;
}
