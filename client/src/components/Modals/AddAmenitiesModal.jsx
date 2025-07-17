import { Ammentities } from "../../config";

function AddAmmenitiesModal({ reference }) {
  return (
    <>
      <dialog ref={reference} className="border-0 w-25 rounded-4">
        <form method="dialog">
          <button
            type="submit"
            className="btn-close mb-3"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </form>
        <div className="mb-3">
          <div className="container">
            <div className="row d-flex justify-content-center">
              {Ammentities[0].options.map((e, i) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      className="col-6 btn-check"
                      id={e.id}
                      autocomplete="off"
                    />
                    <label
                      className="btn btn-outline-dark rounded-4 p-3 my-2"
                      htmlFor={e.id}
                    >
                      {e.name}
                    </label>
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
