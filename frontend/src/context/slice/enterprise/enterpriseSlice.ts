import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IEnterpriseState = {
  loading: false,
  entity: null,
  enterprise: null,
};

export const enterpriseSlice = createSlice({
  name: "enterprise",
  initialState,
  reducers: {
    setLoadingEnterprise(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    loadEntity(state, action: PayloadAction<IEntity | null>) {
      state.entity = action.payload;
    },
    loadEnterprise(state, action: PayloadAction<IEnterprise | null>) {
      state.enterprise = action.payload;
    },
    clearStateEnterprise(state) {
      state.entity = null;
      state.loading = false;
      state.enterprise = null;
    },
  },
});

export const {
  setLoadingEnterprise,
  loadEntity,
  loadEnterprise,
  clearStateEnterprise,
} = enterpriseSlice.actions;

export default enterpriseSlice.reducer;
