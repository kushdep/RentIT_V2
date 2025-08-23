import AuthModal from "../components/Modals/AuthModal";
import { useRef, useEffect } from "react";

export default function LoginPage(){
    const loginModal = useRef()
    useEffect(() => {
        if (loginModal.current) {
            loginModal.current.showModal()
        }
    }, [])
    return <>
    <AuthModal reference={loginModal}/>    
    </>
}