import { useDispatch, useSelector } from "react-redux";
import AddReview from "../components/AddReview";
import { useEffect } from "react";
import { getMyTrips } from "../store/profile-slice";
import Reviews from "../components/Reviews";

function Trips() {
  const { tripsData } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getMyTrips(token));
  }, []);

  console.log(tripsData);
  return (
    <>
      <div className="container">
        {tripsData.trips.length > 0 ? (
          tripsData.trips.map((t) => {
            return (
              <div className="row mt-2">
                <div className="col-6 shadow p-0 me-2">
                  <div className="card p-0">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={
                            t?.locationDetails?.locDtl?.imgTtlData[0].images[0]
                              .url
                          }
                          className="img-fluid  p-3"
                        />
                      </div>
                      <div className="col-md-8 p-3 ">
                        <div className="card-body p-0">
                          <h5 className="card-title p-1">
                            {t?.locationDetails?.locDtl?.title}
                          </h5>
                          <div className="text-muted">
                            <p>
                              Stay Duration - {t?.booking.stayDuration}{" "}
                              {t?.booking.stayDuration > 1 ? "Nights" : "Night"}
                              <p>Guests - {t?.booking.totalGuests}</p>
                            </p>
                            <p className="d-flex flex-column">
                              Booking Dates :
                              <small className="text-body-secondary fw-bold">
                                {t?.booking.start + " to " + t?.booking.end}
                              </small>
                            </p>
                          </div>
                            <div
                              className={`w-100 rounded-4 ${
                                t?.booking.checkIn
                                  ? "bg-success bg-gradient"
                                  : "bg-danger bg-gradient"
                              }`}
                            >
                              <p className="fw-bold border-bottom text-light p-2 text-center rounded-4">Check-In</p>
                              <p className="text-light text-center">
                                {t.booking?.checkIn
                                  ? new Date(t.booking.checkIn).toLocaleDateString() +
                                    " At " +
                                    new Date(t.booking.checkIn).toLocaleTimeString()
                                  : "No Check-in"}
                              </p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col border rounded-4 p-2 h-50 shadow">
                  {t.booking?.checkIn ? (
                    !t?.review?.review ? (
                      <AddReview locId={t.locationDetails._id} bkngId={t.booking._id}/>
                    ) : (
                      <Reviews review={t?.review}/>
                    )
                  ) : (
                     <div className="">Cannot Add Review</div>
                   )} 
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <img src="/public/icons/empty-folder.png" className="" />
          </div>
        )}
      </div>
    </>
  );
}

export default Trips;
