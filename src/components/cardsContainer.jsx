"use client";
import SkillCard from "../components/skillCard";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "../styles/dashMain.scss";

// Component to render the cards container
export default function CardsContainer({ limit }) {
  const [skills, setSkills] = useState([]); // State to store fetched data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/skills", {
          cache: "no-store", // Ensures fresh data on each request
        });

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        let skillsData = res.data;
        // Apply limit if provided
        if (limit) {
          skillsData = skillsData.slice(0, limit);
        }

        // Format the dates
        const formattedSkills = skillsData.map((skill) => ({
          ...skill,
          createdAt: formatDate(skill.createdAt),
        }));

        setSkills(formattedSkills); // Update state with formatted data
      } catch (error) {
        console.error("Error fetching skills data:", error);
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

  // Delete skill
  const handleDelete = async (_id) => {
    console.log("Deleting skill with _id:", _id);

    try {
      const res = await axios.delete(`/api/skills/${_id}`);

      if (res.status !== 200) {
        throw new Error("Failed to delete skill");
      }

      // Update state on successful deletion (optional)
      const updatedSkills = skills.filter((skill) => skill._id !== _id);
      setSkills(updatedSkills);

      console.log("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error);
      // Display a user-friendly error message
      alert("Error deleting skill. Please try again."); // Example alert
    }
  };

  return (
    <div className="projects">
      {skills.map((skill) => (
        <SkillCard
          key={skill._id}
          id={skill._id}
          title={skill.name}
          date={skill.createdAt}
          description={skill.description}
          imageUrl={skill.imageUrl}
          onDelete={() => handleDelete(skill._id)} // Pass the delete handler
        />
      ))}
    </div>
  );
}
