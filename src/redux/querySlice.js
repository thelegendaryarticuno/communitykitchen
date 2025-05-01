// src/redux/querySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQueryResult = createAsyncThunk(
  'query/fetchQueryResult',
  async (query_name) => {
    const response = await fetch('http://localhost:5000/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query_name }),
    });
    const data = await response.json();
    return data.data;
  }
);

const querySlice = createSlice({
  name: 'query',
  initialState: {
    results: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQueryResult.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchQueryResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default querySlice.reducer;
