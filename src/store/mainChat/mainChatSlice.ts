import { createSlice } from "@reduxjs/toolkit";
import getMainChat from './act/actMainChat';



interface BootResponse {
    message: string;
    content: Question[];
    options: string[]
    isLoading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

interface Question {
    student_answer?: any;
    id?: string;
    lesson?: string;
    topic?: string;
    learning_phase?: LearningPhase;
    blooms_level?: BloomsLevel;
    learning_type?: LearningType;
    question_text?: string;
    content_type?: string;
    video_contents?: { url: string }
    question_type?: QuestionType;
    difficulty?: Difficulty;
    created_at?: string;
    updated_at?: string;
    cause?: string | null;
    question_location_in_video?: string | null;
    true_false_question?: TrueFalseQuestion;
    long_answer_question?: LongAnswerQuestion;
    sorting_question?: SortingQuestion;
    mcq_question?: MultipleChoiceQuestion;
    audio_base64?: string;

    combined_audio_base64?: string;
}

type LearningPhase = "INTRO_EXAM" | string;
type BloomsLevel = "UNDERSTAND" | "EVALUATE" | "ANALYZE" | "REMEMBER" | string;
type LearningType = "Visual" | string;
type QuestionType = "TRUE_FALSE" | "LONG_ANSWER" | "SORTING" | "MULTIPLE_CHOICE" | string;
type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | string;

interface TrueFalseQuestion {
    id: string;
    correct_answer: boolean;
    question: string;
}

interface LongAnswerQuestion {
    id: string;
    correct_answer: string;
    question: string;
}

interface SortingQuestion {
    id: string;
    correct_order: string[];
    question: string;
}

interface MultipleChoiceQuestion {
    id: string;
    choices: Choice[];
    correct_answer: string;
    question: string;
}

interface Choice {
    [key: string]: string;
}






const initialState: BootResponse = {
    message: " ",
    content: [
        {
            id: "",
            lesson: "",
            topic: "",
            learning_phase: "",
            blooms_level: "",
            learning_type: "",
            question_text: "",
            content_type: "",
            video_contents: { url: "" },
            question_type: "",
            difficulty: "",
            created_at: "",
            updated_at: "",
            question_location_in_video: "",
            true_false_question: { correct_answer: false, id: "", question: "" },
            long_answer_question: { correct_answer: "", id: "", question: "" },
            sorting_question: { correct_order: [""], id: "", question: "" },
            mcq_question: {
                correct_answer: "", id: "", question: "", choices: [
                    {
                        "": "Berlin"
                    },]
            },
            audio_base64: "",
            combined_audio_base64: "",
        }
        // Add more question objects as needed
    ],
    options: [],
    isLoading: 'idle',
    error: null,
};

const mainChatSlice = createSlice({
    name: "mainChat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMainChat.pending, (state) => {
            state.isLoading = "pending";
            state.error = null;
        });
        builder.addCase(getMainChat.fulfilled, (state, action: any) => {
            state.isLoading = "succeeded";
            state.error = null;
            state.message = action.payload.message;
            state.content = action.payload.content;
            state.options = action.payload.options;
            console.log(action.payload);
        });
        builder.addCase(getMainChat.rejected, (state, action: any) => {
            state.isLoading = "failed";
            state.error = action.payload ?? "An error occurred";
            console.log(action.payload);
        });
    },
});
export { getMainChat };

export default mainChatSlice.reducer;
