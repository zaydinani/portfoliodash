"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import "../../../styles/add.scss";

function EditSkill() {
  const { id } = useParams();
  const router = useRouter();

  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [skillImage, setSkillImage] = useState(null); // Store the image URL
  const [newImage, setNewImage] = useState(null); // Store the new image file
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`/api/skills/${id}`);
        const skill = response.data.skill;

        setSkillName(skill.name);
        setSkillDescription(skill.description);
        setSkillImage(skill.imageUrl); // Set the current image URL
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching skill data.");
      }
    };

    fetchSkill();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", skillName);
    formData.append("description", skillDescription);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      await axios.put(`/api/skills/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/skills"); // Redirect after successful update
    } catch (error) {
      console.error(error);
      setErrorMessage("Error updating skill.");
    }
  };

  return (
    <main className="skill_container">
      <h1>Edit Skill</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="skill_name"
          type="text"
          placeholder="Skill"
          required
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <textarea
          name="skill_description"
          placeholder="Skill Description"
          value={skillDescription}
          onChange={(e) => setSkillDescription(e.target.value)}
        />
        {skillImage && (
          <div className="current-image">
            <p>Current Image:</p>
            <img src={skillImage} alt="Skill" width={100} />
          </div>
        )}
        <input
          type="file"
          id="skillLogo"
          name="skillLogo"
          className="imageInput"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && (
        <div className="alert alert-3-danger">
          <h3 className="alert-title">Error</h3>
          <p className="alert-content">{errorMessage}</p>
        </div>
      )}
    </main>
  );
}

export default EditSkill;
