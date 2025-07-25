import { useActionState, useRef, useState } from "react";
import "../css/addlocform.css";
import { Ammentities, locType } from "../config.js";
import AddImagesModal from "./Modals/AddImagesModal";
import AddAmmenitiesModal from "./Modals/AddAmenitiesModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../store/addLoc-slice.js";
import LocInputBox from "./InputBoxes/LocInputBox.jsx";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

function AddLocForm() {
  const {
    offAmm: selAmmStt,
    imgTtlData: selImgStt,
    locType: locTypeStt,
    price: locPrice,
    locAdd,
    locName,
    desc,
  } = useSelector((state) => state.addLocData);
  const locStt = useSelector((state) => state.addLocData);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const addImgTtlModal = useRef();
  const addAmmModal = useRef();
  const [selAmmenity, setSelAmm] = useState(null);
  const status = useFormStatus();

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

  function submitAction() {
    try {
      let tempErr = [];
      if (locTypeStt.length === 0) {
        console.log("1");
        tempErr.push({
          severity: "error",
          message: "Please choose Location Type",
        });
      }

      if (locAdd === null || locAdd === undefined) {
        console.log("2");
        tempErr.push({
          severity: "error",
          message: "Please provide address of your location",
        });
      }

      if (locPrice === null || locPrice === undefined) {
        console.log("3");
        tempErr.push({
          severity: "error",
          message: "Please provide Rent Price of your location",
        });
      }

      if (selImgStt[0].title === null || selImgStt[0].images.length === 0) {
        console.log("4");
        tempErr.push({
          severity: "error",
          message: "At least One image of Location is must",
        });
      }

      if (selAmmStt.length === 0) {
        console.log("5");
        tempErr.push({
          severity: "error",
          message: "At least One Ammenity info of Location is must",
        });
      }
      if (desc === null || desc === undefined) {
        console.log("6");
        tempErr.push({
          severity: "error",
          message: "Please provide Description of your location",
        });
      }
      if (locName.length === 0) {
        console.log("7");
        tempErr.push({
          severity: "error",
          message: "Please provide name of your location",
        });
      }

      setErrors((prev) => [...prev, ...tempErr]);

      
    } catch (error) {
      console.error("Error in form action() " + error);
    }
  }

  console.log(locStt);

  console.log(errors);

  return (
    <>
      <AddAmmenitiesModal id={selAmmenity} reference={addAmmModal} />
      <AddImagesModal reference={addImgTtlModal}></AddImagesModal>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="w-100">
              <div className="mb-3">
                {errors.map((e) => {
                  return (
                    <div
                      class="alert alert-danger alert-dismissible fade show"
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
                      {locTypeStt ? `${locTypeStt}` : "Location type"}
                    </button>
                    <ul class="dropdown-menu">
                      {locType &&
                        locType.map((l) => (
                          <li>
                            <button
                              class="dropdown-item"
                              onClick={() => handleLocType(l.title)}
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
            <div className="">
              <LocInputBox />
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
                        onChange={(e)=>dispatch(addLocActions.updatePrice({locPrice:e.target.value}))}
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
                  selImgStt[0].images.length === 0
                    ? "btn w-100 fw-semibold btn-outline-primary"
                    : "btn w-100 fw-semibold btn-dark"
                }
                onClick={() => addImgTtlModal.current.showModal()}
              >
                {selImgStt[0].images.length === 0
                  ? "Add Images"
                  : "Edit Images"}
              </button>
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
                          <p class="fs-6 text-center">{e?.title}</p>
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
                    addLocActions.addDesc({ description: e.target.value })
                  )
                }
                required
              ></textarea>
              <div className="valid-feedback">Looks Good!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex row">
        <button
          className="btn btn-success"
          onClick={submitAction}
          disabled={status.pending}
        >
          {status.pending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </>
  );
}

export default AddLocForm;
