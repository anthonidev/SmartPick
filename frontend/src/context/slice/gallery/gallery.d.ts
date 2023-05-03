interface IGalleryState {
  loading: boolean;
  image: IImage | null;
}

interface IImage {
  id: number;
  name: string;
  format: string;
  url: string;
  public_id: string;
}
