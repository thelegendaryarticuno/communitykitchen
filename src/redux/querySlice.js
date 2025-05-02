// src/redux/queryslice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQueryResult = createAsyncThunk(
  'query/fetchQueryResult',
  async (query_name, { rejectWithValue }) => {
    const response = await fetch('https://kitchen-backend-ts8l.onrender.com/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query_name }),
    });
    const data = await response.json();
    if (data.error) {
      // Pass the error message to the rejected action
      return rejectWithValue(data.error);
    }
    // Return both data and query
    return { results: data.data, query: data.query };
  }
);
const querySlice = createSlice({
  name: 'query',
  initialState: {
    results: [],
    query: '',
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
        state.results = action.payload.results;
        state.query = action.payload.query;
      })
      .addCase(fetchQueryResult.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        state.results = [];
        state.query = '';
      });
  },
});

export default querySlice.reducer;
