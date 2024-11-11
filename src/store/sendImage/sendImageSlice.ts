import { createSlice , } from "@reduxjs/toolkit";
import sendCapturedImage from "./act/actSendImage"





const initialState = {
  userStatues: {
    is_concentrated: 0,
    emotion: "neutral"
},
  isLoading: "idle",
  error: null as string | null,
};

const sendImageSlice = createSlice({
  name: "sendImage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(sendCapturedImage.pending, (state) => {
      state.isLoading = "pending";
      state.error = null;

    })
    builder.addCase(sendCapturedImage.fulfilled, (state , action) => {
      state.isLoading = "succeeded";
      state.error = null;
      state.userStatues = action.payload;
        console.log(action.payload)

    })
    builder.addCase(sendCapturedImage.rejected, (state , action) => {
      state.isLoading = "failed";
      if (action.payload && typeof action.payload  === "string"  ) {
        state.error = action.payload;
        console.log(action)
      }
    })
  },
});
export { sendCapturedImage };

export default sendImageSlice.reducer;
