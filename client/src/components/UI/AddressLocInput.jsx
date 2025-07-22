import { useActionState, useState } from "react";
import { regionalCode } from "../../config";
import googleValidateAdderss from "../../utils/addressValidation";

function AddressLocInput() {
  const [addFormStt, setAddFormStt] = useState(false);
  const [formState, formAcn] = useActionState(action, {
    regionCode: "IN",
    administrativeArea: "",
    locality: "",
    sublocality: "",
    postalCode: "",
    addressLines: [],
  });

  async function action(currentState, formData) {
    const administrativeArea = formData.get("state");
    const postalCode = formData.get("postalCode");
    const locality = formData.get("locality");
    const subLocality = formData.get("subLocality");
    const address1 = formData.get("addressOne");
    const address2 = formData.get("addressTwo");

    const addressLines = [];
    addressLines.push(address1, address2);
    const addState = {
      address: {
        regionCode: "IN",
        administrativeArea,
        locality,
        postalCode,
        addressLines,
      },
    };

    await googleValidateAdderss(addState);

    console.log(addState);
  }
  return (
    <>
      {addFormStt ? (
        <button
          className="btn btn-outline-primary p-1 mx-2 h-50 w-50"
          onClick={() => setAddFormStt(true)}
        >
          Add Location
        </button>
      ) : (
        <form action={formAcn}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div class="container text-center">
                  <div class="row row-cols-2">
                    <div class="col">
                      <div className="d-flex">
                        <div
                          className="form-floating w-25"
                          style={{ marginRight: 10 }}
                        >
                          <select
                            className="form-select"
                            id="floatingSelect"
                            disabled
                            aria-label="Floating label select example"
                          >
                            <option value="0">IN</option>
                          </select>
                          <label htmlFor="floatingSelect">Country</label>
                        </div>
                        <div class="form-floating w-75">
                          <select
                            className="form-select"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                            name="state"
                          >
                            <option value="0">Choose your state</option>
                            {regionalCode.map((e) => {
                              return <option value={e.code}>{e.state}</option>;
                            })}
                          </select>
                          <label htmlFor="floatingSelect">State*</label>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Postal Code"
                          name="postalCode"
                        />
                        <label htmlFor="floatingInput">Postal Code*</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Locality"
                          name="locality"
                        />
                        <label htmlFor="floatingInput">Locality</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Sub-Locality"
                          name="subLocality"
                        />
                        <label htmlFor="floatingInput">Sub-locality</label>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="Address Line 1 *"
                        name="addressOne"
                      />
                      <label htmlFor="floatingInput">Address Line 1 *</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="Address Line 2"
                        name="addressTwo"
                      />
                      <label htmlFor="floatingInput">Address Line 2</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-25 mx-3">
                  Validate
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
export default AddressLocInput;
