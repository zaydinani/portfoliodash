import DashSideBar from "../../components/dashSideBar";
import ProjectsCard from "../../components/projects";
import SkillCard from "../../components/skillCard";
import Link from "next/link";
import "../../styles/dashMain.scss";

function dashMain() {
  return (
    <>
      <DashSideBar />
      <div className="dash_container">
        <div className="cards_container">
          <div className="head_container">
            <h1 className="titles">articles</h1>
          </div>
          <div className="projects">
            <ProjectsCard />
            <ProjectsCard />
          </div>
          <div className="more">
            <Link href="/articles">see all</Link>
          </div>
        </div>
        <div className="cards_container">
          <div className="head_container">
            <h1 className="titles">projects</h1>
          </div>
          <div className="projects">
            <ProjectsCard />
            <ProjectsCard />
          </div>
          <div className="more">
            <Link href="/projects">see all</Link>
          </div>
        </div>
        <div className="cards_container">
          <div className="head_container">
            <h1 className="titles">skills</h1>
          </div>
          <div className="projects">
            <SkillCard />
            <SkillCard />
          </div>
          <div className="more">
            <Link href="/skills">see all</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default dashMain;
