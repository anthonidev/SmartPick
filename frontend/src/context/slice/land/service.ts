import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import httpImage from "@/lib/utils/HttpImage";
import http from "@/lib/utils/HttpToken";
import { setLand, setLands, setLoadingLand } from "./landSlice";

export {
  addLandUser,
  detailLand,
  listLandUser,
  updateLandUser,
  updateGalleryLandUser,
  updateLandUserDetail,
};

const addLandUser =
  (token: string, data: ILandFormUser) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingLand(true));

    const formData = new FormData();
    let is_create: boolean = false;

    formData.append("name", data.name);
    formData.append("type_coin", data.type_coin);
    formData.append("price", data.price.toString());
    formData.append("compare_price", data.compare_price.toString());
    formData.append("area", data.area.toString());
    formData.append("image", data.image[0]);
    formData.append("quantity", data.quantity.toString());

    formData.append("google_maps", data.google_maps);
    formData.append("location", data.location);
    formData.append("department", data.department);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("whatsapp", data.whatsapp);
    formData.append("telegram", data.telegram);

    formData.append("image1", data.gallery.image1[0]);
    formData.append("image2", data.gallery.image2[0]);

    await httpImage
      .post(`/api/land/create/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setLands(res.data));
        is_create = true;
        toast.success("Lote creado correctamente");
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar la galeria");
      })
      .finally(() => {
        dispatch(setLoadingLand(false));
      });
    return is_create;
  };

const detailLand =
  (token: string, slug: string | string[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingLand(true));
    await http
      .get(`/api/land/detail/${slug}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setLand(res.data));
      })
      .catch((err) => {
        // toast.error("Error al cargar la información del lote");
      })
      .finally(() => {
        dispatch(setLoadingLand(false));
      });
  };

const listLandUser = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingLand(true));
  await http
    .get(`/api/land/user/list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setLands(res.data));
    })
    .catch((err) => {
      // toast.error("Error al cargar la información del lote");
    })
    .finally(() => {
      dispatch(setLoadingLand(false));
    });
};

const updateLandUser =
  (token: string, data: ILandForm, slug: string | string[]) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingLand(true));

    const formData = new FormData();
    let is_create: boolean = false;

    formData.append("name", data.name);
    formData.append("type_coin", data.type_coin);
    formData.append("price", data.price.toString());
    formData.append("compare_price", data.compare_price.toString());
    formData.append("area", data.area.toString());
    formData.append("image", data.image[0]);
    formData.append("quantity", data.quantity.toString());

    await httpImage
      .put(`/api/land/update/user/${slug}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setLand(res.data));
        toast.success("Lote actualizado correctamente");
        is_create = true;
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar la información del lote");
      })
      .finally(() => {
        dispatch(setLoadingLand(false));
      });
    return is_create;
  };

const updateGalleryLandUser =
  (token: string, data: IFormGalleryLand, slug: string | string[]) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingLand(true));

    const formData = new FormData();
    let is_create: boolean = false;

    formData.append("image1", data.galery.image1[0]);
    formData.append("image2", data.galery.image2[0]);

    await httpImage
      .put(`/api/land/update/gallery/user/${slug}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setLand(res.data));
        toast.success("Galeria actualizada correctamente");
        is_create = true;
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar la galeria");
      })
      .finally(() => {
        dispatch(setLoadingLand(false));
      });
    return is_create;
  };

const updateLandUserDetail =
  (
    token: string,
    data: ILandFormUser,
    slug: string | string[],
    values: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingLand(true));
    const formData = new FormData();
    let is_create: boolean = false;

    formData.append("google_maps", values);
    formData.append("location", data.location);
    formData.append("department", data.department);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("whatsapp", data.whatsapp);
    formData.append("telegram", data.telegram);
    await httpImage
      .put(`/api/land/update/contact/user/${slug}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setLand(res.data));
        toast.success("Información actualizada correctamente");
        is_create = true;
      })
      .catch((err) => {
        toast.error("Error al actualizar la información del lote");
        is_create = false;
      })
      .finally(() => {
        dispatch(setLoadingLand(false));
      });
    return is_create;
  };
