import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { addLocActions } from "../../store/addLoc-slice";
import {
  getSessionToken,
  getSuggestions,
  loadGoogleScript,
} from "../../utils/googleAutoComp";

function GoogleMapInput({ addressVis }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inpVal, setInpVal] = useState({ val: "", index: null });
  const [sugg, setSugg] = useState([]);
  const sessionTokenRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.google) {
      loadGoogleScript(setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (window.google) {
      if (inpVal.length === 0) {
        setSugg([]);
      }

      if (inpVal.length < 4) return;

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

  const handleSelect = async (address) => {
    const result = await getGeocode({ address });
    const { lat, lng } = getLatLng(result[0]);
    const { place_id, plus_code } = result[0];
    const location = {
      address,
      coordinates: {
        latitude: lat,
        longitude: lng,
      },
      place_id,
      plus_code,
    };
    dispatch(addLocActions.addLocCord({ location }));
    setInpVal("");
    addressVis(true);
  };


  return (
    <div className="col">
      <div className="d-flex">
        <input
          type="text"
          value={inpVal.val}
          disabled={!isLoaded}
          className="form-control dropdown-toggle"
          data-bs-toggle="dropdown"
          onChange={(e) => setInpVal({ val: e.target.value, index: null })}
          placeholder="Search your location"
        />
        <ul className="dropdown-menu m-0">
          {sugg?.map((sug, i) => (
            <li
              className="dropdown-item"
              onClick={() =>
                setInpVal({ val: sug?.Dg?.Ph?.[0]?.[2]?.[0], index: i })
              }
            >
              {sug?.Dg?.Ph?.[0]?.[2]?.[0] || "Unknown"}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-outline-primary p-1 mx-2 h-50 w-25"
          disabled={inpVal.index === null ? true : false}
          onClick={() => {
            if (inpVal.index !== null) {
              handleSelect(inpVal.val);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default GoogleMapInput;
