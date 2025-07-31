import { Outlet } from "react-router-dom";
import "../css/profile.css";
import ProfileButton from "../components/UI/ProfileButton";

function Profile() {
  return (
    <>
      <div className="container-fluid" style={{ height: 1000 }}>
        <div className="row d-flex d-flex">
          <div className="col-2 sidBar" style={{ height: 1000 }}>
            <div className="container-fluid p-0">
              <div className="row row-cols-1 gy-4">
                <div className="col" style={{ height: 50 }}></div>
                <ProfileButton active='active' To='/profile' title="Profile" />
                <ProfileButton title="Approvals" />
                <ProfileButton title="Trips" />
                <button className="btn-primary text-light fw-semibold">
                  Rent your Location
                </button>
              </div>
            </div>
          </div>
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

export default Profile;
