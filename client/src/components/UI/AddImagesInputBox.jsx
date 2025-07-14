import { useState } from "react";

function AddImagesInputBox({ rmInpBox, imgState, setITStt, ipBoxVal, ind }) {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  function setImageUrls(e) {
    console.log(e);
    setImages((prev) => {
      return [...prev, ...e.target.files];
    });
    e.target.values = "";
  }

  function delImg(ind) {
    setImages((prev) => {
      const newSttImg = prev.filter((e, i) => (i !== ind ? e : ""));
      return newSttImg;
    });
  }

  console.log(images);

  return (
    <>
      <div className="row p-2">
        <div className="col p-2">
          <div className="d-flex justify-content-between ">
            <label className="form-label fw-semibold" htmlFor="title">
              Add Images & title
            </label>
            {ind > 0 && (
              <button
                type="button"
                className="btn btn-sm fw-bold"
                onClick={() => rmInpBox((prev) => prev - 1)}
              >
                <img src="/icons/trash.svg" />
              </button>
            )}
          </div>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            defaultValue={ipBoxVal?.title}
            onChange={() => setTitle(e.target.value)}
            required
          />
          <div className="my-3">
            <input
              className="form-control mb-3"
              type="file"
              id="formFileMultiple"
              onChange={setImageUrls}
              multiple
              maxLength={3}
              disabled={images?.length > 3 ? true : false}
            />
            <div className="d-flex">
              {images?.map((ele, i) => (
                <div className="d-flex position-relative me-2">
                  <img
                    src={ele}
                    key={i}
                    className="img-thumbnail"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                  <button
                    className="btn p-0 mb-auto position-absolute"
                    style={{ top: -15, right: -6 }}
                    onClick={() => delImg(i)}
                  >
                    <img src="/icons/x-circle.svg" alt="" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddImagesInputBox;
