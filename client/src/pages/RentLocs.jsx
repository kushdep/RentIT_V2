import PropertyCard from "../components/UI/PropertyCard";
import SearchBar from "../components/UI/SearchBar";
import "../css/rentlocs.css";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { curfmt } from "../utils/formatter";

export async function getAllLocLoader() {
  try {
    const response = await axios.get("http://localhost:3000/rent-locs");
    console.log(response);
    if (response.status === 200) {
      const resData = await response.data.data;
      console.log(resData);
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
  const locData = useLoaderData();

  console.log(JSON.stringify(locData));

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
                  {locData.length !== 0 ? (
                    locData.map((e) => {
                      console.log("lement " + JSON.stringify(e));
                      const formattedPrice = curfmt.format(e.locDtl.price*2);
                      console.log(formattedPrice)
                      return (
                        <PropertyCard
                          coverImg={e.locDtl?.imgTtlData?.[0]?.images?.[0]?.url}
                          price={formattedPrice}
                        />
                      );
                    })
                  ) : (
                    <h1 className="text-muted">NO Locations to show</h1>
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
