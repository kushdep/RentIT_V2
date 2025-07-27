function SearchBar({props}) {
  return (
    <>
      <div
        className="container d-flex justify-content-center w-50 position-absolute"
        style={props}
      >
        <div className="row rounded-pill  w-100 bg-body-tertiary d-flex align-content-center">
          <div className="col">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control rounded-start-pill"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput" className="">
                      Email address
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-floating">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <label for="floatingSelect">Works with selects</label>
                  </div>
                </div>
                <div
                  className="col-2 p-0"
                  style={{ width: 60, height: 50, objectFit: "cover" }}
                >
                  <button className="btn btn-primary rounded-pill">
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
