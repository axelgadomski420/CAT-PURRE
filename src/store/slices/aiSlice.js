import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const recognizeBreed = createAsyncThunk('ai/recognize', async (file) => {
  return { breed: 'British Shorthair', confidence: 95 };
});

const aiSlice = createSlice({
  name: 'ai',
  initialState: { breedRecognition: null, chatHistory: [] },
  reducers: {
    addChatMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    }
  }
});

export const { addChatMessage } = aiSlice.actions;
export default aiSlice.reducer;
