import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchCats = createAsyncThunk('cats/fetchCats', async (filters) => {
  const response = await axios.get(`${API_URL}/api/cats`, { params: filters });
  return response.data;
});

const catsSlice = createSlice({
  name: 'cats',
  initialState: {
    items: [],
    loading: false,
    total: 0
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      state.items = action.payload.cats;
      state.total = action.payload.total;
    });
  }
});

export default catsSlice.reducer;
