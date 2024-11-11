import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



const sendCapturedImage = createAsyncThunk("sendImage/sendCapturedImage", async ({ base64String, token }: any, thunkAPI) => {
  const cleanBase64 = base64String.replace("data:image/png;base64,", "");
  const body = {
    frame: cleanBase64,
    subject_id: "5ae529bd-2a81-4011-804c-e13d72192fb9",
    lesson_id: "20ecc322-fbb4-46ca-abcf-edcfcb34d42f",
  };
  const { rejectWithValue } = thunkAPI
  try {
        const response = await axios.post<any>(
    "http://127.0.0.1:8000/questions/track-concentration/",
    body,
    {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    }
  );

    const data = response.data;
    // console.log(`${response} this form act data Sub`)
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

export default sendCapturedImage

