import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BootResponse {
  chat_id: string;
  messages: { id: string, sender_type: "system", content: Content }[];
}

type Content = { id?: string; question_text?: string; student_answer?: string };




// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwNjY3NzE0LCJpYXQiOjE3MzA2Mzc3MTQsImp0aSI6ImJhMDg2MDMzZjMwYjQ3NTdhNWIxY2E3OWMxZDg0Njk0IiwidXNlcl9pZCI6Mn0.fYZeQIR6ugWKyzHPW8chSQjdLA9FMTtqSnNZC5pYmNc";


const getRestoreChat = createAsyncThunk("restoreMainChat/getRestoreChat", async (token:any, thunkAPI) => {
  console.log(token)
  const { rejectWithValue } = thunkAPI
  try {
    const response = await axios.get<BootResponse>("http://127.0.0.1:8000/chats/retrieve-messages/?lesson_id=20ecc322-fbb4-46ca-abcf-edcfcb34d42f", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error)
      return rejectWithValue(error.message)
    } else
      return rejectWithValue("An Unexpected Error")
  }
}
);

export default getRestoreChat

