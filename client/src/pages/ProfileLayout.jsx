import { Outlet, useParams } from "react-router-dom";
import "../css/profile.css";
import ProfileSideBar from "../components/ProfileSideBar";

function ProfileLayout() {
 

  return (
    <>
      <div className="container-fluid min-vh-100">
        <div className="row d-flex d-flex">
          <ProfileSideBar/>
          <div className="col-10">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileLayout;
