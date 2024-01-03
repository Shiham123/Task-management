import { createSlice } from '@reduxjs/toolkit';
import data from '../../public/data.json';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: data.boards,
  reducers: {
    // TODO: write our reducers here
  },
});

export default boardsSlice;
