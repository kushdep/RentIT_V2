import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../../store/addLoc-slice";

function getURLs(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    console.log(reader.result);
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

const AddImagesInputBox = forwardRef(({ rmInpBox, ipBoxVal, ind }, ref) => {
  // const [title, setTitle] = useState("");
  // const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const imag = useSelector((state) => state.addLocData.imgTtlData);
  const title = useSelector((state) => state.addLocData.imgTtlData.title);

  // useImperativeHandle(ref, () => ({
  //   getValues: () => ({
  //     title,
  //     images,
  //   }),
  // }));

  async function setImageUrls(e) {
    console.log(e);
    const Files = Array.from(e.target.files);
    const imagesURLs = await Promise.all(Files.map(getURLs));
    console.log(imagesURLs);

    dispatch(addLocActions.addImgFiles({ file: inpFile[0], index: ind }));

    e.target.values = "";
  }

  // function delImg(ind) {
  //   setImages((prev) => {
  //     const newSttImg = prev.filter((e, i) => (i !== ind ? e : ""));
  //     return newSttImg;
  //   });
  // }

  console.log(imag);

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
                onClick={() => {
                  rmInpBox((prev) => prev - 1);
                  dispatch(addLocActions.delImgInput({ ind }));
                }}
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
            // defaultValue={ipBoxVal?.title}
            onChange={(e) =>
              dispatch(
                addLocActions.addFilesTtl({
                  filesTtl: e.target.value,
                  index: ind,
                })
              )
            }
            required
          />
          <div className="my-3">
            <div className="d-flex justify-content-start">
              {imag?.images?.map((ele, i) => (
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
                    onClick={() => delImg(imgIn)}
                  >
                    <img src="/icons/x-circle.svg" alt="" />
                  </button>
                </div>
              ))}
              {
                <div className="position-relative d-inline-block">
                  <button className="btn border">
                    <input
                      type="file"
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      onInput={(e) => {
                        const inpFile = Array.from(e.target.files);
                        dispatch(
                          addLocActions.addImgFiles({
                            file: inpFile[0],
                            index: ind,
                          })
                        );
                      }}
                    />
                    <img src="/icons/plus-lg.svg" className="mb-1" />
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default AddImagesInputBox;
