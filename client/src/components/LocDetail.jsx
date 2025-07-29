import { Ammentities } from "../config";
import "../css/locdetails.css";
import DateInputBox from "./UI/DateInputBox";
import Reviews from "./Reviews";

function LocDetails() {
  return (
    <>
      <div className="container">
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
        <div className="row">
          <div className="col-8 h-100 p-0 pe-3 ">
            <img
              src="/public/images/hall2.jpg"
              alt="hall"
              className="w-100 h-100 mainImg position-relative"
              style={{ objectFit: "cover" }}
            />
            <button className="btn btn-light position-absolute rounded-pill" style={{bottom:50, left:150}}>
                Show all Photos
            </button>
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
        <div className="row">
          <div className="col-8 ">
            <div className="container">
              <div className="row">
                <div className="col d-flex  ">
                  <img
                    src="/public/images/hall.jpg"
                    alt="Logo"
                    className="img-fluid"
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                  />
                  <div className="ms-3">
                    <h6 className="fw-medium mb-0">Hosted by Swati</h6>
                    <p
                      className="p-0 text-muted form "
                      style={{ fontSize: 12 }}
                    >
                      Aprrover since
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div
                className="row w-100"
                style={{
                  height: 480,
                }}
              >
                <div className="col ammSec">
                  <h5 className="text-center text-decoration-underline">
                    What this place offers
                  </h5>
                  <div className="container">
                    <div class="row row-cols-2">
                      {Ammentities.map((a) => {
                        return (
                          <div className="col-5 ms-5 d-flex mt-3 border rounded-4 p-2">
                            <img
                              src={`/public/${a.options[0].img}`}
                              className=""
                              alt=""
                              style={{ height: 50, width: 50 }}
                            />
                            <p className="ms-4">{a.title}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col text-center">
                      <button className="btn btn-dark fw-semibold rounded-4">
                        Show All Ammenities
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <div className="row">
                    <h5 className="text-center text-decoration-underline">
                      Description
                    </h5>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Itaque repellendus, inventore vel odio quaerat quam eum
                        praesentium numquam. Accusamus similique reiciendis
                        consequatur, in quis est velit hic sint vel eligendi
                        eius aperiam odit maiores. . . . . .
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button className="btn btn-dark fw-semibold rounded-4">
                        Show more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 ">
            <div className="container position-sticky  rentCol shadow" style={{top:10}}>
              <div className="row p-0">
                <div className="col p-0 ">
                  <div className=" w-100">
                    <div className="d-flex mx-0 align-items-end justify-content-center">
                      <p className="fs-4 fw-semibold text-decoration-underline">
                        ₹5,292
                      </p>
                      <p className="fs-6 fw-medium text-muted ms-1">
                        for 2 nights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col p-0">
                  <div className="d-flex p-0 text-center row ">
                    <DateInputBox />
                    <div className="col rounded-5  p-0 my-2 mx-1">
                      <div className="dropdown-center my-2">
                        <button
                          className=" btn fw-semibold dropdown-toggle w-75 border-bottom"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Guests
                        </button>
                        <ul class="dropdown-menu w-75">
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
                      <div>
                        <button className="btn btn-primary w-75 fw-bold rounded-pill my-3 border-bottom">
                          Rent-IT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-4">
          <div className="container">
            <div className="row">
              <div className="col">
                <h2 className="text-decoration-underline text-center">
                  Reviews
                </h2>
              </div>
            </div>
            <div className="row mt-3">
              <div className="container" style={{ height: 800 }}>
                <div className="row row-cols-2">
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-dark mb-5">See More Reviews</button>
        </div>
      </div>
    </>
  );
}

export default LocDetails;
