import { createPortal } from "react-dom";
import { Ammentities } from "../../config";

function ShowAmmModal({ reference, facilities }) {
  let availableFac = [];
  let notAvailableFac = [];

  Ammentities.forEach((amm) => {
    const facility = facilities.find(({ id }) => id === amm.id); //get the facilities that are not present

    if (facility) {
      let avOptions = amm.options.filter((f) =>
        facility.ammenities.some(({ id }) => id === f.id)
      );

      let unavOptions = amm.options.filter(
        (f) => !facility.ammenities.some(({ id }) => id === f.id)
      );

      // For available facilities
      availableFac.push({
        ...amm,
        options: avOptions,
      });

      // For not available facilities
      notAvailableFac.push({
        ...amm,
        options: unavOptions,
      });
    } else {
      notAvailableFac.push(amm);
    }
  });

  console.log(JSON.stringify(availableFac));
  console.log(JSON.stringify(notAvailableFac));

  return createPortal(
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
        <div className="mb-3">
          <div className="container">
            {availableFac &&
              availableFac.map((a) => {
                if(a.options.length === 0){
                    return 
                }
                return (
                  <div className="row border rounded-4 mt-3">
                    <h4 className="fw-semibold text-center border-bottom p-2">
                      {a.title}
                    </h4>
                    {a.options.map((o) => {
                      return (
                        <div className="d-flex p-2">
                          <img
                            src={`/public/${o.img}`}
                            className=""
                            alt=""
                            style={{ height: 50, width: 50 }}
                          />
                          <p className="ms-4">{o.name}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

            {notAvailableFac &&
              notAvailableFac.map((u) => {
                if(u.options.length === 0){
                    return 
                }
                return (
                  <div className="row border rounded-4 mt-3">
                    <h4 className="fw-semibold text-center border-bottom p-2">
                       {u.title}
                    </h4>
                    {u.options.map((o) => {
                          return (
                           <div className="d-flex p-2">
                             <img
                               src={`/public/${o.img}`}
                               className=""
                               alt=""
                               style={{ height: 50, width: 50 }}
                             />
                             <p className="ms-4 text-decoration-line-through">{o.name}</p>
                           </div>
                         );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
        <form method="dialog">
          <button
            type="submit"
            className="btn w-100 fw-semibold btn-outline-primary"
          >
            close
          </button>
        </form>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}

export default ShowAmmModal;
