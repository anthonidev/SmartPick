interface INewsState {
  carousel: ICarousel[] | null;
  loading: boolean;
  feeds: IFeed[] | null;
}

interface ICarousel {
  id: number;
  alt: string;
  image: string;
  link: string;
}

interface IFeed {
  id: number;
  name: string;
  description: string;
  created: string;
  state: string;
}
