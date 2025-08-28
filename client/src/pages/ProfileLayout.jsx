import { Outlet, useParams } from "react-router-dom";
import "../css/profile.css";
import ProfileButton from "../components/UI/ProfileButton";
import { useLocation } from "react-router-dom";

function ProfileLayout() {
  const location = useLocation();
  const currentUrl = location.pathname;

  console.log(currentUrl);
  return (
    <>
      <div className="container-fluid min-vh-100">
        <div className="row d-flex d-flex">
          <div className="col-2 sidBar">
            <div className="container-fluid p-0">
              <div className="row row-cols-1 gy-4">
                <div className="col" style={{ height: 50 }}></div>
                <ProfileButton
                  To="edit"
                  title="Profile"
                  active={currentUrl.includes("/profile/edit")}
                />
                <ProfileButton
                  To="/profile/whishlist"
                  title="Whishlist"
                  active={currentUrl.includes("/profile/whishlist")}
                />
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
