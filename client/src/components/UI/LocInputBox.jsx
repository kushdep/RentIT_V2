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
        <input
          className="form-control"
          type="text"
          id="LocName"
          name="LocName"
          placeholder="Enter name of your location"
          required
        />
        <button className="btn d-flex" onClick={geoFindMe}>
          <img
            src="/public/icons/gps.png"
            className=""
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
          <p className="fw-semibold">Locate me</p>
        </button>
        <div className="valid-feedback">Looks Good!</div>
        <GoogleMapInput/>
      </div>
    </>
  );
}

export default LocInputBox;
