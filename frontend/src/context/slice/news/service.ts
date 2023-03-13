import http from "@/lib/utils/HttpToken";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import { setCarousel, setFeeds, setLoadingNews } from "./newsSlice";

export { getCarousel, getFeeds };

const getCarousel = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingNews(true));

  await http
    .get(`/api/news/carousel/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setCarousel(res.data));
    })
    .catch((err) => {
      toast.error("Error al cargar la información del lote");
    })
    .finally(() => {
      dispatch(setLoadingNews(false));
    });
};

const getFeeds = (token: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingNews(true));

  await http
    .get(`/api/news/feed/5/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(setFeeds(res.data));
    })
    .catch((err) => {})
    .finally(() => {
      dispatch(setLoadingNews(false));
    });
};
