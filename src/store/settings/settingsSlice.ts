import { createSlice } from "@reduxjs/toolkit";
import { Settings } from "../../interfaces/interfaces";

interface SettingsState {
    settings: Settings[];
}

const initialState: SettingsState = {
  settings: [
    {
      name: "Show as obtained",
      value: "show_as_obtained",
      on: false,
    },
  ],
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSetting: (state, action) => {
      state.settings[action.payload].on = !state.settings[action.payload].on;
    },
  },
})

export const { setSetting } = settingsSlice.actions;
export default settingsSlice.reducer;