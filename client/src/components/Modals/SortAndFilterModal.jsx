import { createPortal, useFormStatus } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

function SortAndFilterModal({ reference,title,children}) {
  const dispatch = useDispatch();

  return createPortal(
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
        <div className="d-flex justify-content-center">
          <p className="fs-2 fw-medium">{title}</p>
        </div>
        <div className="mb-3">
          <div className="container border rounded-4 p-4">
             {children}
          </div>
        </div>
        
      </dialog>
  ,document.getElementById("modal-root"));
}

export default SortAndFilterModal;
