import { useActionState, useState } from "react";
import { regionalCode } from "../../config";
import googleValidateAdderss from "../../utils/addressValidation";
import { addLocActions } from "../../store/addLoc-slice";
import { useDispatch } from "react-redux";
import Alert from "@mui/material/Alert";
import toast from "react-hot-toast";
import { getGeocode } from "use-places-autocomplete";

function AddressLocInput({addressVis}) {
  const [addFormStt, setAddFormStt] = useState(false);
  const dispatch = useDispatch();
  const [formState, formAcn, isPending] = useActionState(action, {
    regionCode: "IN",
    administrativeArea: "",
    locality: "",
    sublocality: "",
    postalCode: "",
    addressLines: [],
    errors: [],
  });

  async function action(currentState, formData) {
    const administrativeArea = formData.get("state");
    const postalCode = formData.get("postalCode");
    const locality = formData.get("locality");
    const subLocality = formData.get("subLocality");
    const address1 = formData.get("addressOne");
    const address2 = formData.get("addressTwo");

    const addressLines = [];
    addressLines.push(address1, address2+' '+subLocality);
    const addState = {
      address: {
        regionCode: "IN",
        administrativeArea,
        locality,
        postalCode,
        addressLines,
      },
    };

    currentState.errors = [];

    const res = await googleValidateAdderss(addState);
    console.log("address validation response "+JSON.stringify(res));
    if (res.validation) {
      console.log(res.message);
      toast.success(res.message);
      dispatch(addLocActions.addLocCord({ location: res.data }));
      toast.success("Address Added Succesfull!!");
      addressVis(true)
    } else {
      toast.error(res.message);
      const { suspicious, plausible, missing, invalid } = res.data;
      if (
        (suspicious !== undefined && suspicious !== null) ||
        (plausible !== undefined && plausible !== null)
      ) {
        const suspFeilds = suspicious.length>0 ? suspicious.join(", ") : "";
        console.log(suspFeilds)
        const plauseFeilds = plausible.join(", ");
        console.log(plauseFeilds)
        currentState.errors.push({
          error: `Not able to validate ${suspFeilds.length>0?suspFeilds+',':suspFeilds} ${plauseFeilds}`,
          severity: "error",
        });
        console.log("1 " + JSON.stringify(currentState));
      }

      if (missing !== undefined && missing !== null) {
        const missingFeilds = missing.join(", ");
        currentState.errors.push({
          error: `Please Add ${missingFeilds} feilds`,
          severity: "error",
        });
        console.log("2 " + JSON.stringify(currentState));
      }

      if (invalid !== undefined && invalid !== null) {
        const invalidFeilds = missing.join(", ");
        currentState.errors.push({
          error: ` ${invalidFeilds} are not valid`,
          severity: "error",
        });
        console.log("3 " + JSON.stringify(currentState));
      }
    }

    console.log(currentState);

    console.log(addState);
    return {
      ...currentState,
      ...addState.address,
      sublocality:subLocality
    };
  }
  return (
    <>
      {!addFormStt ? (
        <div className="w-100 text-center">
          <button
            className="btn btn-outline-dark p-1 mx-2 h-50 w-75"
            onClick={() => setAddFormStt(true)}
          >
            Add Location
          </button>
        </div>
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
                          defaultValue={formState?.postalCode}
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
                          defaultValue={formState?.locality}
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
                          defaultValue={formState?.sublocality}
                        />
                        <label htmlFor="floatingInput">Street NO./Sub-locality</label>
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
                        defaultValue={formState?.addressLines?.[0]}
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
                        defaultValue={formState?.addressLines?.[1]}
                      />
                      <label htmlFor="floatingInput">Address Line 2</label>
                    </div>
                  </div>
                </div>
                {
                  <div className="mb-2 mt-2">
                    {formState?.errors.map((e) => (
                      <Alert severity={e.severity}>{e.error}</Alert>
                    ))}
                  </div>
                }
                <button type="submit" className="btn btn-primary w-25 mx-3">
                  {isPending ? "Validating..." : "Validate"}
                </button>
                <button
                  type="submit"
                  className="btn btn-dark w-25 mx-3"
                  onClick={() => setAddFormStt(false)}
                  disabled={isPending}
                >
                  Cancel
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
