import { createSlice } from '@reduxjs/toolkit';
import data from '../../public/data.json';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: data.boards,
  reducers: {
    // ! add board
    addBoard: (state, action) => {
      const isActive = state.length > 0 ? false : true;
      const payload = action.payload;
      const board = { name: payload.name, isActive, columns: [] };
      board.columns = payload.newColumns;
      state.push(board);
    },

    // ! edit board
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      board.name = payload.name;
      board.columns = payload.newColumns;
    },

    // ! toggle board
    setBoardActive: (state, action) => {
      state.map((board, index) => {
        index === action.payload.index ? (board.isActive = true) : (board.isActive = false);
        return board;
      });
    },
  },
});

export default boardsSlice;
