import "../css/locdetails.css";
import DateInputBox from "./UI/DateInputBox";

function LocDetails() {
  return (
    <>
      <div className="container border border-danger">
        <div className="row">
          <div className="col d-flex justify-content-between align-items-center">
            <h4 className="fw-semibold">
              The Bulbul Theory- 1 BHK | Balcony | Free Parking
            </h4>
            <button className="btn d-flex h-50 text-decoration-underline align-items-center">
              <img
                src="/public/icons/heart.png"
                style={{ width: 20, height: 20, objectFit: "cover" }}
                alt=""
                className="me-1"
              />
              Save
            </button>
          </div>
        </div>
        <div className="row" style={{ height: 500 }}>
          <div className="col-8 h-100 p-0 pe-3 ">
            <img
              src="/public/images/kitchen.jpg"
              alt="hall"
              className="w-100 h-100 mainImg"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-4 p-0 d-flex flex-column imgParent">
            <div className="imgWrapper">
              <div className="imgTop">
                <img
                  src="/public/images/bedroom.jpg"
                  alt="bedroom"
                  className="imgT"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="imgBottom">
                <img
                  src="/public/images/kitchen.jpg"
                  alt="bedroom"
                  className="imgB"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <h5 className="fw-medium mb-0">
              Entire rental unit in Gurugram, India
            </h5>
            <p className="p-0 text-muted form ">
              3 Guests &#10022; 1 bedroom &#10022; 1 bed &#10022; 1 bathroom
            </p>
          </div>
        </div>
        <div className="row" style={{ height: 500 }}>
          <div className="col-8 border border-dark"></div>
          <div className="col-4 border border-primary">
            <div className="column">
              <div className="row">
                <div className="col">
                  <div className="d-flex align-items-end">
                    <p className="fs-4 fw-semibold text-decoration-underline">
                      ₹5,292
                    </p>
                    <p className="fs-6 fw-medium text-muted ms-1">
                      for 2 nights
                    </p>
                  </div>
                </div>
              </div>
              <div className="row rentCol">
                <div className="col border border-info">
                  <div className="d-flex p-0 text-center row border border-success">
                    <div className="">
                      <DateInputBox />
                    </div>
                    <div className="">
                      <div className="dropdown-center">
                        <button
                          className=" btn fw-semibold dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Guests
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="dropdown-item" href="#">
                              Action
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Action two
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              Action three
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary w-75 fw-bold rounded-pill">
                        Rent-IT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ height: 1000 }}>
                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocDetails;
