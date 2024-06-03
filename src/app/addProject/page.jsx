"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import "../../styles/add.scss";

function addProject() {
  const router = useRouter();

  const [skills, setSkills] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectType: "",
    projectUrl: "",
    githubUrl: "",
    projectDescription1: "",
    projectDescription2: "",
    dateFinished: "",
    selectedSkills: [],
  });
  const [projectLogo, setProjectLogo] = useState(null); // New state for project logo
  const [projectMainImages, setProjectMainImages] = useState([]); // New state for project main images
  const [projectSecondaryImages, setProjectSecondaryImages] = useState([]); // Updated state for project gallery

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data || []);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching skills.");
      }
    };

    fetchSkills();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      selectedSkills: checked
        ? [...prevData.selectedSkills, id]
        : prevData.selectedSkills.filter((skill) => skill !== id),
    }));
  };

  const handleFileChange = (e) => {
    setProjectLogo(e.target.files[0]);
  };

  const handleMultipleFilesChange = (e, setImages) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("projectTitle", projectData.projectName);
    formData.append("projectType", projectData.projectType);
    formData.append("projectUrl", projectData.projectUrl);
    formData.append("githubUrl", projectData.githubUrl);
    formData.append("projectDescription1", projectData.projectDescription1);
    formData.append("projectDescription2", projectData.projectDescription2);
    formData.append("dateFinished", projectData.dateFinished);
    formData.append(
      "projectSkills",
      JSON.stringify(projectData.selectedSkills)
    );
    formData.append("projectLogo", projectLogo); // Append the project logo

    // Append multiple files for project main images
    projectMainImages.forEach((file) => {
      formData.append("projectMainImages", file);
    });

    // Append multiple files for project gallery
    projectSecondaryImages.forEach((file) => {
      formData.append("projectSecondaryImages", file);
    });

    try {
      const response = await axios.post("/api/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setErrorMessage(null);
      router.push("/projects");
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error adding project. Please try again.");
      }
    }
  };

  return (
    <main className="skill_container">
      <h1>add project</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="projectName"
          type="text"
          placeholder="project title"
          required
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="projectType"
          type="text"
          placeholder="project type"
          required
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="projectUrl"
          type="text"
          placeholder="project url"
          required
          onChange={handleInputChange}
        />
        <input
          className="input"
          name="githubUrl"
          type="text"
          placeholder="github url"
          required
          onChange={handleInputChange}
        />
        <textarea
          name="projectDescription1"
          placeholder="project description 1"
          required
          onChange={handleInputChange}
        />
        <textarea
          name="projectDescription2"
          placeholder="project description 2"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="date">Choose a date:</label>
        <input
          type="date"
          id="date"
          name="dateFinished"
          onChange={handleInputChange}
        />
        <label htmlFor="projectLogo">Project Logo</label>
        <input
          type="file"
          id="projectLogo"
          className="imageInput"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="projectMainImages">Project Main Images</label>
        <input
          type="file"
          id="projectMainImages"
          className="imageInput"
          multiple
          accept="image/*"
          onChange={(e) => handleMultipleFilesChange(e, setProjectMainImages)}
        />
        <label htmlFor="projectSecondaryImages">Project Gallery Images</label>
        <input
          type="file"
          id="projectSecondaryImages"
          className="imageInput"
          multiple
          accept="image/*"
          onChange={(e) =>
            handleMultipleFilesChange(e, setProjectSecondaryImages)
          }
        />
        <div className="project_skills">
          {skills && skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill._id} className="project_skill">
                <label htmlFor={skill.name}>{skill.name}</label>
                <input
                  type="checkbox"
                  id={skill._id}
                  name={skill.name}
                  onChange={handleCheckboxChange}
                />
              </div>
            ))
          ) : (
            <p>Loading skills...</p>
          )}
        </div>
        <button type="submit">submit</button>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </main>
  );
}

export default addProject;
