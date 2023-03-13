interface IProjectState {
  loading: boolean;
  project: IProject | null;
  projects: IProject[] | null;
  step: number;
  areas: IArea[] | null;
  steps: ISteps[];
}
interface IFormSocialAndContact {
  contact: IContactProyectForm;
  social: IRedesForm;
}

interface IProject extends IFormSocialAndContact {
  id: number | string;
  name: string;
  description: string;
  stage: "Planos" | "Construcción";
  location: string;
  department: string;
  areas: IArea[];
  logo: string;
  slug: string;
  google_maps: string;
  masterplan: string;
  total_lands: number;
  gallery: IGallery[];
  land: ILand[];
}

interface IFormProject extends IFormSocialAndContact, IFormGalleryProject {
  name: string;
  description: string;
  google_maps: string;
  stage: "Planos" | "Construcción";
  location: string;
  department: string;
  areas: number[];
  logo: any;
  masterplan: any;

  land: ILandForm[];
}

// interface ILandFormProject {}

interface IFormGalleryProject {
  galery: {
    image1: any;
    image2: any;
    image3: any;
    image4: any;
  };
}

interface IArea {
  id: number;
  name: string;
  photo_dark: string;
  photo_light: string;
}

interface IGallery {
  id: number;
  item: string;
}

interface ISteps {
  id: number;
  name: string;
  description: string;
  status: "complete" | "upcoming" | "current";
}

interface IContactProyectForm {
  whatsapp: string;
  phone: string;
  telegram: string;
  email: string;
}
interface IRedesForm {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  web: string;
  linkedin: string;
}
