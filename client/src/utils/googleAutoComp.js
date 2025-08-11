export async function getSuggestions(sessionToken, searchTxt) {
    try {
        const { suggestions } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
                input: searchTxt,
                sessionToken: sessionToken,
                locationBias: {
                    west: 68.11,
                    south: 6.55,
                    east: 97.4,
                    north: 35.67,
                },
            }
        );
        // console.log("suggestions "+JSON.stringify(suggestions))
        if (!suggestions) {
            console.error("Got empty Suggestion List")
        }
        return { suggestions };
    } catch (error) {
        console.error("Error in getSuggestions()", error)
    }
}

export function getSessionToken() {
    try {
        const token = new google.maps.places.AutocompleteSessionToken();
        if (!token) {
            console.error("AutocompleteSessionToken is undefined or null")
            return
        }
        return token
    } catch (error) {
        console.log("Error in Getting Session token")
    }
}


export function loadGoogleScript(chkLoadFn) {
    try {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_PLACES_MAP_KEY
            }&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            chkLoadFn(true);
        };
        document.body.appendChild(script);
    } catch (error) {
        console.log("Error in Load Google Script" + error)
    }
}

