import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  updateAssignment,
  clearEditingAssignment,
  setEditingAssignment,
} from "./reducer";
import "./editor.css";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
}

export default function AssignmentEditor() {
  const { aid, cid } = useParams<{ aid?: string; cid?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments, editingAssignment } = useSelector(
    (state: any) => state.assignmentsReducer
  );
  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid || "",
  });

  useEffect(() => {
    if (aid) {
      const currentAssignment = assignments.find(
        (a: Assignment) => a._id === aid
      );
      if (currentAssignment) {
        dispatch(setEditingAssignment(currentAssignment));
      }
    }
  }, [aid, dispatch, assignments]);

  useEffect(() => {
    if (editingAssignment) {
      setAssignment(editingAssignment);
    }
  }, [editingAssignment]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (aid) {
      dispatch(updateAssignment(assignment));
      dispatch(clearEditingAssignment());
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } else {
      const newId = new Date().getTime().toString();
      dispatch(addAssignment({ ...assignment, _id: newId }));
      dispatch(clearEditingAssignment());
      navigate(`/Kanbas/Courses/${cid}/Assignments`, { replace: true });
    }
  };

  const handleCancel = () => {
    dispatch(clearEditingAssignment());
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="row mb-3">
        <label htmlFor="wd-name" className="col-form-label">
          <h5>Assignment Name</h5>
        </label>
        <div className="col">
          <input
            id="wd-name"
            name="title"
            value={assignment.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-description" className="col-form-label"></label>
        <div className="col">
          <textarea
            id="wd-description"
            name="description"
            value={assignment.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 text-end">
          <label htmlFor="wd-points" className="col-form-label">
            Points
          </label>
        </div>
        <div className="col-md-10">
          <input
            id="wd-points"
            name="points"
            value={assignment.points}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 text-end">
          <label htmlFor="wd-due-date" className="col-form-label">
            <b>Due</b>
          </label>
        </div>
        <div className="col-md-10">
          <input
            type="date"
            id="wd-due-date"
            name="dueDate"
            value={assignment.dueDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 text-end">
          <label htmlFor="wd-available-from" className="col-form-label">
            <b>Available from</b>
          </label>
        </div>
        <div className="col-md-10">
          <input
            type="date"
            id="wd-available-from"
            name="availableFrom"
            value={assignment.availableFrom}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 text-end">
          <label htmlFor="wd-available-until" className="col-form-label">
            <b>Until</b>
          </label>
        </div>
        <div className="col-md-10">
          <input
            type="date"
            id="wd-available-until"
            name="availableUntil"
            value={assignment.availableUntil}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="row">
        <div className="col text-end">
          <button onClick={handleCancel} className="btn btn-secondary me-2">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-danger">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
