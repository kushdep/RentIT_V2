import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyBookings } from "../store/profile-slice";
import { curfmt } from "../utils/formatter";

function Bookings() {
  const { bookings } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookings.length == 0) {
      const token = localStorage.getItem("token");
      dispatch(getMyBookings(token));
    }
  }, []);

  console.log(bookings);
  return (
    <>
      <div className="container-fluid">
        <div className="row row-cols-2 border justify-content-center">
          {bookings.length !== 0 ? (
            bookings.map((e) => (
              <div className="col card text-bg-transparent mb-3 p-0 me-3" style={{maxWidth:"40%"}}>
                <div className="card-header d-flex justify-content-between bg-dark text-light">
                  <p className="">{e.location.locDtl.title}</p>
                  <p
                    className={
                      e.payment.status === "SUCCESS"
                        ? "badge text-bg-success"
                        : e.payment.status === "PENDING"
                        ? "badge text-bg-info"
                        : "badge text-bg-danger"
                    }
                  >
                    Payment - {e.payment.status}
                  </p>
                </div>
                <div className="d-flex">
                  <div className="card-body">
                    <h5 className="card-title text-center fw-bold">Amount </h5>
                    <h5
                      className={
                        e.payment.status === "SUCCESS"
                          ? "text-bg-success shadow rounded-4 p-2 text-center"
                          : "text-bg-danger shadow rounded-4 p-2 text-center"
                      }
                    >
                      {curfmt.format(e.payment.amount / 100)}
                    </h5>
                    <p className="card-text">Total Guests - {e.totalGuests}</p>
                  </div>
                  <div className="card-body">
                    <h5 className="text-muted fs-6">
                      stay -{" "}
                      {new Date(e.start).toLocaleDateString() +
                        " to " +
                        new Date(e.end).toLocaleDateString()}
                    </h5>
                    <p className="card-text">
                      Stay Duration - {e.stayDuration} Nights
                    </p>
                  </div>
                </div>
                <div className="card-footer p-0 ">
                  <p className="text-center text-muted">
                    {new Date(e.createdAt).toISOString().slice(0, 10) +
                      " " +
                      "(" +
                      new Date(e.createdAt).toLocaleTimeString() +
                      ")"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <img src="/public/icons/empty-folder.png" className="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bookings;
