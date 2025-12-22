import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
