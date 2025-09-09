import { useRef } from "react";
import toast from "react-hot-toast";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useGoogleAutoComp } from "../../hooks/useGoogleAutoComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar({ props, updateSearchStt }) {
  const { isLoaded, sugg, inpVal, handleInpVal } = useGoogleAutoComp();
  const locType = useRef();
  const navigate = useNavigate();

  async function getSearchLoc(searchFeilds) {
    const {
      lat = null,
      lng = null,
      locName = null,
      locType = null,
    } = searchFeilds;
    console.log(locName)
    console.log(searchFeilds)

    let url = `http://localhost:3000/rent-locs?search=true`;
    if (locName === null && lat !== null && lng !== null) {
      url += `&coordinates=true&lat=${lat}&long=${lng}`;
      if (locType !== null) {
        url += `&locType=${locType}`;
      }
        try {
          console.log(url)
          const response = await axios.get(url);
          if (response.status === 200) {
            if (response.data.found) {
              const { locId } = response.data;
              updateSearchStt((prev) => {
                const updatedval = {
                  val: true,
                  locId,
                  locs: [],
                  long:lng,
                  lat:lat,
                };
                return {
                  ...prev,
                  coordinates: updatedval,
                };
              });
              console.log(locId)
              navigate(`/rent-locs/${locId}`);
            } else {
              const { similarLocs } = response.data;
              updateSearchStt((prev) => {
                const updatedval = {
                  val: true,
                  locId: null,
                  locs: similarLocs,
                  long:lng,
                  lat:lat,
                };
                return {
                  ...prev,
                  coordinates: updatedval,
                };
              });
            }
          }
        } catch (error) {
          if (error.response.status === 400) {
            console.log(error.response.data);
          }
        }
    }

    if (locName !== null) {
      url += `&locName=true&name=${locName}`;
      if (locType !== null) {
        url += `&locType=${locType}`;
      }
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const { locId } = response.data;
          updateSearchStt((prev) => {
            const updatedval = {
              val: true,
              locId,
            };
            return {
              ...prev,
              coordinates: updatedval,
            };
          });
          navigate(`/rent-locs/${locId}`);
        }
      } catch (error) {
        if (error.response.status === 404) {
          console.log(error.response.data);
          updateSearchStt((prev) => {
            const updatedval = { val: true, locId: null };
            return {
              ...prev,
              name: updatedval,
            };
          });
        }
        if (error.response.status === 400) {
          console.log(error.response.data);
        }
      }
    }
  }

  async function handleSearchLoc() {
    console.log(inpVal.val);
    const loTypeVal =
      locType.current.value !== "none" ? locType.current.value : null;
    if (
      (inpVal.index === null && inpVal.val === "") ||
      (inpVal.index === null && inpVal.val === "" && loTypeVal !== null)
    ) {
      toast.error("Please Enter Valid Search Location");
      return;
    }
    if (inpVal.index !== null) {
      const result = await getGeocode({ address: inpVal.val });
      const { lat, lng } = getLatLng(result[0]);
      await getSearchLoc({ lat, lng });
      handleInpVal({ val: "", index: null, locType: loTypeVal });
    } else {
      await getSearchLoc({ locName: inpVal.val, locType: loTypeVal });
    }
  }

  return (
    <div
      className="container d-flex justify-content-center w-50 position-absolute "
      style={props}
    >
      <div className="row rounded-pill w-100 bg-body-tertiary d-flex align-content-center shadow-lg ">
        <div className="col">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-6">
                <div className="form-floating">
                  <input
                    type="text"
                    disabled={!isLoaded}
                    value={inpVal.val}
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
                  onClick={handleSearchLoc}
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
