import DashSideBar from "../../components/dashSideBar";
import ProjectsCard from "../../components/projects";
import Link from "next/link";

import "../../styles/dashMain.scss";

function allArticles() {
  return (
    <>
      <DashSideBar />
      <div className="dash_container">
        <div className="cards_container">
          <div className="head_container">
            <h1 className="titles">articles</h1>
            <Link className="add" href="/addArticle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#5552ff"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
              </svg>
              add new
            </Link>
          </div>

          <div className="projects">
            <ProjectsCard />
            <ProjectsCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default allArticles;
