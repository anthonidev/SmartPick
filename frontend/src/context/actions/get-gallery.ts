import { cache } from "react";
import "server-only";
export const preload = (token: string) => {
  void getGallery(token);
};
export const getGallery = cache(async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/image/gallery/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const gallery = await res.json();
  return gallery.images as IImage[];
});
