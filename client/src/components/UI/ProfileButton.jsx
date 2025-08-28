import { NavLink } from "react-router-dom";
import "/src/css/profile.css";

function ProfileButton({ title, active, To }) {
  return (
    <div
      className={
        active
          ? `col text-center profilebutton ps-0 ps-1 bg-secondary`
          : "col text-center profilebutton ps-0 ps-1"
      }
    >
      <NavLink to={To} className="text-decoration-none fs-5  w-100 text-light">
        {title}
      </NavLink>
    </div>
  );
}

export default ProfileButton;
