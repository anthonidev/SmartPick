interface IFilter {
  id: number;
  title: string;
  value: string;
  description: string;
}

interface IQuality {
  value: number;
  name: string;
}

interface INavigation {
  name: string;
  href?: string;
  icon: any;
  current?: boolean;
}

interface ICrop {
  value: string;
  name: string;
}
