import http from "@/lib/utils/HttpToken";
import httpImage from "@/lib/utils/HttpImage";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import {
  loadEnterprise,
  loadEntity,
  setLoadingEnterprise,
} from "./enterpriseSlice";

export { createEnterprise, getEnterprise, updateEnterprise, getEntity };

const createEnterprise =
  (data: IFormEnterprise, token: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingEnterprise(true));

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("logo", data.logo[0]);
    formData.append("banner", data.banner[0]);
    const body = formData;

    await httpImage
      .post(`/api/enterprise/create/`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Datos guardados correctamente");
        dispatch(loadEnterprise(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoadingEnterprise(false));
      });
  };

const getEnterprise = (token: string) => async (dispatch: AppDispatch) => {
  await http
    .get(`/api/enterprise/list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(loadEnterprise(res.data));
    })
    .catch((err) => {
      dispatch(loadEnterprise(null));
    });
};

const updateEnterprise =
  (data: IFormEnterprise, token: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingEnterprise(true));
    await http
      .put(`/api/identify/enterprise/update/`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Datos guardados correctamente");
        dispatch(loadEnterprise(res.data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoadingEnterprise(false));
      });
  };

const getEntity = (token: string) => async (dispatch: AppDispatch) => {
  await http
    .get(`/api/enterprise/entity/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);

      dispatch(loadEntity(res.data));
    })
    .catch((err) => {
      dispatch(loadEntity(null));
    });
};
