import { useActionState } from "react";
import { useParams } from "react-router-dom";

function ContactUsForm({locSpecific,emailId}) {
  const [formStt, formAcn, isPending] = useActionState(submitContactForm, {
    firstName: null,
    lastName: null,
    email: null,
    phoneNo: null,
    message: null,
    errs: [],
  });

  const locId = locSpecific?useParams().locId:null

  async function submitContactForm(prevStt, formData) {
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const phoneNo = formData.get("phoneNo");
    const message = formData.get("message");

    let err = [];
    if (firstName === "") {
      err.push("firstName");
    }

    if (email === " " || !email.includes("@")) {
      err.push("email");
    }

    if (phoneNo === null || phoneNo.length !== 10) {
      err.push("phoneNo");
    }

    if (message === "") {
      err.push("message");
    }

    console.log(err);
    if (err.length > 0) {
      console.log(err);
      return {
        ...prevStt,
        firstName,
        lastName,
        email,
        phoneNo,
        message,
        errs: err,
      };
    }

    


  }


  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row shadow-lg rounded-4 overflow-hidden bg-white">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <img
            src="/public/images/contactUsForm.jpg"
            alt="Building"
            className="w-100 h-100 shadow-lg"
          />
        </div>
        <div className="col-lg-6 p-5">
          <div className="mb-4">
            <h2 className="fw-bold">Let’s Get In Touch.</h2>
            <p className="text-muted">
              Or just reach out manually to{" "}
              <a
                href="mailto:info@Rent-IT.com"
                className="text-decoration-none"
              >
                {emailId}
              </a>
            </p>
          </div>

          <form action={formAcn}>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  value={formStt?.firstName}
                  className="form-control"
                  name="firstname"
                  placeholder="Enter your first name..."
                />
                {formStt?.errs.includes("firstName") && (
                  <p className="fs-6 text-danger">please enter first name</p>
                )}
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formStt?.lastName}
                  name="lastname"
                  placeholder="Enter your last name..."
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formStt?.email}
                placeholder="Enter your email address..."
                // required
              />
              {formStt?.errs.includes("email") && (
                <p className="fs-6 text-danger">please enter email</p>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <div className="input-group">
                <span className="input-group-text rounded-pill-start">+91</span>
                <input
                  type="tel"
                  className="form-control rounded-pill-end"
                  value={formStt?.phoneNo}
                  name="phoneNo"
                  placeholder="(000) 000-0000"
                />
              </div>
              {formStt?.errs.includes("phoneNo") && (
                <p className="fs-6 text-danger">
                  please enter valid contact Number
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                rows="4"
                className="form-control"
                name="message"
                value={formStt?.message}
                placeholder="Enter your main text here..."
              ></textarea>
              {formStt?.errs.includes("message") && (
                <p className="fs-6 text-danger">please enter detailed query</p>
              )}

              <div className="text-end text-muted small">0/300</div>
            </div>

            <button
              className="btn btn-primary fw-semibold fs-5 w-100 py-2 shadow"
              disabled={isPending}
            >
              {isPending ? "Submitting...." : "Submit Form →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsForm;
