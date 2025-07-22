function SearchBar() {
  return (
    <>
      <div
        className="container d-flex justify-content-center w-50 position-absolute"
        style={{ height: 100, top: 150, right: 390 }}
      >
        <div className="row rounded-4 w-100 bg-body-tertiary d-flex align-content-center">
          <div className="col">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput" className="">
                      Email address
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div class="form-floating">
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
