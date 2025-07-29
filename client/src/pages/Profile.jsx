import { Outlet } from "react-router-dom";
import "../css/profile.css";

function Profile() {
  return (
    <>
      <div className="container-fluid" style={{ height: 1000 }}>
        <div className="row d-flex d-flex">
          <div className="col-2 sidBar" style={{ height: 1000 }}>
            <div className="container-fluid border border-light p-0">
              <div className="row row-cols-1 border border-info gy-4">
                <div className="col" style={{ height: 50 }}></div>
                <div className="col border border-success text-center">
                    <button className="btn fs-5  text-light">
                      Profile
                    </button>
                </div>  
                <div className="col border border-success text-center">
                    <button className="btn fs-5  text-light">
                      Profile
                    </button>
                </div>  
                <div className="col border border-success text-center">
                    <button className="btn fs-5  text-light">
                      Profile
                    </button>
                </div>  
                <div className="col border border-success text-center">
                    <button className="btn fs-5  text-light">
                      Profile
                    </button>
                </div>  
                <div className="col border border-success text-center">
                    <button className="btn fs-5  text-light">
                      Profile
                    </button>
                </div>  
              </div>
            </div>
          </div>
          <div className="col-10">
            <div className="container">
              <div className="row">
                <div className="col">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
