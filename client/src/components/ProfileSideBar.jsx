import ProfileButton from "../components/UI/ProfileButton";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfileSideBar() {
  const { userType } = useSelector((state) => state.profileData);
  const location = useLocation();
  const currentUrl = location.pathname;
  return (
    <div className="col-2 sidBar">
      <div className="container-fluid p-0">
        <div className="row row-cols-1 gy-4">
          <div className="col" style={{ height: 50 }}></div>
          <ProfileButton
            To="/profile/edit"
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
          {!userType.pptr && (
            <Link to='/profile/propertier-verification' className="btn rounded-0 btn-primary text-light fw-semibold" >
              Rent your Location 🏠
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSideBar;
