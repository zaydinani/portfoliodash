//my styles
import Link from "next/link";
import "../../styles/add.scss";

function addProject() {
  return (
    <main className="skill_container">
      <h1>add project</h1>
      <form>
        <input
          className="input"
          name="project_name"
          type="text"
          placeholder="project title"
          required
        />
        <input
          className="input"
          name="project_title"
          type="text"
          placeholder="project type"
          required
        />
        <input
          className="input"
          name="project_url"
          type="text"
          placeholder="project url"
          required
        />
        <input
          className="input"
          name="github_url"
          type="text"
          placeholder="github url"
          required
        />
        <textarea
          name="project_description_1"
          placeholder="project description 1"
          required
        />
        <textarea
          name="project_description_2s"
          placeholder="project description 2"
          required
        />
        <label for="date">Choose a date:</label>
        <input type="date" id="date" />
        <label for="projectLogo">project logo</label>
        <input
          type="file"
          id="projectLogo"
          className="imageInput"
          accept="image/*"
        />
        <label for="projectMainImages">project main images</label>
        <input
          type="file"
          id="projectMainImages"
          className="imageInput"
          multiple
        />
        <label for="project_gallery">project gallery images</label>
        <input
          type="file"
          id="project_gallery"
          className="imageInput"
          multiple
        />
        <label for="project_gallery">project skills</label>
        <div className="project_skills">
          <div className="project_skill">
            <label for="react">react</label>
            <input type="checkbox" id="react" name="react" />
          </div>
          <div className="project_skill">
            <label for="node">node</label>
            <input type="checkbox" id="node" name="node" />
          </div>
          <div className="project_skill">
            <label for="wordpress">wordpress</label>
            <input type="checkbox" id="wordpress" name="wordpress" />
          </div>
          <div className="project_skill">
            <label for="css">css</label>
            <input type="checkbox" id="css" name="css" />
          </div>
          <div className="project_skill">
            <label for="nextjs">nextjs</label>
            <input type="checkbox" id="nextjs" name="nextjs" />
          </div>
        </div>

        <button type="submit">submit</button>
      </form>
    </main>
  );
}
export default addProject;
