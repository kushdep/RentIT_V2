import { Ammentities } from "../config";
import "../css/locdetails.css";
import DateInputBox from "./UI/DateInputBox";
import Reviews from "./Reviews";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ShowAmmModal from "./Modals/showAmmModal";
import { curfmt } from "../utils/formatter";
import GoogleMap from "./GoogleMap";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSavedLoc } from "../store/profile-slice";
import axios from "axios";
import { Skeleton } from "antd";

function LocDetails() {
  const showAmmModal = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { rentLocData: locDetails } = useSelector((state) => state.rentLocs);
  const { isAuthenticated, token } = useSelector((state) => state.authData);
  const { savedLocData } = useSelector((state) => state.profileData);
  const { locId } = useParams();
  const isSaved = savedLocData.locData.find((e) => e.locId === locId);
  console.log(isSaved);
  const [like, setLike] = useState(isSaved);

  let loc = null;
  loc = locDetails.find((loc) => loc._id === locId);
  console.log(loc);
  useEffect(() => {
    if (loc === undefined || loc === null) {
      console.log("inside");
      async function getLocDetail() {
        try {
          console.log("1");
          const response = await axios.get(
            `http://localhost:3000/rent-locs/${locId}`
          );
          console.log("2");
          console.log(response);
          if (response.status === 200) {
            const { locationDetail } = response.data;
            loc = locationDetail;
            console.log("3 " + loc);
          }
        } catch (error) {
          if (error.response.status === 404) {
          }
          if (error.response.status === 400) {
          }
        }
      }
      getLocDetail();
    }
  }, []);

  // const {
  //   title = null,
  //   imgTtlData = [],
  //   desc = null,
  //   guestsCap = null,
  //   facilities = [],
  //   price = null,
  //   author = null,
  //   location = null,
  // } = loc.locDtl;

  const locDtl = loc?.locDtl || null;
  console.log(locDtl);
  console.log("checking title loc " + loc);
  const { options } =
    Ammentities.find((a) => a.id === locDtl?.facilities[0].id) || [];

  async function handleSave() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (savedLocData.count >= 8) {
      toast.error(`You can't add more than 40 Loc to your whishlist`);
    }
    setLike((prev) => {
      return !prev;
    });

    try {
      console.log(locId);
      console.log(!like);
      await dispatch(setSavedLoc({ locId: locId, saveStts: !like, token }));
    } catch (error) {
      console.log(error);
      toast.error("cannot Save to Whishlist");
      setLike((prev) => {
        return !prev;
      });
    }
  }
  return (
    <>
      {locDtl !== undefined && locDtl !== null ? (
        <div className="container">
          <ShowAmmModal
            reference={showAmmModal}
            facilities={locDtl.facilities}
          />
          <div className="row">
            <div className="col d-flex justify-content-between align-items-center">
              <h4 className="fw-semibold">
                {locDtl.title}- {locDtl.desc.bedrooms} BHK
              </h4>
              <button
                className="btn d-flex h-50 text-decoration-underline align-items-center"
                onClick={handleSave}
              >
                <img
                  src={
                    like
                      ? "/public/icons/heart-fill.png"
                      : "/public/icons/heart-black-border.png"
                  }
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
                src={`${locDtl.imgTtlData[0].images[0].url}`}
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
                    src={`${locDtl.imgTtlData[1].images[0].url}`}
                    alt="bedroom"
                    className="imgT shadow"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div className="imgBottom">
                  <img
                    src={`${locDtl.imgTtlData[2].images[0].url}`}
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
                {locDtl.guestsCap} Guests &#10022; {locDtl.desc?.bedrooms}{" "}
                bedroom &#10022;
                {locDtl.desc?.beds} bed &#10022; {locDtl.desc?.bathrooms}{" "}
                bathroom
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
                        Hosted by {locDtl.author.username}
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
                        {locDtl.facilities[0].ammenities.map((a) => {
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
                        <p>{desc?.others}</p>
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
                          {curfmt.format(locDtl.price)}
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
                            {Array.from({ length: locDtl.guestsCap }).map(
                              (_, i) => (
                                <li>
                                  <a class="dropdown-item" href="#">
                                    {i + 1}
                                  </a>
                                </li>
                              )
                            )}
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
            <GoogleMap placeId={locDtl.location?.placeId} />
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
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-7">
              <Skeleton.Node active style={{width:"100vh", height:"50vh"}}/>
            </div>
            <div className="col-2 ">
              <Skeleton.Node active style={{width:"60vh", height:"24vh"}}/>
              <Skeleton.Node active style={{width:"60vh", height:"24vh"}} className="
              mt-2"/>
            </div>
            <div className="row mt-4">
              <div className="col">
                <Skeleton.Avatar active />
                <Skeleton.Input active className="ms-2" size=""/>
                <Skeleton active className="mt-3"/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LocDetails;
