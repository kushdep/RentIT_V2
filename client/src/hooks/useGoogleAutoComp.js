import { useEffect, useRef, useState } from "react";
import { getSessionToken, getSuggestions, loadGoogleScript } from "../utils/googleAutoComp";

export function useGoogleAutoComp() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [inpVal, setInpVal] = useState({ val: "", index: null });
    const [sugg, setSugg] = useState([]);
    const sessionTokenRef = useRef(null);


    useEffect(() => {
        if (!window.google) {
            loadGoogleScript(setIsLoaded);
        } else {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (window.google) {
            if (inpVal.val.length === 0) {
                setSugg([]);
            }

            if (inpVal.val.length < 4) return;

            if (!sessionTokenRef.current) {
                const token = getSessionToken();
                if (!token) {
                    console.error("Cannot get token");
                    return;
                }
                sessionTokenRef.current = token;
            }

            async function sugg() {
                try {
                    const { suggestions } = await getSuggestions(
                        sessionTokenRef.current,
                        inpVal.val
                    );
                    setSugg(suggestions);
                } catch (error) {
                    console.error("Error while getting sugg()" + error);
                }
            }
            sugg();
        }
    }, [inpVal.val]);

    function handleInpVal(value){
        setInpVal(value)
    }

    return {
        inpVal,
        isLoaded,
        sugg,
        handleInpVal,
    }
}