import { useDispatch, useSelector } from "react-redux";
import DateInputBox from "./UI/DateInputBox";
import { rentItActions } from "../store/rentIt-slice";
import { curfmt } from "../utils/formatter";

function RentItForm({ guestsCap, bookedDates, price }) {
  const { totalGuests, startDate, endDate, stayDuration, totalRent, errs } =
    useSelector((state) => state.rentItData);
  const dispatch = useDispatch();

  function submitRentDetails() {
    let err = {};
    if (totalGuests === null) {
      err["guest"] = "Select No of Guests";
    }
    if (startDate === "" || endDate === "") {
      err["dates"] = "Select stay dates";
    }
    if (Object.entries(err).length > 0) {
      dispatch(rentItActions.updErrStt({ err }));
      return;
    }
    dispatch(rentItActions.updErrStt({ err }));
}

  return (
    <>
      <div className="row p-0">
        <div className="col p-0 ">
          <div className=" w-100">
            <div className="d-flex mx-0 align-items-end justify-content-center">
              <p className="fs-4 fw-semibold text-decoration-underline">
                {!curfmt.format(totalRent).includes("₹0")
                  ? curfmt.format(totalRent)
                  : curfmt.format(price)}
              </p>
              <p className="fs-6 fw-medium text-muted ms-1">/ night</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col p-0">
          <div className="d-flex p-0 text-center row ">
            <DateInputBox
              disDates={bookedDates}
              rentPrice={price}
              err={errs["dates"]}
            />
            <div className="col rounded-5  p-0 my-2 mx-1">
              <div className="dropdown-center my-2">
                <button
                  className=" btn fw-semibold dropdown-toggle w-75 border-bottom"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {totalGuests === null
                    ? "Guests"
                    : totalGuests > 1
                    ? `${totalGuests} Guests`
                    : "1 Guest"}
                </button>
                <ul className="dropdown-menu w-75">
                  {Array.from({ length: guestsCap }).map((_, i) => (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(rentItActions.setGstVal({ val: i + 1 }));
                        }}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
                {errs?.guest && (
                  <p className="fs-6 text-danger">{errs["guest"]}</p>
                )}
              </div>
              <div>
                <button
                  onClick={submitRentDetails}
                  type="submit"
                  className="btn btn-primary w-75 fw-bold rounded-pill my-3 border-bottom"
                >
                  Rent-IT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RentItForm;
