interface ILandState {
  loading: boolean;
  land: ILandDetail | null;
  lands: ILand[] | null;
  step: number;
  steps: ISteps[];
}

interface ILand {
  id: number | string;
  name: string;
  type_coin: "PEN" | "USD" | "EURO";
  price: number;
  compare_price: number;
  area: number;
  image: string;
  slug: string;
  quantity: number;
  gallery: IGallery[];
}

interface ILandDetail extends ILand {
  detail: {
    phone: string;
    email: string;
    whatsapp: string;
    telegram: string;
    department: string;
    location: string;
    google_maps: string;
  };
}

interface ILandForm {
  name: string;
  type_coin: "PEN" | "USD" | "EURO";
  price: number;
  compare_price: number;
  area: number;
  image: string;
  quantity: number;
  gallery: {
    image1: any;
    image2: any;
  };
}

interface ILandFormUser extends ILandForm {
  phone: string;
  email: string;
  whatsapp: string;
  telegram: string;
  department: string;
  location: string;
  google_maps: string;
}

interface IFormGalleryLand {
  galery: {
    image1: any;
    image2: any;
  };
}
