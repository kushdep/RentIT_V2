import { useActionState, useState } from "react";

function EditProfileForm() {
    const [isEditing,setIsEditing] = useState(false)
  const [formStt, formAcn, isPending] = useActionState(handleEditing, {
  });
  function handleEditing(prevState, formData) {
    
  }

  function handleEditStt(){
    setIsEditing((prev)=>!prev)
  }

  return (
    <form action={formAcn}>
      <div class="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Username</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">ID-Proof</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="Number"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Phone No</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="Number"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Other Phone No</label>
      </div>
      <button className="btn btn-primary me-2" type={isEditing?"submit":"button"} onClick={handleEditStt}>
        {isEditing ? (isPending ? "Submitting..." : "Submit") : "Edit"}
      </button>
      {isEditing && (
        <button className="btn btn-dark" type="button" onClick={handleEditStt}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EditProfileForm;
