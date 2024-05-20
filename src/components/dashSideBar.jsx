import ProfileSideBar from "./profileSideBar";
import LinksSideBar from "./linksSideBar";

import "../styles/sidebar.scss";

import data from "../data/data.json";
const dashSideBar = async () => {
  return (
    <aside>
      <div className="logo">
        <img src={data["zayd-data"].about.logo} alt="" />
        <LinksSideBar />
      </div>

      <ProfileSideBar />
    </aside>
  );
};

export default dashSideBar;
