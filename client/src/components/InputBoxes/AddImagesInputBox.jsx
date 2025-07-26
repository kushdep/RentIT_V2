import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocActions } from "../../store/addLoc-slice";

function getURLs(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

export function AddImagesInputBox({ ind }) {
  const [resolvedUrls, setResolvedUrls] = useState([]);
  const dispatch = useDispatch();
  const imag = useSelector((state) => state.addLocData.imgTtlData);

  async function addImg(file) {
    async function resolveUrls() {
      const url = await getURLs(file);
      setResolvedUrls((prev) => {
        return [...prev, url];
      });
      return url;
    }
    const res = await resolveUrls();
    return res;
  }

  function delImg(index) {
    setResolvedUrls((prev) => {
      return prev.filter((_, eleIn) => eleIn !== index);
    });
  }

  async function updateInputImg(e) {
    try {
      const inpFile = Array.from(e.target.files);
      const url = await addImg(inpFile[0]);
      dispatch(
        addLocActions.addImgFiles({
          file: url,
          index: ind,
        })
      );
    } catch (error) {
      console.error("Error in updateInputImg()- " + error);
    }
  }

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
              {resolvedUrls.map((ele, i) => {
                return (
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
                      onClick={() => {
                        dispatch(
                          addLocActions.delImgFile({ index: ind, imgIn: i })
                        );
                        delImg(i);
                      }}
                    >
                      <img src="/icons/x-circle.svg" alt="" />
                    </button>
                  </div>
                );
              })}
              {imag[ind]?.images.length < 4 && (
                <div className="position-relative d-inline-block">
                  <button className="btn border">
                    <input
                      type="file"
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      onInput={updateInputImg}
                    />
                    <img src="/icons/plus-lg.svg" className="mb-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddImagesInputBox;
