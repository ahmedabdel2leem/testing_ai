import { createSlice } from "@reduxjs/toolkit";
import aiChatt from './actChatAi/actchatAi';




const initialState = {
    aiResponse: {
        question: "",
        answer: "",
        audio_base64: ""
    },
    isLoading: 'idle',

    error: null,
};

const aiChatSlice = createSlice({
    name: "aiChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(aiChatt.pending, (state) => {
            state.isLoading = "pending";
            state.error = null;
        });
        builder.addCase(aiChatt.fulfilled, (state, action: any) => {
            state.isLoading = "succeeded";
            state.error = null;
            state.aiResponse.question = action.payload.question;
            state.aiResponse.answer = action.payload?.answer ?? "";

            state.aiResponse.audio_base64 = action.payload.audio_base64 ?? "";
            console.log(action.payload);
        });
        builder.addCase(aiChatt.rejected, (state, action: any) => {
            state.isLoading = "failed";
            state.error = action.payload ?? "An error occurred";
            console.log(action.payload);
        });
    },
});
export { aiChatt };

export default aiChatSlice.reducer;
