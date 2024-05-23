"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import "../../styles/add.scss";

function AddSkill() {
  const router = useRouter();

  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", skillName);
    formData.append("description", skillDescription);

    if (selectedImage) {
      console.log("Selected image:", selectedImage); // Log the selected image
      formData.append("skillLogo", selectedImage);
    }

    try {
      const response = await axios.post("/api/skills", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper content type for FormData
        },
      });

      console.log(response.data);
      setSkillName("");
      setSkillDescription("");
      setSelectedImage(null);
      setErrorMessage(null); // Clear any previous errors
      router.push("/skills");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error adding skill. Please try again.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file); // Log the selected file
    setSelectedImage(file);
  };

  return (
    <main className="skill_container">
      <h1>Add Skill</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="skill_name"
          type="text"
          placeholder="Skill"
          required
          value={skillName}
          onChange={(event) => setSkillName(event.target.value)}
        />
        <textarea
          name="skill_description"
          placeholder="Skill Description"
          value={skillDescription}
          onChange={(event) => setSkillDescription(event.target.value)}
        />
        <input
          type="file"
          id="skillLogo"
          name="skillLogo" // Add name attribute
          className="imageInput"
          accept="image/*"
          onChange={handleImageChange} // Bind the function to the onChange event
        />
        <button type="submit">Submit</button>
      </form>
      {/* Display errors */}
      {errorMessage && (
        <div class="alert alert-3-danger">
          <h3 class="alert-title">error</h3>
          <p class="alert-content">{errorMessage}</p>
        </div>
      )}
    </main>
  );
}

export default AddSkill;
