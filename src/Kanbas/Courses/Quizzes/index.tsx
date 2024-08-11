import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaRocket } from "react-icons/fa";
import { MdDoNotDisturbAlt } from "react-icons/md";

import { FaPencilAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';

import { IoEllipsisVertical} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./styles.css";
import {
  setEditingQuiz,
  deleteQuiz,
  clearEditingQuiz,
} from "./reducer";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  total_questions: number;

  type: string;
  questions: string[];
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

interface Question {}

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);
  const [quizDetails, showQuizDetail]  = useState<Quiz | null>(null);

  const handleDelete = () => {
    if (quizToDelete) {
      dispatch(deleteQuiz(quizToDelete._id));
      setQuizToDelete(null);
    }
  };

  return (
    <div id="wd-quizzes" className="container mt-4">
      <div
        id="wd-quizzes-controls"
        className="d-flex justify-content-between align-items-center mb-3"
      >
          <div className="position-relative">
            <input
              id="wd-search-quizzes"
              className="form-control"
              placeholder="Search for Quiz"
            />
          </div>

          <div id="wd-controls-right" className="d-flex justify-content-between align-items-center">
            <div>
              <button
                id="wd-add-quiz"
                className="btn btn-danger"
                onClick={() => {
                  dispatch(clearEditingQuiz());
                  navigate(`/Kanbas/Courses/${cid}/Quizzes/Editor`);
                }}
              >
                + Quiz
              </button>
            </div>
            <div className="three-dots-button" id="threeDotsButton-main">
                <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

        </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center wd-quiz-title-item">
        <h3 id="wd-quizzes-title" className="mb-0">
          Assignment Quizzes
        </h3>
      </div>

      <ul id="wd-quiz-list" className="list-unstyled">
        {quizzes
          .filter((quiz: Quiz) => quiz.course === cid)
          .map((quiz: Quiz) => (
            <li
              key={quiz._id}
              className="wd-quiz-list-item ps-3 d-flex justify-content-between align-items-center"
            >
            <div className="d-flex justify-content-between align-items-center">
              <FaRocket color="#82ca9d" size={16} />
              <div className="quiz-details">
                  <div className="first-line">
                    <Link
                      to={`/Kanbas/Courses/${cid}/Quizzes/Editor/${quiz._id}`}
                      className="wd-quiz-link text-decoration-none"
                      onClick={() => dispatch(setEditingQuiz(quiz))}
                    >
                      {quiz.title}
                    </Link>
                  </div>
                  <div className="second-line text-muted">
                    <span>
                      <b>Not available until</b> {quiz.availableFrom}
                    </span>{" "}
                    | <span>
                      <b>Due</b> {quiz.dueDate}
                    </span>{" "}
                    | <span>{quiz.points} pts</span>{" "}
                    | <span>{quiz.total_questions} Questions</span>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">

              <div
                  className="three-dots-button-item"
                  id="threeDotsButton"
                >
                <div className="item-actions">
                    <MdDoNotDisturbAlt className="do-not-disturb-icon" />
                </div>
              </div>

                <div
                  className="three-dots-button-item"
                  id="threeDotsButton"
                  data-bs-toggle="dropdown"
                >
                  <IoEllipsisVertical className="symbol-quiz fs-5" />
                </div>
                  <ul id="dropdown" className="dropdown-menu align-items-center" style={{ textAlign: 'center',  maxWidth: '120%'}}>

                    <li className="dropdown-option"
                    style={{ cursor: "pointer" }}
                    onClick={() => showQuizDetail(quiz)}><b>Edit</b></li>

                    <li className="dropdown-option"
                    style={{ cursor: "pointer" }}
                    onClick={() => setQuizToDelete(quiz)}><b>Delete</b></li>

                    <li>Publish</li>

                    <li>Copy</li>
                    <li>Sort</li>

                  </ul>

              </div>
            </li>
          ))}
      </ul>

      {quizToDelete && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h5 className="modal-title">Delete Quiz</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setQuizToDelete(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this quiz?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setQuizToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {quizDetails && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="d-flex modal-header justify-content-between">

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-light me-2"
                  >
                  <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                  >
                  <FaPencilAlt />
                  <span> Edit</span>
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-danger detail-close-btn"
                  onClick={() => showQuizDetail(null)}
                >
                  <span>Close</span>
                </button>

              </div>


              <div className="modal-body d-flex justify-content-between align-items-center">

                <h4><b>{quizDetails.title}</b></h4>
              </div>

              <div className="modal-body d-flex">
                <div className="modal-body-left">
                  <span>Quiz Type</span> <br />
                  <span>Points</span> <br />
                  <span>Assignment Group</span> <br />
                  <span>Shuffle Answers</span> <br />
                  <span>Time Limit</span> <br />
                  <span>Multiple Attempts</span> <br />
                  <span>View Responses</span> <br />
                  <span>Show Correct Answers</span> <br />
                  <span>One Question at a Time</span> <br />
                  <span>Require Respondus LockDown Browser</span> <br />
                  <span>Required to View Quiz Results</span> <br />
                  <span>Webcam Required</span> <br />
                  <span>Lock Questions After Answering</span>
                </div>

                <div className="modal-body-right">
                  <span>{quizDetails.type}</span> <br />
                  <span>{quizDetails.points}</span> <br />
                  <span>{quizDetails.assignment_group}</span> <br />
                  <span>{quizDetails.shuffle_answer}</span> <br />
                  <span>{quizDetails.time_limit}</span> <br />
                  <span>{quizDetails.multiple_attempts}</span> <br />
                  <span>Always{quizDetails.view_responses}</span> <br />
                  <span>{quizDetails.show_correct_answers}</span> <br />
                  <span>{quizDetails.one_question_at_a_time}</span> <br />
                  <span>{quizDetails.lockdown_browser}</span> <br />
                  <span>{quizDetails.required_to_view_result}</span> <br />
                  <span>{quizDetails.webcam_required}</span> <br />
                  <span>{quizDetails.lock_after_answering}</span> <br />
                </div>
              </div>

              <div className="modal-body container-modal">
                <div className="item"><b>Due</b></div>
                <div className="item"><b>For</b></div>
                <div className="item"><b>Available from</b></div>
                <div className="item"><b>Until</b></div>
              </div>
              <hr className="mid-line"/>
              <div className="modal-body container-modal">
                <div className="item">{"Sep 21 at 1pm"}</div>
                <div className="item">Everyone</div>
                <div className="item">{"Sep 21 at 1pm"}</div>
                <div className="item">{"Sep 21 at 1pm"}</div>
              </div>




            </div>
          </div>
        </div>
      )}

    </div>
  );
}
