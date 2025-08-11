import { useDispatch } from "react-redux";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { addLocActions } from "../../store/addLoc-slice";
import { useGoogleAutoComp } from "../../hooks/useGoogleAutoComp";

function GoogleMapInput({ addressVis }) {
  const { isLoaded, sugg, inpVal, handleInpVal } = useGoogleAutoComp();
  const dispatch = useDispatch();

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
    handleInpVal("");
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
          onChange={(e) => handleInpVal({ val: e.target.value, index: null })}
          placeholder="Search your location"
        />
        <ul className="dropdown-menu m-0">
          {sugg?.map((sug, i) => (
            <li
              className="dropdown-item"
              onClick={() =>
                handleInpVal({ val: sug?.Dg?.Ph?.[0]?.[2]?.[0], index: i })
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
