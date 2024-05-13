//my styles
import Link from "next/link";
import "../../styles/add.scss";

function addSkill() {
  return (
    <main className="skill_container">
      <h1>add skill</h1>
      <form>
        <input
          className="input"
          name="skill_name"
          type="text"
          placeholder="skill"
          required
        />
        <textarea
          name="skill_description"
          placeholder="skill description"
          required
        />
        <input
          type="file"
          id="skillLogo"
          className="imageInput"
          accept="image/*"
        />

        <button type="submit">submit</button>
      </form>
    </main>
  );
}
export default addSkill;
