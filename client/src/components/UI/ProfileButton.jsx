import { NavLink } from "react-router-dom";
import "/src/css/profile.css";

function ProfileButton({ title,active,To }) {
  console.log(active)
  return (
    <div className={`col text-center profilebutton ${active} ps-0 ps-1`}>
      <NavLink to={To} className={`text-decoration-none fs-5  w-100 text-light ${active}`}>{title}</NavLink>
    </div>
  );
}

export default ProfileButton;
