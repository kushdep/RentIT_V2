import { useDispatch, useSelector } from "react-redux";
import DateInputBox from "./UI/DateInputBox";
import { rentItActions } from "../store/rentIt-slice";
import { curfmt } from "../utils/formatter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function RentItForm({ guestsCap, bookedDates, price }) {
  const { totalGuests, startDate, endDate, totalRent, errs } = useSelector(
    (state) => state.rentItData
  );
  const { token, isAuthenticated } = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {locId} = useParams()
 
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function submitRentDetails() {
    let err = {};
    if (totalGuests === null) {
      err["guest"] = "Select No of Guests";
    }
    if (startDate === "" || endDate === "") {
      err["dates"] = "Select stay dates";
    }
    if (Object.entries(err).length > 0) {
      dispatch(rentItActions.updErrStt({ err }));
      return;
    }
    dispatch(rentItActions.updErrStt({ err }));
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const body = {
      amount: totalRent,
      startDate,
      endDate,
      locId,
    };

    const res = await axios.post("http://localhost:3000/profile/payment", body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.success) {
      if (res.status === 422) {
        toast.error("Try again later");
      }
      toast.error("Something went wrong");
      return;
    }
    const scriptLoadRes = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!scriptLoadRes) {
      toast.error("BAD GATEWAY!");
      return;
    }
    const options = {
      key: res.razorKey,
      amount: totalRent,
      currency: "INR",
      name: "Rent-IT",
      description: "Test Transaction",
      order_id: res.orderId,
      handler: async function (response) {
        const payload = {
          paymentId:res.paymentId,
          locId
        }

        const body = {...payload,...response}
        const verifyRes = await fetch("http://localhost:3000/profile/payment-success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await verifyRes.json();

        if (result.success) {
          toast.success("Payment completed successfully!");
        } else {
          toast.error("Payment verification failed!");
        }
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <div className="row p-0">
        <div className="col p-0 ">
          <div className=" w-100">
            <div className="d-flex mx-0 align-items-end justify-content-center">
              <p className="fs-4 fw-semibold text-decoration-underline">
                {!curfmt.format(totalRent).includes("₹0")
                  ? curfmt.format(totalRent)
                  : curfmt.format(price)}
              </p>
              <p className="fs-6 fw-medium text-muted ms-1">/ night</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col p-0">
          <div className="d-flex p-0 text-center row ">
            <DateInputBox
              disDates={bookedDates}
              rentPrice={price}
              err={errs["dates"]}
            />
            <div className="col rounded-5  p-0 my-2 mx-1">
              <div className="dropdown-center my-2">
                <button
                  className=" btn fw-semibold dropdown-toggle w-75 border-bottom"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {totalGuests === null
                    ? "Guests"
                    : totalGuests > 1
                    ? `${totalGuests} Guests`
                    : "1 Guest"}
                </button>
                <ul className="dropdown-menu w-75">
                  {Array.from({ length: guestsCap }).map((_, i) => (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(rentItActions.setGstVal({ val: i + 1 }));
                        }}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
                {errs?.guest && (
                  <p className="fs-6 text-danger">{errs["guest"]}</p>
                )}
              </div>
              <div>
                <button
                  onClick={submitRentDetails}
                  type="submit"
                  className="btn btn-primary w-75 fw-bold rounded-pill my-3 border-bottom"
                >
                  Rent-IT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RentItForm;
