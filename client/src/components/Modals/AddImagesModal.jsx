import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddImagesInputBox from "../UI/AddImagesInputBox";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../../store/addLoc-slice";

function AddImagesModal({ children, reference }) {
  const [addImInBxstt, setAddImInBxStt] = useState(1);
  const [imgData, setImgDataStt] = useState([
    {
      title: "",
      images: [{}],
    },
  ]);
  const childRefs = useRef([]);

  const dispatch = useDispatch();

  function addImgTtlData() {
    setImgDataStt((prev) => {
      const newData = childRefs.current.map((ref) => ref.current?.getValues());
      console.log("All Child Component Data:", newData);
      return [...newData];
    });
  }

  console.log(imgData);

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
          {Array.from({ length: addImInBxstt }).map((e, i) => {
            if (!childRefs.current[i]) {
              childRefs.current[i] = React.createRef();
            }

            return (
              <AddImagesInputBox
                key={i}
                ind={i}
                ipBoxVal={e}
                rmInpBox={setAddImInBxStt}
                ref={childRefs.current[i]}
              />
            );
          })}
          <div className="row d-flex justify-content-center">
            <div className="col-5">
              {addImInBxstt < 5 && (
                <button
                  className="btn w-100 border mb-3 d-flex justify-content-center"
                  onClick={() => setAddImInBxStt((prev) => prev + 1)}
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
