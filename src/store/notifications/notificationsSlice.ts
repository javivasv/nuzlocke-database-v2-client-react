import { createSlice } from "@reduxjs/toolkit";

interface NotificationsState {
  openSnackbar: boolean | false;
  snackbarText: string | "";
}

const initialState: NotificationsState = {
  openSnackbar: false,
  snackbarText: "",
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.openSnackbar = true;
      state.snackbarText = action.payload;
    },
    hideSnackbar: (state) => {
      state.openSnackbar = false;
      state.snackbarText = "";  
    },
  },
})

export const { showSnackbar, hideSnackbar } = notificationsSlice.actions;
export default notificationsSlice.reducer;