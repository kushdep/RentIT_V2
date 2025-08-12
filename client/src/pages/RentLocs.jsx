import PropertyCard from "../components/UI/PropertyCard";
import SearchBar from "../components/UI/SearchBar";
import "../css/rentlocs.css";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import { curfmt } from "../utils/formatter";
import { useRef } from "react";
import { Slider } from "antd";
import SortAndFilterModal from "../components/Modals/SortAndFilterModal";
import { priceRange } from "../config";

export async function getAllLocLoader() {
  try {
    const response = await axios.get("http://localhost:3000/rent-locs");
    console.log(response);
    if (response.status === 200) {
      const resData = await response.data.data;
      return resData;
    }
    if (response.status === 204) {
      return null;
    }
  } catch (err) {
    if (err?.response?.status === 400) {
      console.log(err?.response?.data?.message);
    }
  }
}

export default function RentLocs() {
  const locData = useRouteLoaderData("rentLocs");
  const sortModalRef = useRef();
  const filterModalRef = useRef();

  return (
    <div>
      <header className="position-relative">
        <div className="page-heading image-fluid">
          <img
            src="/images/rent-locs-homepage.png"
            className="shadow-sm"
            alt=""
          />
          <SearchBar props={{ height: 100, top: 150, right: 390 }} />
        </div>
        <div className="container-fluid mt-3" style={{ height: 1000 }}>
          <div className="row" style={{ height: 500 }}>
            <div className="col-1 sortBtns">
              <div className="sortBtns mt-3">
                <button
                  className="btn btn-dark fs-5 rounded-pill d-flex align-items-center shadow"
                  onClick={() => {
                    filterModalRef.current.showModal();
                  }}
                >
                  <img
                    src={`/public/icons/filter.png`}
                    alt=""
                    className="me-3"
                    style={{ width: 30, height: 30, objectFit: "cover" }}
                  />
                  <p className="mb-0 fw-semibold">filter</p>
                </button>
              </div>

              <div className="sortBtns mt-3">
                <button
                  className="btn btn-dark fs-5 rounded-pill d-flex align-items-center shadow"
                  onClick={() => sortModalRef.current.showModal()}
                >
                  <img
                    src={`/public/icons/sortBy.png`}
                    alt=""
                    className="me-3"
                    style={{ width: 30, height: 30, objectFit: "cover" }}
                  />
                  <p className="mb-0 fs-6 fw-semibold">Sort-By</p>
                </button>
              </div>
              <SortAndFilterModal title="Sort By" reference={sortModalRef}>
                <div className="row">
                  <div className="col">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Ratings"
                        id="Ratings"
                      />
                      <label className="form-check-label" htmlFor="Ratings">
                        Ratings
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Distance"
                        id="Distance"
                      />
                      <label className="form-check-label" htmlFor="Distance">
                        Distance
                      </label>
                    </div>
                    <div className="border rounded-end-pill p-3">
                      <div class="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="NTO"
                        />
                        <label className="form-check-label" htmlFor="exampleRadios1">
                          Newest to Oldest
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios2"
                          value="OTN"
                        />
                        <label className="form-check-label" htmlFor="exampleRadios2">
                          Oldest to Newest
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </SortAndFilterModal>
              <SortAndFilterModal title="Filter" reference={filterModalRef}>
                <div className="row-cols-1">
                  <div className="col p-2">
                    <div className="fs-5 fw-medium">Price</div>
                    <Slider
                      range
                      marks={priceRange}
                      step={null}
                      defaultValue={[0, 50]}
                    />
                  </div>
                  <div className="col p-2">
                    <div className="fs-5 fw-medium">Type</div>
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="A01"
                        id="Appartment"
                      />
                      <label className="form-check-label" htmlFor="Appartment">
                        Appartment
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="V01"
                        id="Villa"
                      />
                      <label className="form-check-label" htmlFor="Villa">
                        Villa
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="P01"
                        id="Pent-House"
                      />
                      <label className="form-check-label" htmlFor="Pent-House">
                        Pent-House
                      </label>
                    </div>
                  </div>
                </div>
              </SortAndFilterModal>
            </div>
            <div className="col">
              <div className="container-fluid">
                <div className="row row-cols-4">
                  {locData.length !== 0 ? (
                    locData.map((e) => {
                      const formattedPrice = curfmt.format(e.locDtl.price * 2);
                      return (
                        <PropertyCard
                          coverImg={e.locDtl?.imgTtlData?.[0]?.images?.[0]?.url}
                          price={formattedPrice}
                          locId={e._id}
                        />
                      );
                    })
                  ) : (
                    <h1 className="text-muted">No Locations to show</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
