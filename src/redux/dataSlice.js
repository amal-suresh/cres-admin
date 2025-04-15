import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  teachers: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students.splice(action.payload, 1);
    },
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    deleteTeacher: (state, action) => {
      state.teachers.splice(action.payload, 1);
    },
  },
});

export const { addStudent, deleteStudent, addTeacher, deleteTeacher } = dataSlice.actions;

export default dataSlice.reducer;
