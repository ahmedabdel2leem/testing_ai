import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

type respose = { id: string, description: string, title: string, status: string, subject: string, order: string; }[]
const getLessons = createAsyncThunk("lessons/getLessons", async (_, thunkAPI) => {
    const {rejectWithValue} =thunkAPI
    try {
        const response = await axios.get<respose>("http://localhost:3005/lessons");
        const data = response.data;
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data.message)
        } else
            return rejectWithValue("An Unexpected Error")
    }
  }
);

export default getLessons

