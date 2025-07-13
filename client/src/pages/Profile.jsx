import { Outlet } from "react-router-dom"
import AddLocForm from "../components/AddLocForm"

function Profile(){ 
    return <>
        <Outlet>
            <AddLocForm/>
        </Outlet>
    </>
}

export default Profile
