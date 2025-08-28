import { useEffect } from "react";
import EditProfileForm from "../components/EditProfileForm";
import "../css/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, profileActions } from "../store/profile-slice";
import axios from "axios";

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (err) => rej(err);
    reader.readAsDataURL(file);
  });
}

function Profile() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profileData);
  const { token } = useSelector((state) => state.authData);
  useEffect(() => {
    dispatch(getProfileData(token));
  }, []);

  console.log(profile);
  let body = {};
  async function handleProfileImg(e) {
    const inpFile = Array.from(e.target.files);
    console.log(inpFile)
    body["profileImage"] = await fileToBase64(inpFile[0]);
    const response = await axios.patch(
      "http://localhost:3000/profile/update-profile-img",
      body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(profileActions.updateProfileImage(response.data.url))
  }

return (
    <div className="container min-vh-100 min-vw-50">
        <div className="row justify-content-center">
            <div className="col-2 position-relative">
                <img
                    src={profile.imgUrl ? `${profile.imgUrl}` : "/public/images/profile-picture.png"}
                    className="w-100 h-100 shadow-lg rounded-circle"
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
                <div
                    className="position-absolute d-inline-block"
                    style={{ bottom: -5, right: 20 }}
                >
                    <button className="btn">
                        <img src="/public/icons/plus.png" />
                        <input
                            type="file"
                            onInput={handleProfileImg}
                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                        />
                    </button>
                </div>
            </div>
        </div>
        <div className="row mt-3 justify-content-center">
            <div className="col-8">
                <EditProfileForm userProfile={profile} />
            </div>
        </div>
    </div>
);
}

export default Profile;
