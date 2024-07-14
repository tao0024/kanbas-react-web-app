import { useLocation } from "react-router-dom";
import "./index.css";

export default function CoursesNavigation() {
  const location = useLocation(); // Hook to get the current route

  // Function to determine if the link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      <a
        id="wd-course-home-link"
        href="#/Kanbas/Courses/1234/Home"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Home") ? "active" : ""} border border-0`}
      >
        Home
      </a>
      <a
        id="wd-course-modules-link"
        href="#/Kanbas/Courses/1234/Modules"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Modules") ? "active" : ""} border border-0`}
      >
        Modules
      </a>
      <a
        id="wd-course-piazza-link"
        href="#/Kanbas/Courses/1234/Piazza"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Piazza") ? "active" : ""} border border-0`}
      >
        Piazza
      </a>
      <a
        id="wd-course-zoom-link"
        href="#/Kanbas/Courses/1234/Zoom"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Zoom") ? "active" : ""} border border-0`}
      >
        Zoom
      </a>
      <a
        id="wd-course-quizzes-link"
        href="#/Kanbas/Courses/1234/Assignments"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Assignments") ? "active" : ""} border border-0`}
      >
        Assignments
      </a>
      <a
        id="wd-course-assignments-link"
        href="#/Kanbas/Courses/1234/Quizzes"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Quizzes") ? "active" : ""} border border-0`}
      >
        Quizzes
      </a>
      <a
        id="wd-course-grades-link"
        href="#/Kanbas/Courses/1234/Grades"
        className={`list-group-item ${isActive("/Kanbas/Courses/1234/Grades") ? "active" : ""} border border-0`}
      >
        Grades
      </a>
    </div>
  );
}
