import CoursesNavigation from "./Navigation";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import {FaAlignJustify} from "react-icons/fa6";
import db from "../Database";

export default function Courses() {
    const {cid} = useParams();
    const course = db.courses.find((course) => course._id === cid);
    const {pathname} = useLocation();
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr/>

            <CoursesNavigation/>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Home"/>}/>
                    <Route path="Home" element={<Home/>}/>
                    <Route path="Modules" element={<Modules/>}/>
                    <Route path="Assignments" element={<Assignments/>}/>
                    <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
                    <Route path="Grades" element={<Grades/>}/>
                </Routes>
            </div>
        </div>
    );
}