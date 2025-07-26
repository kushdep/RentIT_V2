import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { addLocActions } from "../../store/addLoc-slice";

function GoogleMapInput({ addressVis }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inpVal, setInpVal] = useState({val:'',index:null});
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
              input: inpVal.val,
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
  }, [inpVal.val]);

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
    addressVis(true)
  };

  return (
    <>
      <div className="d-flex">
        <input
          type="text"
          value={inpVal.val}
          disabled={!isLoaded}
          className="form-control dropdown-toggle"
          data-bs-toggle="dropdown"
          onChange={(e) => setInpVal({val:e.target.value,index:null})}
          placeholder="Search your location"
        />
        <ul className="dropdown-menu m-0">
          {sugg?.map((sug,i) => (
            <li
              className="dropdown-item"
              onClick={() => setInpVal({val:sug?.Dg?.Nh?.[0]?.[2]?.[0],index:i})}
            >
              {sug?.Dg?.Nh?.[0]?.[2]?.[0] || "Unknown"}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary p-1 mx-2 h-50 w-25"
          disabled={inpVal.index===null?true:false}
          onClick={() => {
            if(inpVal.index!==null){
              handleSelect(inpVal.val)
            }
          }
        }
        >
          Add
        </button>
      </div>
    </>
  );
}

export default GoogleMapInput;
