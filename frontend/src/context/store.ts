import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./slice/config/configSlice";
import accountReducer from "./slice/account/accountSlice";
import paymentReducer from "./slice/payment/paymentSlice";
import enterpriseReducer from "./slice/enterprise/enterpriseSlice";
import projectReducer from "./slice/project/projectSlice";
import landReducer from "./slice/land/landSlice";
import newsReducer from "./slice/news/newsSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    config: configReducer,
    account: accountReducer,
    payment: paymentReducer,
    enterprise: enterpriseReducer,
    project: projectReducer,
    land: landReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
