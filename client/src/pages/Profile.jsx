import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <>
      <div className="container-fluid" style={{ height: 1000 }}>
        <div className="row d-flex d-flex">
          <div
            className="col-2 bg-black mt-3 rounded-top rounded-end"
            style={{ height: 1000 }}
          ></div>
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
