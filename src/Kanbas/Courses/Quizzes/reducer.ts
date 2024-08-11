import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";

const initialState = {
  quizzes: db.quizzes,
  editingQuiz: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",

  initialState,

  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz = {
        _id: quiz._id || new Date().getTime().toString(),
        title: quiz.title,
        description: quiz.description,
        course: quiz.course,
        dueDate: quiz.dueDate,
        points: quiz.points,
        availableFrom: quiz.availableFrom,
        questions: [],

        untilDate: "",
        total_questions: 0,
        type: "Graded Quiz",
        assignment_group: "Quizzes",
        shuffle_answer: true,
        time_limit: 20,
        multiple_attempts: false,
        how_many_attempts: 1,
        show_correct_answers: "Immediately",
        access_code: "",
        one_question_at_a_time: true,
        webcam_required: false,
        lock_after_answering: false,
        lockdown_browser: false,
        required_to_view_result: false,
        view_responses: "Always",
      };
      state.quizzes.push(newQuiz);
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? { ...a, ...quiz } : a
      );
    },

    setEditingQuiz: (state, { payload: quiz }) => {
      state.editingQuiz = quiz;
    },

    clearEditingQuiz: (state) => {
      state.editingQuiz = null;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setEditingQuiz,
  clearEditingQuiz,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
