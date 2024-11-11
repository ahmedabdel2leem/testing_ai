import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BootResponse {
    message: string;
    content: Question[];
}

interface Question {
    id?: string;
    lesson?: string;
    topic?: string;
    learning_phase?: LearningPhase;
    blooms_level?: BloomsLevel;
    learning_type?: LearningType;
    question_text?: string;
    content_type?: string;
    video_contents?: { url: string };
    question_type?: QuestionType;
    difficulty?: Difficulty;
    created_at?: string;
    updated_at?: string;
    cause?: string | null;
    question_location_in_video?: string | null;
    true_false_question?: TrueFalseQuestion;
    student_answer: boolean;
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


const userResponse = {
    "message": "من فضلك اجب عن اسئله من خلال فهمك ل التمهيد ",
    "content": [
        // {
        //     "id": "5392fedd-20d7-404c-b332-e2d820da4d1b",
        //     "lesson": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
        //     "topic": "cb81e633-b05a-4249-a17e-cd74124f5a35",
        //     "learning_phase": "CONCEPTUAL_EXAM",
        //     "blooms_level": "UNDERSTAND",
        //     "learning_type": "Visual",
        //     "question_text": "The earth is flat.",
        //     "question_type": "TRUE_FALSE",
        //     "difficulty": "BEGINNER",
        //     "created_at": "2024-10-31T12:27:34.280546Z",
        //     "updated_at": "2024-10-31T12:27:34.280546Z",
        //     "cause": null,
        //     "question_location_in_video": null,
        //     "true_false_question": {
        //         "id": "7e108d08-bfe6-4a00-afac-36adb7e00bbb",
        //         "correct_answer": true,
        //         "question": "5392fedd-20d7-404c-b332-e2d820da4d1b"
        //     },
        //     "student_answer": true
        // },
        // {
        //     "id": "e3d707a3-1b3a-42db-ad4e-9a283b4b1183",
        //     "lesson": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
        //     "topic": "cb81e633-b05a-4249-a17e-cd74124f5a35",
        //     "learning_phase": "CONCEPTUAL_EXAM",
        //     "blooms_level": "UNDERSTAND",
        //     "learning_type": "Visual",
        //     "question_text": "The earth is flat.",
        //     "question_type": "TRUE_FALSE",
        //     "difficulty": "INTERMEDIATE",
        //     "created_at": "2024-10-31T12:27:34.337950Z",
        //     "updated_at": "2024-10-31T12:27:34.337950Z",
        //     "cause": null,
        //     "question_location_in_video": null,
        //     "true_false_question": {
        //         "id": "004b2b45-3c17-40d0-b658-dfe20d414134",
        //         "correct_answer": true,
        //         "question": "e3d707a3-1b3a-42db-ad4e-9a283b4b1183"
        //     },
        //     "student_answer": true
        // },
        // {
        //     "id": "aed902a9-fc7d-43e3-bc78-5ade53855ebb",
        //     "lesson": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
        //     "topic": "cb81e633-b05a-4249-a17e-cd74124f5a35",
        //     "learning_phase": "CONCEPTUAL_EXAM",
        //     "blooms_level": "UNDERSTAND",
        //     "learning_type": "Visual",
        //     "question_text": "The earth is flat.",
        //     "question_type": "TRUE_FALSE",
        //     "difficulty": "ADVANCED",
        //     "created_at": "2024-10-31T12:27:34.394661Z",
        //     "updated_at": "2024-10-31T12:27:34.394661Z",
        //     "cause": null,
        //     "question_location_in_video": null,
        //     "true_false_question": {
        //         "id": "faf1ac49-f3e2-4a9f-b334-3acf312c9a2e",
        //         "correct_answer": true,
        //         "question": "aed902a9-fc7d-43e3-bc78-5ade53855ebb"
        //     },
        //     "student_answer": true
        // },
        // {
        //     "id": "aa3bc7a1-524e-4a5c-b12c-b1b112bb96ba",
        //     "lesson": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
        //     "topic": "cb81e633-b05a-4249-a17e-cd74124f5a35",
        //     "learning_phase": "CONCEPTUAL_EXAM",
        //     "blooms_level": "EVALUATE",
        //     "learning_type": "Visual",
        //     "question_text": "من هو فيثاغورث",
        //     "question_type": "LONG_ANSWER",
        //     "difficulty": "BEGINNER",
        //     "created_at": "2024-10-31T21:11:06.362433Z",
        //     "updated_at": "2024-10-31T21:11:06.363430Z",
        //     "cause": null,
        //     "question_location_in_video": null,
        //     "long_answer_question": {
        //         "id": "1dd64dbd-3dd6-4035-9b1d-d26bdc400bef",
        //         "correct_answer": "مخترع نظريه فيثاغورث",
        //         "question": "aa3bc7a1-524e-4a5c-b12c-b1b112bb96ba"
        //     },
        //     "student_answer": "مخترع نظريه فيثاغورث"
        // },
        // {
        //     "id": "4057c633-6b24-4315-96c0-59a0d000aa03",
        //     "lesson": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
        //     "topic": "cb81e633-b05a-4249-a17e-cd74124f5a35",
        //     "learning_phase": "CONCEPTUAL_EXAM",
        //     "blooms_level": "ANALYZE",
        //     "learning_type": "Visual",
        //     "question_text": "رتب أ. 1 ب. 2 ج.4 د. 3",
        //     "question_type": "SORTING",
        //     "difficulty": "BEGINNER",
        //     "created_at": "2024-10-31T21:14:16.429762Z",
        //     "updated_at": "2024-10-31T21:14:16.429762Z",
        //     "cause": null,
        //     "question_location_in_video": null,
        //     "sorting_question": {
        //         "id": "879dc221-190e-4a6e-8071-3033ccfcca92",
        //         "correct_order": [
        //             "أ",
        //             "ب",
        //             "د",
        //             "ج"
        //         ],
        //         "question": "4057c633-6b24-4315-96c0-59a0d000aa03"
        //     },
        //     "student_answer": ["أ", "ب", "د", "ج"]
        // },
        // {
        //     "id": "6a625ef4-9008-4725-96d2-3b90b2a58bfe",
        //     "lesson": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
        //     "topic": "cb81e633-b05a-4249-a17e-cd74124f5a35",
        //     "learning_phase": "CONCEPTUAL_EXAM",
        //     "blooms_level": "REMEMBER",
        //     "learning_type": "Visual",
        //     "question_text": "What is the capital of France?",
        //     "question_type": "MULTIPLE_CHOICE",
        //     "difficulty": "BEGINNER",
        //     "created_at": "2024-10-31T21:26:11.622742Z",
        //     "updated_at": "2024-10-31T21:26:11.622742Z",
        //     "cause": null,
        //     "question_location_in_video": null,
        //     "mcq_question": {
        //         "id": "18ecb333-c861-484c-939c-5e57327e214a",
        //         "choices": [
        //             {
        //                 "أ": "Berlin"
        //             },
        //             {
        //                 "ب": "Madrid"
        //             },
        //             {
        //                 "ج": "Paris"
        //             },
        //             {
        //                 "د": "Rome"
        //             }
        //         ],
        //         "correct_answer": "ج",
        //         "question": "6a625ef4-9008-4725-96d2-3b90b2a58bfe"
        //     },
        //     "student_answer": "ج"
        // }
    ],
    "lesson_id": "20ecc322-fbb4-46ca-abcf-edcfcb34d42f"
}


// const response = await axios.post<any>("http://localhost:8000/chats/send_message/", JSON.parse(JSON.stringify(userResponse)), {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// });

const getMainChat = createAsyncThunk("mainChat/getMainChat", async ({ token, content }: { token: string; content: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await axios.post<any>("http://localhost:8000/chats/send_message/", { content, lesson_id: "20ecc322-fbb4-46ca-abcf-edcfcb34d42f" }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.message)
        } else
            return rejectWithValue("An Unexpected Error")
    }
}
);

export default getMainChat

