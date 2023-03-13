import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ILandState = {
  lands: null,
  land: null,
  loading: false,
  steps: [
    {
      id: 1,
      name: "Información",
      description: "Información del Lote",
      status: "current",
    },
    {
      id: 2,
      name: "Lotes",
      description: "Datos de contacto",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Confirmación",
      description: "Confirmación de los datos",
      status: "upcoming",
    },
  ],
  step: 1,
};

const landSlice = createSlice({
  name: "land",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;

      state.steps = state.steps.map((step) => {
        if (step.id === action.payload) {
          return {
            ...step,
            status: "current",
          };
        } else if (step.id < action.payload) {
          return {
            ...step,
            status: "complete",
          };
        } else {
          return {
            ...step,
            status: "upcoming",
          };
        }
      });
    },
    setMakeStep: (state, action: PayloadAction<number>) => {
      state.steps = state.steps.map((step) => {
        if (step.id === action.payload) {
          return {
            ...step,
            status: "current",
          };
        } else if (step.id === action.payload - 1) {
          return {
            ...step,
            status: "complete",
          };
        } else if (step.id === action.payload + 1) {
          return {
            ...step,
            status: "upcoming",
          };
        } else {
          return step;
        }
      });
    },
    resetStep: (state) => {
      state.step = 1;
      state.steps = state.steps.map((step) => {
        if (step.id === 1) {
          return {
            ...step,
            status: "current",
          };
        } else {
          return {
            ...step,
            status: "upcoming",
          };
        }
      });
    },
    setLoadingLand: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLands: (state, action: PayloadAction<ILand[]>) => {
      state.lands = action.payload;
    },
    setLand: (state, action: PayloadAction<ILandDetail>) => {
      state.land = action.payload;
    },
  },
});

export const {
  setLoadingLand,
  setLands,
  setStep,
  setMakeStep,
  resetStep,
  setLand,
} = landSlice.actions;

export default landSlice.reducer;
