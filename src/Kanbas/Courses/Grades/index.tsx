import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDownload, FaUpload, FaFilter, FaCog } from "react-icons/fa";
import Select from "react-select";
import "./grades.css"; // Custom CSS file for additional styling

const studentOptions = [
  { value: "student1", label: "Student 1" },
  { value: "student2", label: "Student 2" },
];

const assignmentOptions = [
  { value: "assignment1", label: "Assignment 1" },
  { value: "assignment2", label: "Assignment 2" },
];

const tableData = [
  { student: "John Doe", a1: "90%", a2: "85%", a3: "88%", a4: "92%" },
  { student: "Jane Smith", a1: "80%", a2: "78%", a3: "85%", a4: "88%" },
];

const Grades = () => {
  return (
    <div className="All">
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-12 text-end">
            <button className="btn btn-light text-dark me-2">
              <FaUpload /> Import
            </button>
            <button className="btn btn-light text-dark me-2">
              <FaDownload /> Export
            </button>
            <button className="btn btn-light text-dark">
              <FaCog />
            </button>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="student-names" className="form-label">
              Student Names
            </label>
            <Select
              id="student-names"
              options={studentOptions}
              isMulti
              className="form-control"
              placeholder="Select Student Names"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="assignment-names" className="form-label">
              Assignment Names
            </label>
            <Select
              id="assignment-names"
              options={assignmentOptions}
              isMulti
              className="form-control"
              placeholder="Select Assignment Names"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col text-start">
            <button className="btn btn-light text-dark">
              <FaFilter /> Apply Filter
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>
                  <b>Student Name</b>
                </th>
                <th style={{ width: "17.5%" }}>A1 SETUP</th>
                <th style={{ width: "17.5%" }}>A2 HTML</th>
                <th style={{ width: "17.5%" }}>A3 CSS</th>
                <th style={{ width: "17.5%" }}>A4 BOOTSTRAP</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "table-light" : "table-secondary"
                  }
                >
                  <td className="text-danger">{row.student}</td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control transparent-input"
                      defaultValue={row.a1}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control transparent-input"
                      defaultValue={row.a2}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control transparent-input"
                      defaultValue={row.a3}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="text"
                      className="form-control transparent-input"
                      defaultValue={row.a4}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;
