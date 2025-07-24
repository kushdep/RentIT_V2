import { createPortal } from "react-dom";
import AddImagesInputBox from "../InputBoxes/AddImagesInputBox";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../../store/addLoc-slice";

function AddImagesModal({ reference }) {
  const imgInpBox = useSelector((state) => state.addLocData.imgTtlData);
  const dispatch = useDispatch();

  return createPortal(
    <dialog ref={reference} className="border-0 w-25 rounded-4">
      <form method="dialog">
        <button
          type="submit"
          className="btn-close mb-3"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </form>
      <div className="modal-dialog-scrollable">
        <div className="container border mb-3 rounded-4">
          {imgInpBox.map((e, i) => {
            return <AddImagesInputBox key={i} ind={i} />;
          })}
          <div className="row d-flex justify-content-center">
            <div className="col-5">
              {imgInpBox.length < 5 && (
                <button
                  className="btn w-100 border mb-3 d-flex justify-content-center"
                  onClick={() => dispatch(addLocActions.addImgTtlNewData())}
                >
                  Add more
                </button>
              )}
            </div>
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
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default AddImagesModal;
