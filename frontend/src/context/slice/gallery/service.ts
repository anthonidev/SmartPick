import httpImage from "@/lib/utils/HttpImage";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import { setImage, setLoadingGallery } from "./gallerySlice";

const removeBgService =
  (token: string, image: any) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingGallery(true));
    const formData = new FormData();
    formData.append("image", image);

    await httpImage
      .post("/api/image/removebg/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Image uploaded successfully");
        dispatch(setImage(res.data));
      })
      .catch((err) => {
        toast.error("Error uploading image");
      })
      .finally(() => {
        dispatch(setLoadingGallery(false));
      });
  };

export { removeBgService };
