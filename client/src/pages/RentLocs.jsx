import { Outlet } from "react-router-dom";
import PropertyCard from "../components/UI/PropertyCard";
import SearchBar from "../components/UI/SearchBar";
import LocDetails from "../components/LocDetail";
import "../css/rentlocs.css";

export default function RentLocs() {
  return (
    <div>
      {/* <header className="position-relative">
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
                <button className="btn btn-dark fs-5 rounded-pill d-flex align-items-center shadow">
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
                <button className="btn btn-dark fs-5 rounded-pill d-flex align-items-center shadow">
                  <img
                    src={`/public/icons/sortBy.png`}
                    alt=""
                    className="me-3"
                    style={{ width: 30, height: 30, objectFit: "cover" }}
                  />
                  <p className="mb-0 fs-6 fw-semibold">Sort-By</p>
                </button>
              </div>
            </div>
            <div className="col">
              <div className="container-fluid">
                <div className="row row-cols-4">
                  <PropertyCard />
                  <PropertyCard />
                  <PropertyCard />
                  <PropertyCard />
                  <PropertyCard />
                  <PropertyCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      <Outlet>
        <LocDetails />
      </Outlet>
      </div>
  );
}
