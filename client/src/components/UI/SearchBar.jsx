import { useRef } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useGoogleAutoComp } from "../../hooks/useGoogleAutoComp";

function SearchBar({ props }) {
  const { isLoaded, sugg, inpVal, handleInpVal } = useGoogleAutoComp();
  const locType = useRef();
  const inpTxt = useRef();

  const handleSelect = async (address, locId) => {
      const result = await getGeocode({ address });
      const { lat, lng } = getLatLng(result[0]);

      console.log(lat);
      console.log(lng);
      console.log(locId);
      handleInpVal({ val: "", index: null });
  };

  const handleLocName = async (locName,locId) => {
    
  };

  return (
    <div
      className="container d-flex justify-content-center w-50 position-absolute"
      style={props}
    >
      <div className="row rounded-pill  w-100 bg-body-tertiary d-flex align-content-center shadow-lg">
        <div className="col">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    disabled={!isLoaded}
                    value={inpVal.val}
                    ref={inpTxt}
                    className="form-control rounded-start-pill ps-4 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    id="floatingInput"
                    onChange={(e) =>
                      handleInpVal({ val: e.target.value, index: null })
                    }
                    placeholder="Enter Search location"
                  />
                  <label htmlFor="floatingInput" className="">
                    Enter Location
                  </label>
                  <ul className="dropdown-menu ms-4">
                    {sugg?.map((sug, i) => (
                      <li
                        className="dropdown-item"
                        onClick={() =>
                          handleInpVal({
                            val: sug?.Dg?.Ph?.[0]?.[2]?.[0],
                            index: i,
                          })
                        }
                      >
                        {sug?.Dg?.Ph?.[0]?.[2]?.[0] || "Unknown"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-5 rounded-bottom">
                <div className="form-floating">
                  <select
                    className="form-select w-100"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    ref={locType}
                  >
                    <option value="none">Select Lopcation Type</option>
                    <option value="A01">Appartment</option>
                    <option value="V01">Villa</option>
                    <option value="P01">Pent-House</option>
                  </select>
                  <label for="floatingSelect">Location Type</label>
                </div>
              </div>
              <div
                className="col-1 p-0 align-middle"
                style={{ width: 50, height: 54, objectFit: "cover" }}
              >
                <button
                  className="btn btn-primary rounded-end-pill h-100"
                  onClick={() => {
                    const loTypeVal =
                      locType.current.value !== "none"
                        ? locType.current.value
                        : null;
                    if (inpVal.index !== null) {
                      handleSelect(inpVal.val, loTypeVal);
                    } else {
                      handleLocName(inpTxt.current.value, loTypeVal);
                    }
                  }}
                >
                  <img src="/icons/search.png" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
