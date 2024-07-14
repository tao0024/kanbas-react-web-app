import Modules from "../Modules";
import CourseStatus from "./Status";
import "./styles.css";
export default function Home() {
  return (
    <table id="wd-home">
      <tr>
        <td valign="top" className="move-left">
          <Modules />
        </td>
        <td valign="top">
          <CourseStatus />
        </td>
      </tr>
    </table>
  );
}
