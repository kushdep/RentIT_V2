import GoogleMapInput from "./GoogleMapInput";

function LocInputBox() {
  function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let sessionToken = new google.maps.places.AutocompleteSessionToken();
      console.log(JSON.stringify(position));
      console.log(latitude);
      console.log(longitude);
      console.log(sessionToken);
    }

    function error() {
      console.log("Unable to get Location");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Getting your location");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  return (
    <>
      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="LocName">
          Address
        </label>
        <div className="d-flex">
          <GoogleMapInput />
            <button
              className="btn btn-primary fw-medium p-1 mx-2"
              onClick={geoFindMe}
            >
              <img
                src="/public/icons/arrows.png"
                className=""
                style={{ width: 30, height: 30, objectFit: "cover" }}
              />
              Locate me
            </button>
        </div>
        <textarea
          className="form-control mt-2"
          type="text"
          id="Address"
          rows="3"
          name="Address"
          placeholder="Enter address of your location"
          required
        />
      </div>
    </>
  );
}

export default LocInputBox;
