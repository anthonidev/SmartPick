import httpImage from "@/lib/utils/HttpImage";
// import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import { setGallery, setImage, setLoadingGallery } from "./gallerySlice";

const galleryService = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingGallery(true));
  await httpImage
    .get("/api/image/gallery/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("galleryService", res.data);

      dispatch(setGallery(res.data.images));
    })
    .catch((err) => {
      // toast.error("Error loading images");
    })
    .finally(() => {
      dispatch(setLoadingGallery(false));
    });
};

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
        // toast.success("Image uploaded successfully");
        dispatch(setImage(res.data));
      })
      .catch((err) => {
        // toast.error("Error uploading image");
      })
      .finally(() => {
        dispatch(setLoadingGallery(false));
      });
  };
const filterService =
  (token: string, image: any, filter: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingGallery(true));
    const formData = new FormData();
    formData.append("image", image);

    await httpImage
      .post(`/api/image/filter/${filter}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // toast.success("Image uploaded successfully");
        dispatch(setImage(res.data));
      })
      .catch((err) => {
        // toast.error("Error uploading image");
      })
      .finally(() => {
        dispatch(setLoadingGallery(false));
      });
  };
const qualityService =
  (token: string, image: any, quality: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingGallery(true));
    const formData = new FormData();
    formData.append("image", image);

    await httpImage
      .post(`/api/image/quality/${quality}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // toast.success("Image uploaded successfully");
        dispatch(setImage(res.data));
      })
      .catch((err) => {
        // toast.error("Error uploading image");
      })
      .finally(() => {
        dispatch(setLoadingGallery(false));
      });
  };

const getImageService =
  (token: string, public_id: string) => async (dispatch: AppDispatch) => {
    console.log("public_id", public_id);

    dispatch(setLoadingGallery(true));
    await httpImage
      .get(`/api/image/gallery/${public_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setImage(res.data));
      })
      .catch((err) => {
        // toast.error("Error loading image");
      })
      .finally(() => {
        dispatch(setLoadingGallery(false));
      });
  };

export {
  removeBgService,
  galleryService,
  getImageService,
  filterService,
  qualityService,
};
