import { createSlice } from '@reduxjs/toolkit';




const cameraAcsessSlise = createSlice({
  name: 'camera',
  initialState: {
    camerIsAcsessable: false, // Initial state is expanded (not collapsed)
  },
  reducers: {
    changeAcess(state , {payload}) {
          state.camerIsAcsessable = payload;
    },
  },
});

export default cameraAcsessSlise.reducer;
export const { changeAcess } = cameraAcsessSlise.actions;