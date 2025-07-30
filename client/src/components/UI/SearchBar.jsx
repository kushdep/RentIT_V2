function SearchBar({props}) {
  return (
    <>
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
                      type="email"
                      className="form-control rounded-start-pill ps-4"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput" className="">
                      Enter Location
                    </label>
                  </div>
                </div>
                <div className="col-5 rounded-bottom">
                  <div className="form-floating">
                    <select
                      className="form-select w-100"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option selected>Select Lopcation Type</option>
                      <option value="1">Appartment</option>
                      <option value="2">Villa</option>
                      <option value="3">Pent-House</option>
                    </select>
                    <label for="floatingSelect">Location Type</label>
                  </div>
                </div>
                <div
                  className="col-1 p-0 align-middle"
                  style={{ width: 50, height: 54, objectFit: "cover" }}
                >
                  <button className="btn btn-primary rounded-end-pill h-100">
                    <img src="/icons/search.png" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
