import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IProjectState = {
  projects: null,
  project: null,
  loading: false,
  step: 1,
  areas: null,
  steps: [
    {
      id: 1,
      name: "Información",
      description: "Información del proyecto",
      status: "current",
    },
    {
      id: 2,
      name: "Lotes",
      description: "Información de los lotes",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Confirmación",
      description: "Confirmación de los datos",
      status: "upcoming",
    },
  ],
};

const projectSlice = createSlice({
  name: "project",
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
    setAreas: (state, action: PayloadAction<IArea[] | null>) => {
      state.areas = action.payload;
    },
    setLoadingProject: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProjects: (state, action: PayloadAction<IProject[] | null>) => {
      state.projects = action.payload;
    },
    setProject: (state, action: PayloadAction<IProject | null>) => {
      state.project = action.payload;
    },
  },
});

export const {
  setStep,
  setAreas,
  setMakeStep,
  setLoadingProject,
  resetStep,
  setProjects,
  setProject,
} = projectSlice.actions;

export default projectSlice.reducer;
