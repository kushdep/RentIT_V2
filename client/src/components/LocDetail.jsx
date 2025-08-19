import { Ammentities } from "../config";
import "../css/locdetails.css";
import DateInputBox from "./UI/DateInputBox";
import Reviews from "./Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import ShowAmmModal from "./Modals/showAmmModal";
import { curfmt } from "../utils/formatter";
import GoogleMap from "./GoogleMap";
import { useDispatch, useSelector } from "react-redux";

import AddReview from "./AddReview";

function LocDetails() {
  const showAmmModal = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rentLocData: locDetails } = useSelector((state) => state.rentLocs);
  const { locId } = useParams();

  let loc = null;
  loc = locDetails.find((loc) => loc._id === locId);
  const {
    title,
    imgTtlData,
    desc,
    guestsCap,
    facilities,
    price,
    author,
    location,
  } = loc.locDtl;

  const { options } = Ammentities.find((a) => a.id === facilities[0].id);

  return (
    <>
      <ShowAmmModal reference={showAmmModal} facilities={facilities} />
      {loc && (
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-between align-items-center">
              <h4 className="fw-semibold">
                {title}- {desc.bedrooms} BHK
              </h4>
              <button className="btn d-flex h-50 text-decoration-underline align-items-center">
                <img
                  src="/public/icons/heart-fill.png"
                  style={{ width: 20, height: 20, objectFit: "cover" }}
                  alt=""
                  className="me-1"
                />
                Save
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-8 h-100 p-0 pe-3">
              <img
                src={`${imgTtlData[0].images[0].url}`}
                alt="hall"
                className="w-100 h-100 mainImg position-relative shadow"
                style={{ objectFit: "cover" }}
              />
              <button
                className="btn btn-light position-absolute rounded-pill"
                style={{ bottom: 50, left: 150 }}
                onClick={() => navigate(`photos`)}
              >
                Show all Photos
              </button>
            </div>

            <div className="col-4 p-0 d-flex flex-column imgParent">
              <div className="imgWrapper">
                <div className="imgTop">
                  <img
                    src={`${imgTtlData[1].images[0].url}`}
                    alt="bedroom"
                    className="imgT shadow"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="imgBottom">
                  <img
                    src={`${imgTtlData[2].images[0].url}`}
                    alt="bedroom"
                    className="imgB shadow"
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
                {guestsCap} Guests &#10022; {desc.bedrooms} bedroom &#10022;
                {desc.beds} bed &#10022; {desc.bathrooms} bathroom
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
                      <h6 className="fw-medium mb-0">
                        Hosted by {author.username}
                      </h6>
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
                <div className="row w-100">
                  <div className="col ammSec">
                    <h5 className="text-center text-decoration-underline">
                      What this place offers
                    </h5>
                    <div className="container">
                      <div class="row row-cols-2">
                        {facilities[0].ammenities.map((a) => {
                          const { img, name } = options.find(
                            (o) => o.id === a.id
                          );
                          return (
                            <div className="col-5 ms-5 d-flex mt-3 border rounded-4 p-2">
                              <img
                                src={`/public/${img}`}
                                className=""
                                alt=""
                                style={{ height: 50, width: 50 }}
                              />
                              <p className="ms-4">{name}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col text-center">
                        <button
                          className="btn btn-dark fw-semibold rounded-4"
                          onClick={() => showAmmModal.current.showModal()}
                        >
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
                        <p>{desc.others}</p>
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
              <div
                className="container position-sticky  rentCol shadow"
                style={{ top: 10 }}
              >
                <div className="row p-0">
                  <div className="col p-0 ">
                    <div className=" w-100">
                      <div className="d-flex mx-0 align-items-end justify-content-center">
                        <p className="fs-4 fw-semibold text-decoration-underline">
                          {curfmt.format(price)}
                        </p>
                        <p className="fs-6 fw-medium text-muted ms-1">
                          / night
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
                            {Array.from({ length: guestsCap }).map((_, i) => (
                              <li>
                                <a class="dropdown-item" href="#">
                                  {i + 1}
                                </a>
                              </li>
                            ))}
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
          <div className="row mt-4">
            <GoogleMap placeId={location.placeId} />
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
          <div className="row">
            <div className="col-6">
              <AddReview/>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocDetails;
