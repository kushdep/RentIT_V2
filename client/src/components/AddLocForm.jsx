import { useRef } from "react";
import "../css/addlocform.css";
import { Ammentities, locType } from "../config.js";
import Button from "./UI/Button";
import AddImagesModal from "./Modals/AddImagesModal";
import AddAmmenitiesModal from "./Modals/AddAmenitiesModal.jsx";

function AddLocForm() {
  const addImgTtlModal = useRef();
  const addAmmModal = useRef();

  function openModal(id) {
    addAmmModal.current.showModal();
  }

  return (
    <>
      <AddAmmenitiesModal reference={addAmmModal} />;
      <AddImagesModal reference={addImgTtlModal}></AddImagesModal>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label className="form-label fw-semibold" htmlFor="LocName">
                Location Name
              </label>
              <input
                className="form-control"
                type="text"
                id="LocName"
                name="LocName"
                placeholder="Enter name of your location"
                required
              />
              <div className="valid-feedback">Looks Good!</div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold" for="location">
                Location
              </label>
              <input
                className="form-control"
                type="text"
                id="location"
                name="location"
                placeholder="Enter the location"
                required
              />
              <div className="valid-feedback">Looks Good!</div>
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
                        required
                      />
                      <span className="input-group-text">/night</span>
                    </div>
                    <div className="valid-feedback">Looks Good!</div>
                  </div>
                </div>
                <div className="col-4">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-outline-primary dropdown-toggle mt-3"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Location type
                    </button>
                    <ul class="dropdown-menu">
                      {locType &&
                        locType.map((l) => (
                          <li>
                            <button class="dropdown-item">{l.title}</button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn w-100 fw-semibold btn-outline-primary"
              onClick={() => addImgTtlModal.current.showModal()}
            >
              Add Images
            </button>

            <div className="container my-3">
              <div className="row" style={{ height: 80 }}>
                <div className="col-2">
                  <div class="dropdown ">
                    <button
                      class="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Offered Ammenities
                    </button>
                    <ul class="dropdown-menu">
                      {Ammentities.map((e) => (
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => openModal(e.id)}
                          >
                            {e.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-10 border rounded-2 d-flex flex-row p-2">
                  <div
                    className="d-flex flex-column me-3"
                    style={{ width: 90, height: 100 }}
                  >
                    <button className="btn border-dark-subtle p-0 mt-2 position-relative">
                      <img
                        src="/public/icons/amenities/bedroomAndLaundary/air-conditioner.png"
                        className="img-thumbnail border-0"
                        style={{
                          width: 70,
                          height: 70,
                          objectFit: "scale-down",
                        }}
                      />
                      <button
                        className="btn p-0 mb-auto position-absolute"
                        style={{ top: -14, right: -8 }}
                      >
                        <img src="/icons/x-circle-fill.svg" alt="" />
                      </button>
                    </button>
                    <p class="fs-6 text-center">Cleaning</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold" for="description">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                placeholder="About this space"
                required
              ></textarea>
              <div className="valid-feedback">Looks Good!</div>
            </div>
            <Button
              btnType="submit"
              title="Add Location"
              btnBg="btn-success"
              btnW="100"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLocForm;
