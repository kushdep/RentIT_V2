import { Outlet } from "react-router-dom";
import "../css/profile.css";
import ProfileButton from "../components/UI/ProfileButton";

function ProfileLayout() {

  return (
    <>
      <div className="container-fluid min-vh-100" >
        <div className="row d-flex d-flex">
          <div className="col-2 sidBar">
            <div className="container-fluid p-0">
              <div className="row row-cols-1 gy-4">
                <div className="col" style={{ height: 50 }}></div>
                <ProfileButton  To='edit' title="Profile" />
                <ProfileButton title="Whishlist" To='/profile/whishlist'/>
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

export default ProfileLayout;
