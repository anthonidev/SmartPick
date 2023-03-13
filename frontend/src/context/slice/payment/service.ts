import http from "@/lib/utils/HttpToken";

import { AppDispatch } from "../../store";
import {
  setCard,
  setLoadingPayment,
  setPricings,
  setSuscriptionUser,
} from "./paymentSlice";
import { toast } from "react-toastify";
import { loadAccount, setSuscription } from "../account/accountSlice";

export {
  getPricing,
  suscriberInit,
  getCretidCardSuscription,
  updateCreditCard,
  updateSubscription,
};

const getPricing = (token: string) => async (dispatch: AppDispatch) => {
  await http
    .get(`/api/plan/pricing/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setPricings(res.data));
    })
    .catch((err) => {
      dispatch(setPricings(null));
    });
};
const suscriberInit =
  (token: string, data: ISendDataSuscriber) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoadingPayment(true));
    await http
      .post(`/api/plan/subscription_initial/`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.payload.message);
        dispatch(loadAccount(res.data.payload.account));
        dispatch(setSuscription(res.data.payload.subscription));
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Ha ocurrido un error en el servidor");
        }
      })
      .finally(() => {
        dispatch(setLoadingPayment(false));
      });
  };

const getCretidCardSuscription =
  (token: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingPayment(true));
    await http
      .get(`/api/plan/credit_card/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.payload);
        dispatch(setCard(res.data.payload.card));
        dispatch(setSuscriptionUser(res.data.payload.subscription));
      })
      .catch((err) => {
        toast.error("Ha ocurrido un error en el servidor");
      })
      .finally(() => {
        dispatch(setLoadingPayment(false));
      });
  };

const updateCreditCard =
  (token: string, data: IFormCard) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingPayment(true));
    await http
      .put(`/api/plan/credit_card/update/`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setCard(res.data));
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Ha ocurrido un error en el servidor");
        }
      })
      .finally(() => {
        dispatch(setLoadingPayment(false));
      });
  };

const updateSubscription =
  (token: string, id: string | number) => async (dispatch: AppDispatch) => {
    dispatch(setLoadingPayment(true));
    await http
      .put(`/api/plan/subscription/update/`, JSON.stringify(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setSuscriptionUser(res.data));
        toast.success("Suscripción actualizada");
      })
      .catch((err) => {
        if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Ha ocurrido un error en el servidor");
        }
      })
      .finally(() => {
        dispatch(setLoadingPayment(false));
      });
  };
