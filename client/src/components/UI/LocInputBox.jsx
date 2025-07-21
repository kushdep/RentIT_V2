import GoogleMapInput from "./GoogleMapInput";

function LocInputBox() {
  return (
    <>
      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="LocName">
          Address
        </label>
          <GoogleMapInput />
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
