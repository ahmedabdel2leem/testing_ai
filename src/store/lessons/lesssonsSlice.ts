import { createSlice , } from "@reduxjs/toolkit";
import getLessons from "./act/actAllLessons"



interface LessonsState {
  lessons: {id:string ,  description:string , title:string ,   status:string , subject:string , order:string }[]; //
  isLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null;
}



const initialState:LessonsState = {
  lessons: [],
  isLoading: "idle",
  error: null,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLessons.pending, (state) => {
      state.isLoading = "pending";
      state.error = null;
    })
    builder.addCase(getLessons.fulfilled, (state , action) => {
      state.isLoading = "succeeded";
      state.error = null;
      state.lessons = action.payload;
    })
    builder.addCase(getLessons.rejected, (state , action) => {
      state.isLoading = "failed";
        state.error = action.payload as string;
    })
  },
});
export { getLessons };

export default lessonsSlice.reducer;
