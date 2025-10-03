import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyBookings } from "../store/profile-slice";

function Bookings() {
  const { bookings } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if(bookings.length==0){
        const token = localStorage.getItem("token");
        dispatch(getMyBookings(token));
    }
  }, []);

  console.log(bookings);
  return (
    <>
      <div className="container">
        <div className="row-cols-2">
        {bookings.length !== 0 ? (
          <div
            className="col card text-bg-transparent w-50 mb-3"
          >
            <div className="card-header d-flex justify-content-between bg-dark text-light">
                <p>Header</p>
                <p>Status</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Primary card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card’s content.
              </p>
            </div>
          </div>
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
