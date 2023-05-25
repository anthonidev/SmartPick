interface IConfigState {
  sidebar: boolean;
  navigation?: INavigation[];
}

interface IFormInitialConfig {
  phone: string;
  dob: string;
  dni: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  department: string;
}
interface INavigation {
  name: string;
  href?: string;
  icon:
    | "BuildingOfficeIcon"
    | "CreditCardIcon"
    | "HomeIcon"
    | "HomeModernIcon"
    | "QuestionMarkCircleIcon"
    | "ShieldCheckIcon"
    | "UserCircleIcon"
    | "UserGroupIcon"
    | "UsersIcon"
    | "IdentificationIcon"
    | "Square3Stack3DIcon"
    | "TagIcon"
    | "MagnifyingGlassCircleIcon";

  current?: boolean;
}
