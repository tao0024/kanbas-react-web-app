import "bootstrap/dist/css/bootstrap.min.css";
import {ChangeEvent, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Select from "react-select";
import db from "../../Database";
import "./editor.css";

export default function AssignmentEditor() {
    const {aid, cid} = useParams<{ aid?: string; cid?: string }>();
    const [assignment, setAssignment] = useState(db.assignments.find((a) => a._id === aid));

    const [submissionType, setSubmissionType] = useState("ONLINE");

    const handleSubmissionTypeChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        setSubmissionType(event.target.value);
    };

    const tagOptions = [
        {value: "Everyone", label: "Everyone"},
    ];

    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="row mb-3">
                <label htmlFor="wd-name" className="col-form-label">
                    <h5>Assignment Name</h5>
                </label>
                <div className="col">
                    <input id="wd-name" value={assignment.title} className="form-control"/>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="wd-description" className="col-form-label">
                </label>
                <div className="col">
                    <textarea id="wd-description" className="form-control" value={assignment.description}/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-2 text-end">
                    <label htmlFor="wd-points" className="col-form-label">
                        Points
                    </label>
                </div>
                <div className="col-md-10">
                    <input id="wd-points" value={"100"} className="form-control"/>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-2 text-end">
                    <label htmlFor="wd-group" className="col-form-label">
                        Assignment Group
                    </label>
                </div>
                <div className="col-md-10">
                    <select id="wd-group" className="form-control">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-2 text-end">
                    <label htmlFor="wd-display-grade-as" className="col-form-label">
                        Display Grade as
                    </label>
                </div>
                <div className="col-md-10">
                    <select id="wd-display-grade-as" className="form-control">
                        <option value="Percentage">Percentage</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-2 text-end">
                    <label htmlFor="wd-submission-type" className="col-form-label">
                        Submission Type
                    </label>
                </div>
                <div className="col-md-10">
                    <select
                        id="wd-submission-type"
                        className="form-control"
                        onChange={handleSubmissionTypeChange}
                    >
                        <option value="ONLINE">ONLINE</option>
                        <option value="OFFLINE">OFFLINE</option>
                    </select>
                </div>
            </div>

            {submissionType === "ONLINE" && (
                <div className="row mb-3">
                    <div className="col-md-2 text-end"></div>
                    <div className="col-md-10">
                        <h6>
                            <b>Online Entry Options</b>
                        </h6>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wd-text-entry"
                                className="form-check-input"
                            />
                            <label htmlFor="wd-text-entry" className="form-check-label">
                                Text Entry
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wd-website-url"
                                className="form-check-input"
                            />
                            <label htmlFor="wd-website-url" className="form-check-label">
                                Website URL
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wd-media-recordings"
                                className="form-check-input"
                            />
                            <label htmlFor="wd-media-recordings" className="form-check-label">
                                Media Recordings
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wd-student-annotation"
                                className="form-check-input"
                            />
                            <label
                                htmlFor="wd-student-annotation"
                                className="form-check-label"
                            >
                                Student Annotation
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wd-file-uploads"
                                className="form-check-input"
                            />
                            <label htmlFor="wd-file-uploads" className="form-check-label">
                                File Uploads
                            </label>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mb-3">
                <div className="col-md-2 text-end">
                    <label htmlFor="wd-submission-type" className="col-form-label">
                        Assign
                    </label>
                </div>

                <div className="Assign123">
                    <div className="row mb-3">
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <label htmlFor="wd-assign-to" className="col-form-label">
                                <b>Assign to</b>
                            </label>
                        </div>
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <Select
                                options={tagOptions}
                                isMulti
                                className="form-control p-0"
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <label htmlFor="wd-due-date" className="col-form-label">
                                <b>Due</b>
                            </label>
                        </div>
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <input type="date" id="wd-due-date" className="form-control"/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <label htmlFor="wd-available-from" className="col-form-label">
                                <b>Available from</b>
                            </label>
                        </div>
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <input
                                type="date"
                                id="wd-available-from"
                                className="form-control"
                            />
                        </div>

                        <div className="row mb-3"></div>
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <label htmlFor="wd-available-until" className="col-form-label">
                                <b>Until</b>
                            </label>
                        </div>
                        <div className="col-md-2 text-end"></div>
                        <div className="col-md-10">
                            <input
                                type="date"
                                id="wd-available-until"
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-end">
                            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
                                Cancel
                            </Link>

                            <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn"
                                  style={{backgroundColor: "darkredRed", color: "white"}}>
                                Save
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
