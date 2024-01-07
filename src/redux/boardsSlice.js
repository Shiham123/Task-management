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

    // ! add task
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex } = action.payload;
      const task = { title, description, subtasks, status };
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === newColIndex);
      column.tasks.push(task);
    },

    //  ! edit task
    editTask: (state, action) => {
      const { title, status, description, subtasks, prevColIndex, newColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.subtasks = subtasks;

      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);

      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },

    // ! delete board
    deleteBoard: (state) => {
      const board = state.find((board) => board.isActive);
      state.splice(state.indexOf(board), 1);
    },

    // ! subtask completed
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, idx) => idx === payload.colIndex);
      const task = col.tasks.find((task, idx) => idx === payload.taskIndex);
      const subtask = task.subtasks.find((subtask, idx) => idx === payload.index);
      subtask.isCompleted = !subtask.isCompleted;
    },

    // ! set task status
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const columns = board.columns;
      const col = columns.find((col, idx) => idx === payload.colIndex);

      if (payload.colIndex === payload.newColIndex) return;

      const task = col.tasks.find((task, idx) => idx === payload.taskIndex);
      task.status = payload.status;
      col.tasks = col.tasks.filter((task, idx) => idx !== payload.taskIndex);

      const newCol = columns.find((col, idx) => idx === payload.newColIndex);
      newCol.tasks.push(task);
    },
  },
});

export default boardsSlice;
