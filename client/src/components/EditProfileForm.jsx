import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../store/profile-slice";

function EditProfileForm({ userProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formStt, formAcn, isPending] = useActionState(handleEditing, {
    username: null,
    address: null,
    contactNo: null,
    othContactNo: null,
    errors: [],
  });
  const {token} = useSelector((state) => state.authData);
  const dispatch = useDispatch();

  async function handleEditing(prevState, formData) {
    if (!isEditing) {
      toast.error("Cannot update Profile Details");
      return;
    }

    const name = formData.get("username");
    const address = formData.get("address");
    const pmryPhNo = formData.get("pmryPhNo");
    const scdnryPhNo = formData.get("scdnryPhNo");

    let err = [];
    let body = {};

    if (name === '') {
      err.push({ message: "Username Cannot be empty" });
    }

    if (pmryPhNo != "" && pmryPhNo !== userProfile.contactNo) {
      if (pmryPhNo.length !== 10) {
        err.push({ message: "Phone No is Invalid" });
      } else {
        body["contactNo"] = pmryPhNo;
      }
    }
    if (scdnryPhNo!=='' && scdnryPhNo!== userProfile.othContactNo) {
      if (pmryPhNo.length !== 10) {
        err.push({ message: "Other Phone No is Invalid" });
      } else {
        body["othContactNo"] = scdnryPhNo;
      }
    }

    if (err.length > 0) {
      err.forEach((e) => toast.error(e.message));
      return {
        errors: err,
      };
    }
    if (name !== userProfile.username) {
      body["username"] = name;
    }


    if (address !== userProfile.address) {
      body["address"] = address;
    }

    const response = await dispatch(setProfileData(token, body));
    if (response.success) {
      toast.success("Profile Updated");
      handleEditStt()
    } else {
      toast.error("cannot be updated");
    }
    return {
      ...prevState,
      ...body
    }
  }

  function handleEditStt() {
    setIsEditing((prev) => !prev);
  }

  return (
    <form action={formAcn}>
      <div class="form-floating mb-3">
        <input
          type="text"
          defaultValue={userProfile?.username}
          value={formStt?.username}
          className="form-control"
          id="floatingInput"
          disabled={!isEditing}
          name="username"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Username*</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          defaultValue={userProfile?.address}
          value={formStt?.address}
          className="form-control"
          id="floatingInput"
          name="address"
          disabled={!isEditing}
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="Number"
          defaultValue={userProfile?.contactNo}
          value={formStt?.prmPhNo}
          disabled={!isEditing}
          className="form-control"
          id="floatingInput"
          name="pmryPhNo"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Phone No</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="Number"
          defaultValue={userProfile?.othContactNo} 
          value={formStt?.sdryPhNo} 
          className="form-control"
          disabled={!isEditing}
          id="floatingInput"
          name="scdnryPhNo"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Other Phone No</label>
      </div>
      {!isEditing ? (
        <button
          className="btn btn-primary me-2 shadow"
          type="button"
          onClick={handleEditStt}
        >
          Edit
        </button>
      ) : (
        <div>
          <button className="btn btn-primary me-2 shadow" type="submit">
            {isPending ? "Submitting..." : "Submit"}
          </button>
          <button
            className="btn btn-dark shadow"
            type="button"
            onClick={handleEditStt}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}

export default EditProfileForm;
