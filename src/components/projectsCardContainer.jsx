"use client";
import ProjectsCard from "../components/projects";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios

// Component to render the projects card container
export default function ProjectsCardContainer({ limit }) {
  const [projects, setProjects] = useState([]); // State to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/projects", {
          cache: "no-store", // Ensures fresh data on each request
        });

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        let projectsData = res.data;
        // Apply limit if provided
        if (limit) {
          projectsData = projectsData.slice(0, limit);
        }

        // Format the dates
        const formattedProjects = projectsData.map((project) => ({
          ...project,
          createdAt: formatDate(project.createdAt),
        }));

        setProjects(formattedProjects); // Update state with formatted data
      } catch (error) {
        console.error("Error fetching Projects data:", error);
        // Optionally, set an error state here
      }
    };

    fetchData();
  }, [limit]); // Fetch data whenever the limit changes

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  // Delete project
  const handleDelete = async (_id) => {
    console.log("Deleting project with _id:", _id);

    try {
      const res = await axios.delete(`/api/projects/${_id}`);

      if (res.status !== 200) {
        throw new Error("Failed to delete project");
      }

      console.log("project deleted successfully!");
      //window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
      // Display a user-friendly error message
      alert("Error deleting project. Please try again."); // Example alert
    }
  };

  return (
    <div className="projects">
      {projects.map((project) => (
        <ProjectsCard
          key={project._id}
          id={project._id}
          title={project.projectTitle}
          date={formatDate(project.dateFinished)} // Use formatted date from state
          description={project.projectDescription1}
          imageUrl={project.projectLogo}
          onDelete={() => handleDelete(project._id)} // Pass the delete handler
        />
      ))}
    </div>
  );
}
