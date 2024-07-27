import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  assignments: db.assignments,
  editingAssignment: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: assignment._id || new Date().getTime().toString(),
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        dueDate: assignment.dueDate,
        points: assignment.points,
        availableFrom: assignment.availableFrom,
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? { ...a, ...assignment } : a
      );
    },
    setEditingAssignment: (state, { payload: assignment }) => {
      state.editingAssignment = assignment;
    },
    clearEditingAssignment: (state) => {
      state.editingAssignment = null;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setEditingAssignment,
  clearEditingAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
