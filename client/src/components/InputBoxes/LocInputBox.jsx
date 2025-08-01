import { useDispatch, useSelector } from "react-redux";
import GoogleMapInput from "./GoogleMapInput";
import AddressLocInput from "./AddressLocInput";
import { addLocActions } from "../../store/addLoc-slice";
import {useState} from 'react'

function LocInputBox() {
  const [showAddress,setShowAddress] = useState(false)
  const locData = useSelector((state) => state.addLocData.locAdd);

  return (
    <>
      <div className="mb-3 border border-2 rounded-4 p-4">
        <label className="form-label fw-semibold" htmlFor="LocName">
          Address
        </label>
        {!showAddress ? (
          <>
            <GoogleMapInput addressVis={setShowAddress}/>
            <div className="container">
              <div className="row">
                <div className="col d-flex row justify-content-center">
                  <div className="d-flex align-items-center my-3 w-50 ">
                    <hr className="flex-grow-1" />
                    <span className="mx-2 text-muted">OR</span>
                    <hr className="flex-grow-1" />
                  </div>
                </div>
              </div>
            </div>
            <AddressLocInput addressVis={setShowAddress}/>
          </>
        ) : (
          <div className="d-flex row">
            <textarea
              className="form-control mt-2 text-muted"
              type="text"
              value={locData?.address}
              disabled={
                locData?.address !== undefined && locData?.address !== null
                  ? true
                  : false
              }
              id="Address"
              rows="3"
              name="Address"
              placeholder="Enter address of your location"
              required
            />
            <button
            onClick={()=>setShowAddress(false)}
            className="btn btn-primary w-25 mt-2">Edit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LocInputBox;
