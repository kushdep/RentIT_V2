import { createPortal } from "react-dom";
import AddImagesInputBox from "../InputBoxes/AddImagesInputBox";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../../store/addLoc-slice";

function AddImagesModal({ reference }) {
  const {imgTtlData:imgInpBox,errors} = useSelector((state) => state.addLocData);
  const dispatch = useDispatch();

  function chckFields() {
    try {
      let imgTttlErr = [];
      for (const [ind, val] of imgInpBox.entries()) {
        if (val.title.length < 3 || val.images.length < 1) {
          let message = "";
          if (val.title.length < 3 && val.images.length < 1) {
            message = "Please Enter Title & Add Images";
          }
          else if (val.title.length < 3) {
            message = "Please Enter Valid Title";
          }
          else if (val.images.length < 1) {
            message = "Please Add atleast one image";
          }
          imgTttlErr.push({
            index: ind,
            message,
          });
        }
      }
      console.log(imgTttlErr);
        dispatch(addLocActions.addErr({ key:"imgTtlErr",errFields: imgTttlErr }));
    } catch (error) {
      console.error("Error in chckFields() -" + error);
    }
  }

  return createPortal(
    <dialog ref={reference} className="border-0 w-25 rounded-4">
      <form method="dialog">
        <button
          type="submit"
          className="btn-close mb-3"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={chckFields}
        ></button>
      </form>
      <div className="modal-dialog-scrollable">
        <div className="container border mb-3 rounded-4">
          {imgInpBox.map((e, i) => {
            const message = errors?.imgTtlErr?.find(({index})=>index===i)?.message
            return <AddImagesInputBox key={i} ind={i} err={message}/>;
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
          onClick={chckFields}
        >
          Done
        </button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default AddImagesModal;
