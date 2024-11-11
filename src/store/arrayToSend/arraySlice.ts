// src/redux/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    sendedChat: any[]; // Define the type of your chat state (can be more specific)
}

const initialState: ChatState = {
    sendedChat: [],
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Action to set sendedChat state
        arrayToSend: (state, action: PayloadAction<any[]>) => {
            const updatedChat = [...state.sendedChat, ...action.payload];
            state.sendedChat = updatedChat;
        },
        // Action to update the last entry with student's answer
        updateLastEntry: (state, action: PayloadAction<any>) => {
            const { processedAnswer, content, currentMessage } = action.payload;
            const updatedChat = [...state.sendedChat];

            // Update the last entry with the student's answer
            if (updatedChat.length > 0) {
                updatedChat[updatedChat.length - 1] = {
                    ...updatedChat[updatedChat.length - 1],
                    student_answer: processedAnswer,
                };
            }

            // Add a new entry for the next question, if there's a next question
            if (currentMessage < content.length) {
                const nextQuestion = content[currentMessage + 1];
                updatedChat.push({ ...nextQuestion, student_answer: "" });
            }

            state.sendedChat = updatedChat;
        },
        // Action to reset the sendedChat state to an empty array
        resetChat: (state) => {
            state.sendedChat = [];
        },
    },
});

export const { arrayToSend, updateLastEntry, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
