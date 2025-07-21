import { useEffect, useRef, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";

function GoogleMapInput() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const [sugg, setSugg] = useState([]);
  const sessionTokenRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_PLACES_MAP_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsLoaded(true);
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
        if (inpVal.length === 0) {
          setSugg([]);
        }
        if (inpVal.length < 4) return;
        const { suggestions } =
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            {
              input: inpVal,
              sessionToken: sessionTokenRef.current,
            }
          );
        setSugg(suggestions);
      }
      getSuggestions();
    }
  }, [inpVal]);

  const handleSelect = async (address) => {
    const result = await getGeocode({ address });
    const { lat, lng } = getLatLng(result[0]);
    console.log(`${address} Cordinates --> lat: ${lat} lng:${lng}`);
  };

  return (
    <>
      <div className="col-4">
        <input
          type="text"
          value={inpVal}
          disabled={!isLoaded}
          class="form-control dropdown-toggle"
          data-bs-toggle="dropdown"
          onChange={(e) => setInpVal(e.target.value)}
          placeholder="Search your location"
        />
        <ul className="dropdown-menu m-0">
          {sugg?.map((sug) => (
            <li
              className="dropdown-item"
              onClick={() => handleSelect(sug?.Dg?.Nh?.[0][2]?.[0])}
            >
              {sug?.Dg?.Nh?.[0][2]?.[0] || "Unknown"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default GoogleMapInput;
