import httpImage from "@/lib/utils/HttpImage";
import http from "@/lib/utils/HttpToken";

import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import {
  setAreas,
  setLoadingProject,
  setProject,
  setProjects,
} from "./projectSlice";

export {
  getAreas,
  createProject,
  listProjects,
  detailProject,
  updateProject,
  updateSocialContact,
  updateGallery,
  addLand,
};

const getAreas = (token: string) => async (dispatch: AppDispatch) => {
  await http
    .get(`/api/project/areas/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setAreas(res.data));
    })
    .catch((err) => {
      dispatch(setAreas(null));
    });
};

const listProjects = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingProject(true));
  await http
    .get(`/api/project/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);

      dispatch(setProjects(res.data));
    })
    .catch((err) => {
      dispatch(setProjects(null));
    })
    .finally(() => {
      dispatch(setLoadingProject(false));
    });
};

const detailProject =
  (token: string, slug: string | string[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingProject(true));
    await http
      .get(`/api/project/detail/${slug}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setProject(res.data));
      })
      .catch((err) => {
        dispatch(setProject(null));
      })
      .finally(() => {
        dispatch(setLoadingProject(false));
      });
  };

const createProject =
  (token: string, data: IFormProject) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingProject(true));
    const areas: any = data.areas;
    let land: any = [];

    data.land.map((item: any) => {
      land.push({
        name: item.name,
        type_coin: item.type_coin,
        price: item.price,
        compare_price: item.compare_price,
        area: item.area,
        image: item.image[0],
        quantity: item.quantity,
        gallery: {
          image1: item.gallery.image1[0],
          image2: item.gallery.image2[0],
        },
      });
    });

    let is_create: boolean = false;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("google_maps", data.google_maps);
    formData.append("stage", data.stage);
    formData.append("location", data.location);
    formData.append("department", data.department);
    formData.append("areas", areas);
    formData.append("logo", data.logo[0]);
    formData.append("masterplan", data.masterplan[0]);

    formData.append("image1", data.galery.image1[0]);
    formData.append("image2", data.galery.image2[0]);
    formData.append("image3", data.galery.image3[0]);
    formData.append("image4", data.galery.image4[0]);

    formData.append("num_land", land.length);

    land.map((item: any, index: number) => {
      formData.append(`land[${index}][name]`, item.name);
      formData.append(`land[${index}][type_coin]`, item.type_coin);
      formData.append(`land[${index}][price]`, item.price);
      formData.append(`land[${index}][compare_price]`, item.compare_price);
      formData.append(`land[${index}][area]`, item.area);
      formData.append(`land[${index}][image]`, item.image);
      formData.append(`land[${index}][quantity]`, item.quantity);
      formData.append(`land[${index}][gallery][image1]`, item.gallery.image1);
      formData.append(`land[${index}][gallery][image2]`, item.gallery.image2);
    });

    formData.append("contact", JSON.stringify(data.contact));
    formData.append("social", JSON.stringify(data.social));

    const body = formData;

    await httpImage
      .post(`/api/project/create/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Proyecto creado correctamente");
        console.log(res.data);
        is_create = true;
      })
      .catch((err) => {
        console.log(err);
        is_create = false;
      })
      .finally(() => {
        dispatch(setLoadingProject(false));
      });
    return is_create;
  };

const updateProject =
  (
    token: string,
    slug: string | string[],
    data: IFormProject,
    values: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingProject(true));

    console.log("maps", data.google_maps);

    const areas: any = data.areas;

    let is_create: boolean = false;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("google_maps", values);

    formData.append("stage", data.stage);
    formData.append("location", data.location);
    formData.append("department", data.department);
    formData.append("areas", areas);
    formData.append("logo", data.logo[0] || undefined);
    formData.append("masterplan", data.masterplan[0] || undefined);
    const body = formData;

    await httpImage
      .post(`/api/project/detail/${slug}/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setProject(res.data));
        is_create = true;
        toast.success("Proyecto actualizado correctamente");
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar el proyecto");
      })
      .finally(() => {
        dispatch(setLoadingProject(false));
      });
    return is_create;
  };

const updateSocialContact =
  (token: string, slug: string | string[], data: IFormSocialAndContact) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingProject(true));
    let is_create: boolean = false;
    const formData = new FormData();
    formData.append("contact", JSON.stringify(data.contact));
    formData.append("social", JSON.stringify(data.social));
    const body = formData;

    await httpImage
      .post(`/api/project/detail/social/update/${slug}/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setProject(res.data));
        is_create = true;
        toast.success("Contacto actualizado correctamente");
        console.log(res.data);
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar el contacto");
      })
      .finally(() => {
        dispatch(setLoadingProject(false));
      });
    return is_create;
  };

const updateGallery =
  (token: string, slug: string | string[], data: IFormGalleryProject) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingProject(true));
    let is_create: boolean = false;
    const formData = new FormData();
    formData.append("image1", data.galery.image1[0] || undefined);
    formData.append("image2", data.galery.image2[0] || undefined);
    formData.append("image3", data.galery.image3[0] || undefined);
    formData.append("image4", data.galery.image4[0] || undefined);
    const body = formData;
    await httpImage
      .post(`/api/project/detail/gallery/update/${slug}/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setProject(res.data));
        is_create = true;
        toast.success("Galeria actualizada correctamente");
        console.log(res.data);
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar la galeria");
      })
      .finally(() => {
        dispatch(setLoadingProject(false));
      });
    return is_create;
  };
const addLand =
  (token: string, slug: string | string[], data: ILandForm) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingProject(true));

    const formData = new FormData();
    let is_create: boolean = false;

    formData.append("name", data.name);
    formData.append("type_coin", data.type_coin);
    formData.append("price", data.price.toString());
    formData.append("compare_price", data.compare_price.toString());
    formData.append("area", data.area.toString());
    formData.append("image", data.image[0]);
    formData.append("quantity", data.quantity.toString());
    formData.append("image1", data.gallery.image1[0]);
    formData.append("image2", data.gallery.image2[0]);

    await httpImage
      .post(`/api/land/create/${slug}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setProject(res.data));
        is_create = true;
        toast.success("Lote creado correctamente");
      })
      .catch((err) => {
        is_create = false;
        toast.error("Error al actualizar la galeria");
      })
      .finally(() => {
        dispatch(setLoadingProject(false));
      });
    return is_create;
  };
