import { useEffect } from "react";
import EditProfileForm from "../components/EditProfileForm";
import "../css/profile.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, profileActions } from "../store/profile-slice";

function Profile(){
    const dispatch = useDispatch()
    const {profile} = useSelector(state=>state.profileData)
    useEffect(()=>{
        const token = localStorage.getItem("token")
         dispatch(getProfileData(token))    
    },[])

    console.log(profile)

    return <div className="container min-vh-100 min-vw-50">
        <div className="row justify-content-center">
            <div className="col-2 position-relative">
                <img
                src="/public/images/profile-picture.png"
                className="w-100 h-100 dp shadow"
                />
                <button className="btn btn-primary position-absolute rounded-circle h-25 w-25 shadow" style={{bottom:0,right:8}}>
                <img src="/public/icons/add.png" alt="" className="w-100 h-75"/>
                </button>
            </div>
        </div>
        <div className="row mt-3 justify-content-center">
            <div className="col-8">
                <EditProfileForm userProfile={profile}/>
            </div>
        </div>
    </div>
}

export default Profile