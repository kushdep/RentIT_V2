import { useState } from "react";
import { createPortal } from "react-dom";
import AddImagesInputBox from "../UI/AddImagesInputBox";

function AddImagesModal({ children, reference }) {
  const [addImInBxstt, setAddImInBxStt] = useState(1);
  const [imgData, setImgDataStt] = useState([
    {
      title: "",
      images: [],
    },
  ]);
  console.log(addImInBxstt);
  return createPortal(
    <dialog ref={reference} className="border-0">
      <form method="dialog">
        <button
          type="submit"
          className="btn-close mb-3"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </form>
      <div className="modal-dialog-scrollable">
        <div className="container border p-3 mb-3">
          {Array.from({ length: addImInBxstt }).map((e, i) => (
            <AddImagesInputBox
              key={i}
              ind={i}
              ipBoxVal={e}
              rmInpBox={setAddImInBxStt}
              imgState={imgData}
              setITStt={setImgDataStt}
            />
          ))}
          <div className="row d-flex justify-content-center">
            <div className="col-5">
              {addImInBxstt < 5 && (
                <button
                  className="btn w-100 border mb-3 d-flex justify-content-center"
                  onClick={() => setAddImInBxStt((prev) => prev + 1)}
                >
                  <img src="/icons/plus-lg.svg" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="btn w-100 fw-semibold btn-outline-primary">Add</button>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default AddImagesModal;
