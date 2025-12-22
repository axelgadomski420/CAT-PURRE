import { createSlice } from '@reduxjs/toolkit';
const messagesSlice = createSlice({
  name: 'messages',
  initialState: { conversations: [] },
  reducers: {}
});
export default messagesSlice.reducer;
