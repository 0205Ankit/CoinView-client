import { createSlice, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { Api } from "./apiSlice";

// dummy intial state for users

const initialModalState = {
  display: false,
  data: {},
};

const modal = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    showModal: (state, action) => {
      state.display = true;
      state.data = action.payload;
    },
    hideModal: (state) => {
      state.display = false;
      state.data = {};
    },
  },
});

const store = configureStore({
  reducer: {
    modal: modal.reducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);

export const modalSliceActions = modal.actions;

export type RootState = ReturnType<typeof store.getState>;

export default store;
