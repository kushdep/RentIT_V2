import { useRef, useState } from "react";
import "../css/addlocform.css";
import { Ammentities, locType } from "../config.js";
import AddImagesModal from "./Modals/AddImagesModal";
import AddAmmenitiesModal from "./Modals/AddAmenitiesModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../store/addLoc-slice.js";
import LocInputBox from "./InputBoxes/LocInputBox.jsx";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddLocForm() {
  const {
    offAmm: selAmmStt,
    imgTtlData: selImgStt,
    locType: locTypeStt,
    price: locPrice,
    locAdd,
    locName,
    guestsCap,
    errors: imgErr,
    desc,
  } = useSelector((state) => state.addLocData);
  const locStt = useSelector((state) => state.addLocData);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const addImgTtlModal = useRef();
  const addAmmModal = useRef();
  const [selAmmenity, setSelAmm] = useState(null);
  const status = useFormStatus();
  const navigate = useNavigate();

  function openModal(id) {
    try {
      setSelAmm(id);
      addAmmModal.current.showModal();
    } catch (error) {
      console.error("Error in form openModal() " + error);
    }
  }

  function handleLocType(title) {
    try {
      dispatch(addLocActions.updateLocType({ type: title }));
    } catch (error) {
      console.error("Error in form handleLocType() " + error);
    }
  }

  async function submitAction() {
    try {
      let tempErr = [];
      setErrors([]);
      if (locTypeStt.length === 0) {
        tempErr.push({
          severity: "error",
          message: "Please choose Location Type",
        });
      }

      if (guestsCap == null) {
        console.log("Guest Capacity " + guestsCap);
        tempErr.push({
          severity: "error",
          message: "Please provide Capacity of Guests",
        });
      }

      if (
        desc?.bedrooms == null ||
        desc?.beds == null ||
        desc?.bathrooms == null
      ) {
        tempErr.push({
          severity: "error",
          message: "Please provide complete details of your Location",
        });
      }

      if (locAdd === null || locAdd === undefined) {
        tempErr.push({
          severity: "error",
          message: "Please provide address of your location",
        });
      }

      if (
        locPrice === null ||
        locPrice === undefined ||
        locPrice.length === 0
      ) {
        tempErr.push({
          severity: "error",
          message: "Please provide Rent Price of your location",
        });
      }

      if (selImgStt.length < 3) {
        tempErr.push({
          severity: "error",
          message: "At least One image of Location is must",
        });
      }

      if (selAmmStt.length === 0) {
        tempErr.push({
          severity: "error",
          message: "At least One Ammenity info of Location is must",
        });
      }
      if (desc === null || desc === undefined || desc.length === 0) {
        tempErr.push({
          severity: "error",
          message: "Please provide description of your location",
        });
      }
      if (locName.length === 0) {
        tempErr.push({
          severity: "error",
          message: "Please provide name of your location",
        });
      }

      async function sendFormData() {
        try {
          const facilities = selAmmStt.map((f) => {
            return {
              id: f.id,
              title: f.title,
              ammenities: f.opt,
            };
          });
          const body = {
            locType: locTypeStt,
            locDtl: {
              title: locName,
              guestsCap: guestsCap,
              imgTtlData: selImgStt,
              price: locPrice,
              desc: { ...desc },
              facilities,
              location: {
                address: locAdd.address,
                coordinates: locAdd.coordinates,
                placeId: locAdd.place_id,
                plusCode: locAdd.plus_code,
              },
            },
          };
          console.log(body);
          const token = localStorage.getItem("token");
          console.log(token);
          try {
            const res = await axios.post(
              "http://localhost:3000/profile/new-loc",
              body,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(res);
            return res;
          } catch (error) {
            console.log("Error in axios sendFormData() " + error);
          }
        } catch (error) {
          console.error("Error in sendFormData() " + error);
        }
      }

      if (tempErr.length === 0 && Object.keys(imgErr).length === 0) {
        try {
          const res = await sendFormData();
          console.log(res);
          if (res.status === 201) {
            toast.success("Location Added Successfully");
            navigate("/rent-locs");
          }
        } catch (error) {
          if (error?.response?.status === 400) {
            console.error(error?.response?.data?.message);
          }
        }
      } else {
        setErrors((prev) => [...prev, ...tempErr]);
      }
    } catch (error) {
      console.error("Error in form action() " + error);
    }
  }

  console.log(locStt);

  console.log("errror " + JSON.stringify(imgErr));

  console.log(imgErr?.imgTtlErr?.length);

  return (
    <div className="container">
      <div className="row" id="ErrorELE">
        {errors.map((e) => {
          return (
            <div
              className="col alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {e.message}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="col">
          <div className="w-100">
            <div className="mb-3">
              <AddAmmenitiesModal id={selAmmenity} reference={addAmmModal} />
              <AddImagesModal reference={addImgTtlModal}></AddImagesModal>

              <label className="form-label fw-semibold" htmlFor="location">
                Location Name
              </label>
              <div className="d-flex col">
                <input
                  className="form-control w-75"
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Location Name"
                  onChange={(e) =>
                    dispatch(
                      addLocActions.updateLocName({ name: e.target.value })
                    )
                  }
                  required
                />
                <div class="btn-group w-25">
                  <button
                    type="button"
                    class="btn btn-primary dropdown-toggle ms-3"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {locTypeStt
                      ? locType.find(({ id }) => id === locTypeStt).title
                      : "Location type"}
                  </button>
                  <ul class="dropdown-menu w-100">
                    {locType &&
                      locType.map((l) => (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleLocType(l.id)}
                          >
                            {l.title}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container p-0">
            <div className="row">
              <div className="col">
                <label htmlFor="guests" className="form-label fw-semibold">
                  Guests
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="guests"
                  name="guests"
                  placeholder="Max guests allowed *"
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      dispatch(
                        addLocActions.addLocDesc({ guestCap: e.target.value })
                      );
                    } else {
                      setErrors((prev) => {
                        let err = {
                          severity: "error",
                          message: "Please enter correct guest capacity",
                        };
                        return [...prev, err];
                      });
                    }
                  }}
                />
              </div>
              <div className="col">
                <label htmlFor="bedroom" className="form-label fw-semibold">
                  Bedroom
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="guests"
                  name="bedrooms"
                  placeholder="No of Bedrooms *"
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      dispatch(
                        addLocActions.addLocDesc({ bedrooms: e.target.value })
                      );
                    } else {
                      setErrors((prev) => {
                        let err = {
                          severity: "error",
                          message: "Please enter correct bedrooms",
                        };
                        return [...prev, err];
                      });
                    }
                  }}
                />
              </div>
              <div className="col">
                <label htmlFor="beds" className="form-label fw-semibold">
                  Beds
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="beds"
                  name="beds"
                  placeholder="No of Beds *"
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      dispatch(
                        addLocActions.addLocDesc({ beds: e.target.value })
                      );
                    } else {
                      setErrors((prev) => {
                        let err = {
                          severity: "error",
                          message: "Please enter correct beds number",
                        };
                        return [...prev, err];
                      });
                    }
                  }}
                />
              </div>
              <div className="col">
                <label htmlFor="bathroom" className="form-label fw-semibold">
                  Bathroom
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  id="bathrooms"
                  name="bathrooms"
                  placeholder="No of Bathrooms *"
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      dispatch(
                        addLocActions.addLocDesc({ bathrooms: e.target.value })
                      );
                    } else {
                      setErrors((prev) => {
                        let err = {
                          severity: "error",
                          message: "Please enter correct bathrooms number",
                        };
                        return [...prev, err];
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-3">
            <LocInputBox />
            </div>
          </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-8">
                <div className="mb-3">
                  <label for="price" className="form-label fw-semibold">
                    Price
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      id="price"
                      className="form-control"
                      placeholder="0.00"
                      name="price"
                      onChange={(e) =>
                        dispatch(
                          addLocActions.updatePrice({
                            locPrice: e.target.value,
                          })
                        )
                      }
                      required
                    />
                    <span className="input-group-text">/night</span>
                  </div>
                  <div className="valid-feedback">Looks Good!</div>
                </div>
              </div>
              <div className="col-4"></div>
            </div>
          </div>
          <div className="my-3">
            <button
              className={
                selImgStt.length === 0
                  ? "btn w-100 fw-semibold btn-outline-primary"
                  : "btn w-100 fw-semibold btn-dark"
              }
              onClick={() => {
                console.log(selImgStt.length);
                if (selImgStt.length < 1) {
                  dispatch(addLocActions.addImgTtlNewData());
                }
                addImgTtlModal.current.showModal();
              }}
            >
              {selImgStt.length < 3 ? "Add Images" : "Edit Images"}
            </button>
            <div>
              {imgErr?.imgTtlErr && imgErr?.imgTtlErr.length !== 0 ? (
                <p className="text-danger fw-normal">
                  Please Fill this field correctly
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="container my-3">
            <div className="row " style={{ height: 80 }}>
              <div className="col-2 p-0">
                <div className="dropdown">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Offered Ammenities
                  </button>
                  <ul class="dropdown-menu">
                    {Ammentities.map((e, i) => (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            openModal(e.id);
                          }}
                        >
                          {e.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-9 ms-2 border rounded-2 d-flex flex-row">
                {selAmmStt.length > 0 ? (
                  selAmmStt.map((e, i) => {
                    return (
                      <div
                        className="d-flex flex-column me-3  position-relative"
                        style={{ width: 90, height: 100 }}
                      >
                        <button
                          className="btn border-dark-subtle p-0 mt-2"
                          onClick={() => openModal(e.id)}
                        >
                          <img
                            src={`/public${
                              Ammentities[e?.id - 1]?.options[0]?.img
                            }`}
                            className="img-thumbnail border-0"
                            style={{
                              width: 70,
                              height: 70,
                              objectFit: "scale-down",
                            }}
                          />
                        </button>
                        <button
                          className="btn p-0 mb-auto position-absolute"
                          style={{ top: -9, right: -9 }}
                          onClick={() => {
                            console.log(e.id);
                            dispatch(addLocActions.delAmmenity({ id: e.id }));
                          }}
                        >
                          <img src="/icons/x-circle-fill.svg" alt="" />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <p className="text-muted">No Ammenitites Selected</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="About this space"
              onChange={(e) =>
                dispatch(
                  addLocActions.addOtherDesc({ description: e.target.value })
                )
              }
              required
            ></textarea>
            <div className="valid-feedback">Looks Good!</div>
            <div className="d-flex row">
              <button
                className="btn btn-success mt-3 fw-bolder"
                onClick={submitAction}
                disabled={status.pending}
              >
                {status.pending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLocForm;
