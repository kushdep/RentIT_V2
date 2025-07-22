import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { addLocActions } from "../../store/addLoc-slice";

function GoogleMapInput() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inpVal, setInpVal] = useState("");
  const [sugg, setSugg] = useState([]);
  const sessionTokenRef = useRef(null);
  const dispatch = useDispatch();

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
              locationBias: {
                west: 68.11, 
                south: 6.55,
                east: 97.4, 
                north: 35.67,
              },
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
    const location = {
      address,
      coordinates: {
        latitude: lat,
        longitude: lng,
      },
    };
    console.log(location);
    dispatch(addLocActions.addLocCord({ location }));
    setInpVal("");
  };

  return (
    <>
      <div className="d-flex">
        <input
          type="text"
          value={inpVal}
          disabled={!isLoaded}
          className="form-control dropdown-toggle"
          data-bs-toggle="dropdown"
          onChange={(e) => setInpVal(e.target.value)}
          placeholder="Search your location"
        />
        <ul className="dropdown-menu m-0">
          {sugg?.map((sug) => (
            <li
              className="dropdown-item"
              onClick={() => setInpVal(sug?.Dg?.Nh?.[0]?.[2]?.[0])}
            >
              {sug?.Dg?.Nh?.[0]?.[2]?.[0] || "Unknown"}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary p-1 mx-2 h-50 w-25"
          onClick={() => handleSelect(inpVal)}
        >
          Add
        </button>
      </div>
    </>
  );
}

export default GoogleMapInput;
