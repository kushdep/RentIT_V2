import { useSelector } from "react-redux";
import AddReview from "../components/AddReview";

function Trips() {
  const { tripsData } = useSelector((state) => state.profileData);

  return (
    <>
      <div className="container">
        {tripsData.trips.length === 0 ? (
          <div className="row">
            <div className="col-6 p-0">
              <div className="card p-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src="/public/images/hall.jpg"
                      className="img-fluid rounded-start w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Last updated 3 mins ago
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col border rounded-4  p-2">
              <AddReview />
            </div>
          </div>
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
