import { useRef, useState } from "react";
import { createPortal } from "react-dom";

function ShowAllPhotos({ reference, allPhotos }) {
  const [img, setImg] = useState(null);
  const singlePhotoModal = useRef();

  return createPortal(
    <>
      <dialog
        ref={singlePhotoModal}
        className="rounded-4 shadow-lg border-0"
        style={{
          minWidth: "50%",
          minHeight: "50%",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <form method="dialog" className="p-0 m-0">
          <button
            type="submit"
            className="btn-close position-absolute"
            aria-label="Close"
          ></button>
        </form>
        <img src={`${img}`}  />
      </dialog>
      <dialog
        ref={reference}
        className="rounded-4 shadow-lg border-0"
        style={{
          minWidth: "100%",
          minHeight: "100%",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-1">
              <form method="dialog" className="p-0 m-0">
                <button
                  type="submit"
                  className="btn-close position-absolute"
                  aria-label="Close"
                ></button>
              </form>
            </div>
            <div className="col text-center">
              <h1 className="fs-1">All Photos</h1>
            </div>
          </div>
          {allPhotos.length > 0 ? (
            allPhotos.map((e) => {
              console.log(e);
              return (
                <div className="row mt-4">
                  <div className="col-4">
                    <p className="fs-4 sticky-top">{e.title}</p>
                  </div>
                  <div className="col-8">
                    <div className="container">
                      <div className="row-cols-2">
                        {e.images.map((i) => {
                          return (
                            <div className="col">
                              <img
                                className="w-75"
                                src={`${i.url}`}
                                onClick={() => {
                                  if(i.url!==null && i.url!=='' ){
                                    singlePhotoModal.current.showModal();
                                    setImg(i.url);
                                  }
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8">
                <img className="p-0" src="/public/icons/empty-folder.png" />
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>,
    document.getElementById("modal-root")
  );
}

export default ShowAllPhotos;
