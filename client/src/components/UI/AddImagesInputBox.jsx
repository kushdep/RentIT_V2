function AddImagesInputBox({ rmInpBox, imgState, setITStt, ipBoxVal }) {
  console.log(ipBoxVal.images.length)
  
  return (
    <>
      <div className="row border p-2 mb-2">
        <div className="col p-2">
          <div className="d-flex justify-content-between ">
            <label className="form-label fw-semibold" htmlFor="title">
              Add Images & title
            </label>
            <button
              type="button"
              className="btn btn-sm fw-bold"
              onClick={() => rmInpBox((prev) => prev - 1)}
            >
              <img src="/icons/trash.svg" />
            </button>
          </div>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            defaultValue={ipBoxVal.title}
            required
          />
          <div className="my-3">
            <input
              className="form-control mb-3"
              type="file"
              id="formFileMultiple"
              multiple
              disabled={ipBoxVal.images.length > 4 ? true : false}
            />
            {ipBoxVal.images.map((ele) => (
              <img
                src={ele}
                className="img-thumbnail me-2"
                style={{ width: 50 }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddImagesInputBox;
