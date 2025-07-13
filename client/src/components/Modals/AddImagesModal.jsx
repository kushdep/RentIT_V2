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
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="container">
          {imgData.map((e, i) => (
            <AddImagesInputBox
              key={i}
              ipBoxVal={e}
              rmInpBox={setAddImInBxStt}
              imgState={imgData}
              setITStt={setImgDataStt}
            />
          ))}
        </div>
      </div>
      {addImInBxstt < 5 && (
        <button
          className="btn w-100 fw-semibold btn-outline-primary"
          onClick={() => setAddImInBxStt((prev) => prev + 1)}
        >
          Add Images
        </button>
      )}
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default AddImagesModal;
