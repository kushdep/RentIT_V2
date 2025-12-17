import { useEffect, useRef, useState } from "react";
import { getSessionToken, getSuggestions, loadGoogleScript } from "../utils/googleAutoComp";

export function useGoogleAutoComp() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [inpVal, setInpVal] = useState({ val: "", index: null });
    const [sugg, setSugg] = useState([]);
    const sessionTokenRef = useRef(null);
    const timerRef = useRef(null);


    useEffect(() => {
        if (!window.google) {
            loadGoogleScript(setIsLoaded);
        } else {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (window.google) {
            
            async function sugg() {
                try {
                    if (!sessionTokenRef.current) {
                        const token = getSessionToken();
                        if (!token) {
                            console.error("Cannot get token");
                            return;
                        }
                        sessionTokenRef.current = token;
                    }
                    console.log("Google Api called")
                    const { suggestions } = await getSuggestions(
                        sessionTokenRef.current,
                        inpVal.val
                    );
                    setSugg(suggestions);
                } catch (error) {
                    console.error("Error while getting sugg()" + error);
                }
            }
            const debounceSearch = (func,delay)=>{
                clearTimeout(timerRef.current)
                timerRef.current = setTimeout(func,delay)
            }

            debounceSearch(sugg,3000);
        }
    }, [inpVal.val]);

    function handleInpVal(value){
        try {
            if (value.hasOwnProperty("val") && value.hasOwnProperty("index")) {
                setInpVal(value);
            } else {
                console.error("state value is incomplete");
            }
        } catch (error) {
            console.error("Error in handleInpVal "+error)
        }
    }

    return {
        inpVal,
        isLoaded,
        sugg,
        handleInpVal,
    }
}