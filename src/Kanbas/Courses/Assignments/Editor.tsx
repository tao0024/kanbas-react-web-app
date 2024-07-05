export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        {" "}
        <h4>Assignment Name </h4>
      </label>

      <input id="wd-name" value="A1-ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">ONLINE</option>
            </select>
            <br />
            <br />
            <label htmlFor="wd-text-entry">Online Entry Options</label> <br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label> <br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Website URL</label> <br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Media Recordings</label> <br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Student Annotation</label> <br />
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">File Uploads</label> <br />
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign </label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label> <br />
            <input id="wd-assign-to" value={100} /> <br />
            <br />
            <label htmlFor="wd-due-date">Due</label> <br />
            <input type="date" id="wd-due-date" value={100} /> <br />
            <br />
            <td>
              <label htmlFor="wd-available-from">Avaliable from</label> <br />
              <input type="date" id="wd-available-from" /> <br />
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label> <br />
              <input type="date" id="wd-available-until" />
            </td>
          </td>
        </tr>
        <tr>
          <td align="right">
            <hr />
            <button> Cancel </button>
            <button> Save </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
