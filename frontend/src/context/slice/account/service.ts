import { loadAccount, setLoadingAccount, setSuscription } from "./accountSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store";
import http from "@/lib/utils/HttpToken";

export { createAccount, getAccount, updateAccount, getSubAcount };

const createAccount =
  (data: IFormInitialConfig, token: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingAccount(true));
    await http
      .post(`/api/identify/account/create/`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Datos guardados correctamente");
        dispatch(loadAccount(res.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo salió mal");
      })
      .finally(() => {
        dispatch(setLoadingAccount(false));
      });
  };

const getSubAcount = (token: string) => async (dispatch: AppDispatch) => {
  await http
    .get(`/api/identify/account/sub/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setSuscription(res.data));
    })
    .catch((err) => {});
};
const getAccount = (token: string) => async (dispatch: AppDispatch) => {
  await http
    .get(`/api/identify/account/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(loadAccount(res.data));
    })
    .catch((err) => {});
};

const updateAccount =
  (token: string, data: IFormInitialConfig) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingAccount(true));
    let redirec: boolean = false;

    await http
      .put(`/api/identify/account/update/`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Datos guardados correctamente");
        dispatch(loadAccount(res.data));
        redirec = true;
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo salió mal");
        redirec = false;
      })
      .finally(() => {
        dispatch(setLoadingAccount(false));
      });
    return redirec;
  };
