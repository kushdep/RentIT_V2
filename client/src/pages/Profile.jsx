import { Outlet } from "react-router-dom"
import AddLocForm from "../components/AddLocForm"

function Profile(){ 
    return <>
        <h1>Profile</h1>
        <Outlet>
            <AddLocForm/>
        </Outlet>
    </>
}

export default Profile
