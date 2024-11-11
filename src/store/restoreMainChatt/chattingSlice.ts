import { createSlice } from "@reduxjs/toolkit";
import getRestoreChat from './act/actChatting';





interface BootResponse {
    chat_id: string;
    messages: { id: string, sender_type: "system", content: Content }[];
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

type Content = { id?: string; question_text?: string; student_answer?: string };

// interface Question {
//     id: string;
//     lesson: string;
//     topic: string;
//     learning_phase: LearningPhase;
//     blooms_level: BloomsLevel;
//     learning_type: LearningType;
//     question_text: string;
//     question_type: QuestionType;
//     difficulty: Difficulty;
//     created_at: string;
//     updated_at: string;
//     cause: string | null;
//     question_location_in_video: string | null;
//     true_false_question?: TrueFalseQuestion;
//     long_answer_question?: LongAnswerQuestion;
//     sorting_question?: SortingQuestion;
//     mcq_question?: MultipleChoiceQuestion;
//     audio_base64: string;
//     combined_audio_base64?: string;
// }

// type LearningPhase = "INTRO_EXAM" | string;
// type BloomsLevel = "UNDERSTAND" | "EVALUATE" | "ANALYZE" | "REMEMBER" | string;
// type LearningType = "Visual" | string;
// type QuestionType = "TRUE_FALSE" | "LONG_ANSWER" | "SORTING" | "MULTIPLE_CHOICE" | string;
// type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;

// interface TrueFalseQuestion {
//     id: string;
//     correct_answer: boolean;
//     question: string;
// }

// interface LongAnswerQuestion {
//     id: string;
//     correct_answer: string;
//     question: string;
// }

// interface SortingQuestion {
//     id: string;
//     correct_order: string[];
//     question: string;
// }

// interface MultipleChoiceQuestion {
//     id: string;
//     choices: Choice[];
//     correct_answer: string;
//     question: string;
// }

// interface Choice {
//     [key: string]: string;
// }






const initialState: BootResponse = {
    chat_id: "",
    messages: [
        {
            id: "",
            sender_type: "system",
            content: {}
        }
    ],
    isLoading: 'idle',
    error: null,
};



const restoreMainChatSlice = createSlice({
    name: "restoreMainChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRestoreChat.pending, (state) => {
            state.isLoading = "pending";
            state.error = null;
            console.log("loading");
        });
        builder.addCase(getRestoreChat.fulfilled, (state, action: any) => {
            state.isLoading = "succeeded";
            state.error = null;
            state.messages = action.payload.messages;
            console.log(action.payload.messages);
        });
        builder.addCase(getRestoreChat.rejected, (state, action: any) => {
            state.isLoading = "failed";
            state.error = action.payload ?? "An error occurred";
            console.log(action.payload);
        });
    },
});
export { getRestoreChat };

export default restoreMainChatSlice.reducer;
