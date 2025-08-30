import axios from "axios";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function VerifyProp() {
  const { profile } = useSelector((state) => state.profileData);
  const [formStt, formFn, isPending] = useActionState(submitId, {
    id: null,
    name: profile.username || null,
    errs: [],
  });
  const { token } = useSelector((state) => state.authData);
  const [isVerified, setIsVerified] = useState(false);

  async function submitId(prevStt, formData) {
    const id = formData.get("id");
    const name = formData.get("name");
    const navigate = useNavigate();

    console.log(id);
    console.log(name);
    let err = [];
    if (id === "" || name === "") {
      toast.error("Please Enter Valid Credentials");
      return {
        errs: {
          message: "Invalid Credentials",
        },
      };
    }

    if (id !== "" && id.length === 10) {
      const regex = /^[A-Z]{5}[0-4]{4}[A-Z]$/;
      const result = regex.test(id);
      if (!result) {
        err.push({ message: "Invalid PAN Number" });
      }
    } else {
      err.push({ message: "Invalid PAN Number" });
    }

    if (err.length > 0) {
      return {
        errs: err,
      };
    }

    let body = { id, name };
    const response = await axios.post(
      "http://localhost:3000/profile/propertier-verification",
      body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200 && response.data.success) {
      toast.success("PAN Verified");
      setIsVerified(true);
    }

    if(response.status === 400){
        const {message} = response.data
        toast.error(message)
        return {
            ...prevStt,
            id,
            name,
            errs:[]
        }
    }

  }
  console.log(formStt);

  return (
    <div className="container vh-100 ">
      <div className="row-cols-1 h-50  mt-5">
        {!isVerified ? (
          <>
            <div className="col  d-flex justify-content-center">
              <div className="fs-2 fw-bold">
                <div className="p-0 text-center">
                  <img src="/public/images/verify.png" className="w-50 h-75" />
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center">
              <form action={formFn} className="w-50 text-center">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="name"
                    placeholder="username"
                    defaultValue={profile.username}
                    value={formStt?.name}
                  />
                  <label htmlFor="username">Name mentioned on your PAN *</label>
                </div>
                <div class="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="idNumber"
                    name="id"
                    placeholder="idNumber"
                    value={formStt?.idProof}
                  />
                  <label htmlFor="idNumber">PAN Number *</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-50 fs-5 shadow"
                  disabled={isPending}
                >
                  {formStt.errs.length === 0 && isPending
                    ? "Verifying..."
                    : "Verify"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="col  d-flex justify-content-center">
              <div className="fs-2 fw-bold">
                <div className="p-0 text-center h-25">
                  <img
                    src="/public/images/verified.png"
                    className="h-75"
                  />
                  <div className="">
                  <p className="fs-3">VERIFIED!!<br/><span className="fs-5 fw-light">Now You are a Verified Propertier On</span><span> RENT-IT</span>
                  <p className="fw-lighter">Check Your Email for further Instructions.</p></p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyProp;
