import {FaBook, FaCheckCircle, FaPlus, FaSearch} from "react-icons/fa";
import {IoEllipsisVertical} from "react-icons/io5";
import {useParams} from "react-router-dom";
import assignmentsData from "../../Database/assignments.json";
import "./styles.css";

export default function Assignments() {
    const {cid} = useParams<{ cid: string }>();
    const redTextStyle = {color: "#dc3545"};

    const assignments = assignmentsData.filter((assignment) => assignment.course === cid);

    return (
        <div id="wd-assignments" className="container mt-4">
            <div
                id="wd-assignments-controls"
                className="d-flex justify-content-between align-items-center mb-3"
            >
                <div className="position-relative">
                    <input
                        id="wd-search-assignment"
                        className="form-control"
                        placeholder="Search..."
                    />
                    <FaSearch className="search-icon position-absolute"/>
                </div>
                <div>
                    <button
                        id="wd-add-assignment-group"
                        className="btn btn-secondary me-2"
                    >
                        <FaPlus/> Group
                    </button>
                    <button id="wd-add-assignment" className="btn btn-danger">
                        <FaPlus/> Assignment
                    </button>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3 wd-assignments-title-item">
                <h3 id="wd-assignments-title" className="mb-0">
                    ASSIGNMENTS
                </h3>
                <div className="circle-container">
                    <span className="badge bg-light text-dark">40% of Total</span>
                    <button className="btn btn-light">+</button>
                    <div className="float-end">
                        <IoEllipsisVertical className="fs-4"/>
                    </div>
                </div>
            </div>
            <ul id="wd-assignment-list" className="list-unstyled">
                {assignments.map((assignment) => (
                    <li
                        key={assignment._id}
                        className="wd-assignment-list-item border-start border-success border-3 ps-3 mb-3 d-flex align-items-start"
                    >
                        <FaBook className="book-icon"/>
                        <div className="assignment-details">
                            <div className="first-line">
                                <a
                                    className="wd-assignment-link text-decoration-none"
                                    href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                                >
                                    {assignment.title}
                                </a>
                            </div>
                            <div className="second-line text-muted">
                                <span style={redTextStyle}>Multiple Modules</span> |{" "}
                                <span>
                  <b>Not available until</b> May 6 at 12:00am |
                </span>
                            </div>
                            <div className="third-line text-muted">
                <span>
                  <b>Due</b> May 13 at 11:59pm
                </span>{" "}
                                | <span>100pts</span>
                            </div>
                        </div>
                        <FaCheckCircle className="text-success fs-5 ms-auto"/>
                        <IoEllipsisVertical className="fs-4"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}
