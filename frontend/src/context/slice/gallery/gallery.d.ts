interface IGalleryState {
  loading: boolean;
  image: IImage | null;
  gallery: IImage[] | null;
}

interface IImage {
  id: number;
  name: string;
  format: string;
  url: string;
  public_id: string;
  width: number;
  height: number;
  bytes: number;
}
