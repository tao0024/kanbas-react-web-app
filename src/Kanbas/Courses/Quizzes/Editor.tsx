import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoEllipsisVertical} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MdDoNotDisturbAlt } from "react-icons/md";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  addQuiz,
  updateQuiz,
  clearEditingQuiz,
  setEditingQuiz,
} from "./reducer";
import "./editor.css";

interface Question {

  _id: number;
  type: string;
  title: string;
  points: number;
  question: string;
  answers: string[];
  correct_answer: string;
  true_or_false: boolean;
  blanks: string[];

}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  total_questions: number;

  type: string;
  questionList: Question[];
  assignment_group: string;
  shuffle_answer: boolean;
  time_limit: number;
  multiple_attempts: boolean;
  how_many_attempts: number;
  show_correct_answers: string;
  access_code: string;
  one_question_at_a_time: boolean;
  webcam_required: boolean;
  lock_after_answering: boolean;
  lockdown_browser: boolean;
  required_to_view_result:boolean;
  view_responses: string;

  dueDate: string;
  availableFrom: string;
  untilDate: string;
}

export default function QuizEditor() {

  const { qid, cid } = useParams<{ qid?: string; cid?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes, editingQuiz } = useSelector(
    (state: any) => state.quizzesReducer
  );

  // quiz init
  const [quiz, setQuiz] = useState<Quiz>({
    _id: qid || "",
    title: "",
    description: "",
    points: 0,
    dueDate: "",
    availableFrom: "",
    untilDate: "",
    course: cid || "",
    total_questions: 0,

    type: "Graded Quiz",
    questionList: [],
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
    required_to_view_result:false,
    view_responses: "Always"
  });

  useEffect(() => {
    if (qid) {
      const currentQuiz = quizzes.find(
        (a: Quiz) => a._id === qid
      );
      if (currentQuiz) {
        const updateCurrentQuiz = {...quiz, ...currentQuiz};
        dispatch(setEditingQuiz(updateCurrentQuiz));
      }
    }
    // eslint-disable-next-line
  }, [qid, dispatch, quizzes]);

  useEffect(() => {
    if (editingQuiz) {
      setQuiz(editingQuiz);
    }
    console.log("useEffect - EditingQuiz");
    console.log(quiz);
    // eslint-disable-next-line
  }, [editingQuiz]);

  const [newQuestion, setNewQuestion] = useState<Question>({
      _id: 0,
      type: "Multiple Choice",
      title: "",
      points: 0,
      question: "",
      answers: ["test1", "test2"],
      correct_answer: "",
      true_or_false: true,
      blanks: [],
    });

  //// questions init////
  const handleAddQuestion = () => {
    // add a new question
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questionList: [...prevQuiz.questionList, newQuestion],
    }));

    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      _id: newQuestion._id+1,
    }));
  };

  ///////////////////////////////////////////////////////////

  // detail and question change //
  const [activeButton, setActiveButton] = useState<number | null>(0);

  const handleButtonClick = (index:number) => {
    setActiveButton(index);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDocumentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      !target.classList.contains('btn') &&
      activeButton !== null
    ) {
      setActiveButton(null);
    }
  };
  //////////////////////////////////

  // values //
  const [quizType, setQuizType] = useState('Graded Quiz');
  const quizTypeOption = [
    { value: 'Graded Quiz', label: 'Graded Quiz' },
    { value: 'Practice Quiz', label: 'Practice Quiz' },
    { value: 'Graded Survey', label: 'Graded Survey' },
    { value: 'Ungraded Survey', label: 'Ungraded Survey' },
  ];

  const [assignmentGroup, setAssignmentGroup] = useState('Quizzes');
  const assignmentGroupOption = [
    { value: 'Quizzes', label: 'Quizzes' },
    { value: 'Exams', label: 'Exams' },
    { value: 'Assignments', label: 'Assignments' },
    { value: 'Project', label: 'Project' },
  ];

  const [showCorrectAnswer, setShowCorrectAnswer] = useState('Immediately');
  const showCorrectAnswerOption = [
    { value: 'Immediately', label: 'Immediately' },
    { value: 'Later', label: 'Later' },
  ];

  const [isShuffleAnswer, setIsShuffleAnswer] = useState(false);
  const handleShuffleAnswerChange = () => {
    setIsShuffleAnswer(!isShuffleAnswer);
    // updateQuizItem(/* 传入相应的参数 */);
  };

  const [isTimeLimit, setIsTimeLimit] = useState(false);
  const handleTimeLimitChange = () => {
    setIsTimeLimit(!isTimeLimit);
    // updateQuizItem(/* 传入相应的参数 */);
  };

  const [isMultipleAttempt, setIsMultipleAttempt] = useState(false);
  const handleMultipleAttemptChange = () => {
    setIsMultipleAttempt(!isMultipleAttempt);
    // updateQuizItem(/* 传入相应的参数 */);
  };

  const [isOneQuestion, setIsOneQuestion] = useState(true);
  const handleOneQuestionChange = () => {
    setIsOneQuestion(!isOneQuestion);
    // updateQuizItem(/* 传入相应的参数 */);
  };

  const [isWebcamRequired, setIsWebcamRequired] = useState(false);
  const handleWebcamRequiredChange = () => {
    setIsWebcamRequired(!isWebcamRequired);
    // updateQuizItem(/* 传入相应的参数 */);
  };

  const [isLockQuestion, setIsLockQuestion] = useState(false);
  const handleLockQuestionChange = () => {
    setIsLockQuestion(!isLockQuestion);
    // updateQuizItem(/* 传入相应的参数 */);
  };

  //////////////////////////////////////

  /// editor
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeInstrctions = (newDescription: string) => {
      setQuiz((prevQuiz) => ({
      ...prevQuiz,
      description: newDescription,
    }));
    };
  //////////////////////////////////////////

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (
    value: string
  ) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      description: value,
    }));
  };

  const handleQuestionTitleChange = (quiz: Quiz, q: Question, title: string) => {
    const updateQuestion = {...q};
    updateQuestion.title = title;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questionList:prevQuiz.questionList.map((question, idx) => question._id === q._id ? updateQuestion : question)
      }));
    console.log(quiz);
  }

  const handleSave = () => {
    if (qid) {
      dispatch(updateQuiz(quiz));
      dispatch(clearEditingQuiz());
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      const newId = new Date().getTime().toString();
      dispatch(addQuiz({ ...quiz, _id: newId }));
      dispatch(clearEditingQuiz());
      navigate(`/Kanbas/Courses/${cid}/Quizzes`, { replace: true });
    }
  };

  const handleCancel = () => {
    dispatch(clearEditingQuiz());
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quizzes-editor" className="container mt-4">
      <div className="header-row align-items-center">
        <div>
          <span> Points {quiz.points}&nbsp;</span>
        </div>

        <div className="ml-10">
          <MdDoNotDisturbAlt className="do-not-disturb-icon" />
          <span> Not Published &nbsp;</span>
        </div>
        <div className="three-dots-button" id="threeDotsButton-main">
            <IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      <hr />

        <div>
          <div>
            <button
              className={`btn show-content ${activeButton === 0 ? 'active' : ''}`}
              onClick={() => handleButtonClick(0)}>
              Details
            </button>
            <button
              className={`btn show-content ${activeButton === 1 ? 'active' : ''}`}
              onClick={() => handleButtonClick(1)}>
              Questions
            </button>
          </div>
          <hr />
          {activeButton === 0 && (

            <div className="detail-info">

              <div className="col-md-10">
                <input
                  id="wd-name"
                  name="title"
                  value={quiz.title}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <br />
              <span>&nbsp;&nbsp;Quiz Instrctions:</span>
              <div>
                <ReactQuill
                  value={quiz.description}
                  onChange={handleDescriptionChange}/>
              </div>
              <br />

              <div className="d-flex">
                <div className="modal-body-left-detail">

                  <span>Quiz Type</span> <br />
                  <span>Assignment Group</span> <br />
                  <span>Show Correct Answers</span> <br />
                  <br/><br/><br/><br/><br/><br/><br/><br/>
                  <span>Due</span> <br />
                  <span>Available from</span> <br />
                  <span>Until</span> <br />
                </div>

                <div className="modal-body-right-detail">
                    <div className="col-md-20">
                      <select value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                        {quizTypeOption.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div className="col-md-20">
                    <select value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
                      {assignmentGroupOption.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-20">
                    <select value={showCorrectAnswer} onChange={(e) => setShowCorrectAnswer(e.target.value)}>
                      {showCorrectAnswerOption.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="details-options">
                    <b>Options</b>
                  </div>

                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={isShuffleAnswer}
                      onChange={handleShuffleAnswerChange}
                    />
                    &nbsp;&nbsp;Shuffle Answers
                  </div>

                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={isTimeLimit}
                      onChange={handleTimeLimitChange}
                    />
                    &nbsp;&nbsp;Time Limit
                  </div>

                  { isTimeLimit && (
                      <div className="d-flex">
                        <input
                          type="number"
                          id="wd-time-limit"
                          name="time-limit"
                          value={quiz.time_limit}
                          onChange={handleChange}
                          className="form-control"
                          style={{ width: '80px' }}
                        />
                        &nbsp;&nbsp;&nbsp;Minutes
                      </div>
                    )
                  }

                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={isMultipleAttempt}
                      onChange={handleMultipleAttemptChange}
                    />
                    &nbsp;&nbsp;Allow Multiple Attempts
                  </div>

                  { isMultipleAttempt && (
                      <div className="d-flex">
                        <input
                          type="number"
                          id="wd-how-many-attempts"
                          name="how-many-attempts"
                          value={quiz.how_many_attempts}
                          onChange={handleChange}
                          className="form-control"
                          style={{ width: '80px' }}
                        />
                        &nbsp;&nbsp;&nbsp;Times
                      </div>
                    )
                  }

                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={isOneQuestion}
                      onChange={handleOneQuestionChange}
                    />
                    &nbsp;&nbsp;One Question at a Time
                  </div>

                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={isWebcamRequired}
                      onChange={handleWebcamRequiredChange}
                    />
                    &nbsp;&nbsp;Webcam Required
                  </div>

                  <div className="d-flex align-items-center mb-4">
                    <input
                      type="checkbox"
                      checked={isLockQuestion}
                      onChange={handleLockQuestionChange}
                    />
                    &nbsp;&nbsp;Lock Questions After Answering
                  </div>

                  <hr />

                  <div className="row mb-1">
                    <div className="col-md-12">
                      <input
                        type="date"
                        id="wd-due-date"
                        name="dueDate"
                        value={quiz.dueDate}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-1">
                    <div className="col-md-12">
                      <input
                        type="date"
                        id="wd-available-from"
                        name="availableFrom"
                        value={quiz.availableFrom}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <input
                        type="date"
                        id="wd-available-until"
                        name="availableUntil"
                        value={quiz.untilDate}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col text-">
                      <button onClick={handleCancel} className="btn btn-secondary me-2">
                        Cancel
                      </button>
                      <button onClick={handleSave} className="btn btn-danger me-2">
                        Save
                      </button>
                      <button onClick={handleSave} className="btn btn-danger">
                        Save and Publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {activeButton === 1 && (
            <div className="questions-editor">
              <div className="questions-list" style={{ display: 'flex', justifyContent: 'center' }}>
                <ul style={{ listStyleType: 'none' }}>
                  {quiz.questionList.map((question, index) => (
                    <li key={index} style={{ marginBottom: '15px', border: '2px solid #ccc', padding: '10px' }}>
                      <QuestionDisplay
                        quiz={quiz}
                        q={question}
                        onTitleChanged={handleQuestionTitleChange}/>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="add-question-button" style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleAddQuestion}>+ New Question</button>
              </div>
              <hr />

              <div className="row">
                <div className="col" style={{ display: 'flex', justifyContent: 'center' }}>
                  <button onClick={handleCancel} className="btn btn-secondary me-2">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn btn-danger me-2">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

interface QuestionDisplayProps {
  quiz: Quiz;
  q: Question;
  onTitleChanged: (quiz: Quiz, q: Question, title: string) => void;
}

function QuestionDisplay({quiz, q, onTitleChanged}: QuestionDisplayProps){

  const questionTypeOption = [
    { value: 'Multiple Choice', label: 'Multiple Choice' },
    { value: 'True/False', label: 'True/False' },
    { value: 'Fill In the Blank', label: 'Fill In the Blank' },
  ];

  return (
    <div>
      {q.type === 'Multiple Choice' &&
        (<div>
          <div className="question-header" style={{ marginBottom: '3px', display: 'flex', justifyContent: 'center', alignItems:"center" }}>
            <span> Title: </span>
            <input
              type="text"
              value={q.title}
              name="title"
              style={{ width: '100px', marginLeft: '5px', marginRight: "20px"}}
              onChange={(e) => onTitleChanged(quiz, q, e.target.value)}
            />
            <span> Type: </span>
            <select
              value={q.type}
              name="type"
              style={{ height: '30px', width: '200px', marginLeft: '5px', marginRight: "20px"}}
              // onChange={(e) => setQuizType(e.target.value)}
              >
              {questionTypeOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <span> Points: </span>
            <input
              type="number"
              value={q.points}
              name="points"
              style={{ width: '100px', marginLeft: '5px'}}
              //onChange={}
            />

          </div>
          <hr />
          <span> Enter your question and multiple answers, then select the one correct answer.</span> <br />
          <span><b> Question:</b></span> <br />
          <ReactQuill
            value={q.question}
            // onChange={}
            />
          <span><b> Answers:</b></span> <br />
          <ul style={{ listStyleType: 'none' }}>
            {q.answers.map((answer, idx) => (
              <li key={idx}>
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={q.correct_answer === answer}
                  // onChange={() => handleSelectCorrectAnswer(answer)}
                />
                <input
                  type="text"
                  value={answer}
                  style={{marginLeft : "5px"}}
                  // onChange={(e) => handleQuestionAnswerChange(q._id, idx, e.target.value)}
                />

              </li>
            ))}
          </ul>
          <div className="add-question-button" style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              // onClick={() => handleAddAnswerToQuestion(q)}
              style={{ backgroundColor: '#fff', border: 'none', color: "red" }}
            >
                + Add Another Answer
            </button>
          </div>


        </div>)}

      {q.type === 'True/False' && (<> </>)}

      {q.type === 'Fill In the Blank' && (<> </>)}

    </div>
  );
}
