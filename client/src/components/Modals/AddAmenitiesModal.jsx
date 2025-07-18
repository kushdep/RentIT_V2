import { Ammentities } from "../../config";
import { addLocActions } from "../../store/addLoc-slice";
import { useDispatch, useSelector } from "react-redux";

function AddAmmenitiesModal({ reference, id }) {
  const offAmm = useSelector((state) => state.addLocData.offAmm);
  const mmStt = offAmm.find((e) => e.id === id)?.opt; //got the options array
  const dispatch = useDispatch();
  const clss = "";
  const ammenityData = Ammentities.find((e) => e.id === id);
  console.log(ammenityData);

  return (
    <>
      <dialog ref={reference} className="border-0 w-25 rounded-4">
        <form method="dialog" className="container">
          <div className="row">
            <div className="col-2 d-flex justify-content-center align-items-center">
              <button
                type="submit"
                className="btn-close mb-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </form>
        <div className="col d-flex justify-content-center">
          <p className="fs-4 fw-medium">{ammenityData?.title}</p>
        </div>
        <div className="mb-3">
          <div className="container">
            <div className="row d-flex justify-content-center">
              {ammenityData?.options.map((e, i) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      className="col-6 btn-check"
                      id={e.id}
                      autocomplete="off"
                      checked={
                        mmStt
                          ? mmStt.find((m) => e.id === m.id)
                            ? true
                            : false
                          : false
                      }
                      onChange={(event) =>
                        dispatch(
                          addLocActions.handleAmmOpt({
                            ammId: id,
                            optId: e.id,
                            isChecked: event.target.checked,
                          })
                        )
                      }
                    />
                    {
                      <label
                        className={
                          mmStt
                            ? mmStt.find((m) => e.id === m.id)
                              ? "btn btn-outline-dark rounded-4 p-3 my-2"
                              : "btn p-3 my-2"
                            : "btn p-3 my-2"
                        }
                        htmlFor={e.id}
                      >
                        <img
                          src={`/public/${e.img}`}
                          alt=""
                          className="me-3"
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                        {e.name}
                      </label>
                    }
                    <br></br>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <form method="dialog">
          <button
            type="submit"
            className="btn w-100 fw-semibold btn-outline-primary"
          >
            Done
          </button>
        </form>
      </dialog>
    </>
  );
}

export default AddAmmenitiesModal;
