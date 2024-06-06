"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

import "../../../styles/add.scss";

function EditProject() {
  const router = useRouter();
  const { id: projectId } = useParams();
  const [skills, setSkills] = useState([]);
  const [projectData, setProjectData] = useState({
    projectTitle: "",
    projectType: "",
    projectUrl: "",
    githubUrl: "",
    projectDescription1: "",
    projectDescription2: "",
    dateFinished: "",
    selectedSkills: [],
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [projectLogo, setProjectLogo] = useState(null);
  const [projectLogoUrl, setProjectLogoUrl] = useState(""); // State for project logo URL
  const [projectMainImages, setProjectMainImages] = useState([]);
  const [projectMainImagesUrls, setProjectMainImagesUrls] = useState([]); // State for project main images URLs
  const [projectSecondaryImages, setProjectSecondaryImages] = useState([]);
  const [projectSecondaryImagesUrls, setProjectSecondaryImagesUrls] = useState(
    []
  ); // State for project gallery images URLs

  // Fetch all skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("/api/skills");
        setSkills(response.data || []);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching skills.");
      }
    };

    fetchSkills();
  }, []);

  // Fetch project data for editing
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`);
        const project = response.data.project;

        setProjectData({
          projectTitle: project.projectTitle,
          projectType: project.projectType,
          projectUrl: project.projectUrl,
          githubUrl: project.githubUrl,
          projectDescription1: project.projectDescription1,
          projectDescription2: project.projectDescription2,
          dateFinished: project.dateFinished,
          selectedSkills: project.projectSkills.map((skill) =>
            skill.toString()
          ), // Convert ObjectIds to strings
        });

        // Set the images URLs
        setProjectLogoUrl(project.projectLogo);
        setProjectMainImagesUrls(project.projectMainImages);
        setProjectSecondaryImagesUrls(project.projectSecondaryImages);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error fetching project data.");
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    console.log("Checkbox ID:", id);
    console.log("Checkbox Checked:", checked);

    setProjectData((prevData) => ({
      ...prevData,
      selectedSkills: checked
        ? [...prevData.selectedSkills, id]
        : prevData.selectedSkills.filter((skillId) => skillId !== id),
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
    formData.append("projectTitle", projectData.projectTitle);
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
    if (projectLogo) {
      formData.append("projectLogo", projectLogo);
    }

    // Append multiple files for project main images
    projectMainImages.forEach((file) => {
      formData.append("projectMainImages", file);
    });

    // Append multiple files for project gallery
    projectSecondaryImages.forEach((file) => {
      formData.append("projectSecondaryImages", file);
    });

    try {
      const response = await axios.put(`/api/projects/${projectId}`, formData, {
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
        setErrorMessage("Error updating project. Please try again.");
      }
    }
  };
  return (
    <main className="skill_container">
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="projectTitle"
          type="text"
          placeholder="Project Title"
          required
          onChange={handleInputChange}
          value={projectData.projectTitle}
        />
        <input
          className="input"
          name="projectType"
          type="text"
          placeholder="Project Type"
          required
          onChange={handleInputChange}
          value={projectData.projectType}
        />
        <input
          className="input"
          name="projectUrl"
          type="text"
          placeholder="Project URL"
          required
          onChange={handleInputChange}
          value={projectData.projectUrl}
        />
        <input
          className="input"
          name="githubUrl"
          type="text"
          placeholder="GitHub URL"
          required
          onChange={handleInputChange}
          value={projectData.githubUrl}
        />
        <textarea
          name="projectDescription1"
          placeholder="Project Description 1"
          required
          onChange={handleInputChange}
          value={projectData.projectDescription1}
        />
        <textarea
          name="projectDescription2"
          placeholder="Project Description 2"
          required
          onChange={handleInputChange}
          value={projectData.projectDescription2}
        />
        <label htmlFor="date">Choose a date:</label>
        <input
          type="date"
          id="date"
          name="dateFinished"
          onChange={handleInputChange}
          value={projectData.dateFinished}
        />
        <label htmlFor="projectLogo">Project Logo</label>
        {projectLogoUrl && (
          <div className="image-preview">
            <img src={projectLogoUrl} alt="Project Logo" />
          </div>
        )}
        <input
          type="file"
          id="projectLogo"
          className="imageInput"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="projectMainImages">Project Main Images</label>
        <div className="image-preview">
          {projectMainImagesUrls.map((url, index) => (
            <img src={url} alt={`Project Main ${index + 1}`} />
          ))}
        </div>
        <input
          type="file"
          id="projectMainImages"
          className="imageInput"
          multiple
          accept="image/*"
          onChange={(e) => handleMultipleFilesChange(e, setProjectMainImages)}
        />
        <label htmlFor="projectSecondaryImages">Project Gallery Images</label>
        <div className="image-preview">
          {projectSecondaryImagesUrls.map((url, index) => (
            <img src={url} alt={`Project Gallery ${index + 1}`} />
          ))}
        </div>
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
                  checked={projectData.selectedSkills.includes(skill._id)}
                />
              </div>
            ))
          ) : (
            <p>Loading skills...</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </main>
  );
}

export default EditProject;
