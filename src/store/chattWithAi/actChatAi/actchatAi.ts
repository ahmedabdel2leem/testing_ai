import { createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";







const aiChatt = createAsyncThunk("aiChat/aiChatt", async ({ userResponse, token }: any, thunkAPI) => {
    const {rejectWithValue} =thunkAPI
    try {
        const response = await axios.post("http://127.0.0.1:8000/chats/answer_and_audio/" , userResponse ,{headers:{
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

export default aiChatt

