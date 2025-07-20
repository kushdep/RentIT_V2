import { useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

const libraries = ["places"];

function GoogleMapInput() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const [sugg, setSugg] = useState([]);
  const sessionTokenRef = useRef(null);

  useEffect(() => {
    console.log("Runnign first USeEffect 1");
    if (!window.google) {
      console.log("Runnign first USeEffect 2");
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_PLACES_MAP_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      console.log("Runnign first USeEffect 3X");
      script.onload = () => {
        setIsLoaded(true);
        console.log("Google Maps loaded", window.google);
        console.log("Runnign first USeEffect 4 ", window);
      };
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (window.google) {
      if (!sessionTokenRef.current) {
        sessionTokenRef.current =
          new google.maps.places.AutocompleteSessionToken();
      }

      async function getSuggestions() {
        if(inpVal.length<4) return
        const {suggestions} =
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
              input: inpVal,
              sessionToken: sessionTokenRef.current,
            }
          );
          console.log("response "+JSON.stringify(suggestions))

          setSugg(suggestions)

          return ()=>{
            if(!inpVal.length){
              setInpVal('')
            }
          }
      }
      getSuggestions();
    }
  }, [inpVal]);
  
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const result = await getGeocode({ address });
    const { lat, lng } = await getLatLng(result[0]);
    console.log(`${address} Cordinates --> lat: ${lat} lng:${lng}`);
  };
  
  // function renderSuggestions() {
    //   console.log("Suggested places " + JSON.stringify(data));
    //   return data.map((suggestion) => {
      //     const {
        //       place_id,
        //       structured_formatting: { main_text, secondary_text },
        //     } = suggestion;
        
        //     return isLoaded ? (
          //       <li key={place_id} onClick={() => handleSelect(suggestion)}>
          //         <strong>{main_text}</strong> <small>{secondary_text}</small>
          //       </li>
          //     ) : (
            //       "Loading..."
            //     );
            //   });
            // }
            console.log("suggestion state "+JSON.stringify(sugg[0]))
            console.log("suggestion state "+JSON.stringify(sugg[0]?.Dg))

  return (
    <>
      <div className="col-4">
        <div class="btn-group">
          <input
            type="text"
            value={inpVal}
            disabled={!isLoaded}
            class="form-control dropdown-toggle mt-3"
            data-bs-toggle="dropdown"
            onChange={(e) => setInpVal(e.target.value)}
            placeholder="Search your location"
          />
          <ul className="dropdown-menu">
            {sugg?.map((sug) => (
              <li
                className="dropdown-item"
                onClick={() => handleSelect(sug)}
              >
              {sug?.Dg?.Nh?.[0][2]?.[0] || 'Unknown'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default GoogleMapInput;
