import { useDispatch, useSelector } from "react-redux";
import DateInputBox from "./UI/DateInputBox";
import { rentItActions } from "../store/rentIt-slice";
import { curfmt } from "../utils/formatter";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function RentItForm({ guestsCap, bookedDates, price }) {
  const { totalGuests, startDate, endDate, totalRent, errs } = useSelector(
    (state) => state.rentItData
  );
  const { token, isAuthenticated } = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locId } = useParams();

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
    const amount = totalRent * 100;
    const body = {
      amount,
      startDate,
      endDate,
      locId,
    };
    let toastId;
    let res;
    try {
      res = await axios.post(
        "http://localhost:3000/profile/payment",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toastId = toast.loading("Processing");
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.response.status === 422) {
        toast.error("Try again later");
      }
      if (error.response.status === 502) {
        toast.error("BAD GATEWAY");
      }
      if (error.response.status === 500) {
        toast.error("Something went wrong");
      }
      if (error.response.status === 400) {
        toast.error("Dates Are not available");
      }
      return;
    }
    console.log(res);
    const scriptLoadRes = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!scriptLoadRes) {
      toast.error("BAD GATEWAY!");
      return;
    }
    const options = {
      key: res.data.data.razorKey,
      amount: amount,
      currency: "INR",
      name: "Rent-IT",
      logo: "/public/images/logo.png",
      description: "Test Transaction",
      order_id: res.data.data.orderId,
      method: {
        emi: false,
        netbanking: false,
        wallet: false,
        paylater: false,
      },
      modal: {
        ondismiss: async function () {
          try {
            const body = { paymentId: res.data.data.paymentId };
            const failedRes = await fetch(
              "http://localhost:3000/profile/payment-failed",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
              }
            );
            const result = await failedRes.json();
            if (!result.success) {
              toast.error("Something went wrong");
              return;
            }
            toast.error("Payment failed");
          } catch (err) {
            console.error(err);
            toast.error("Error updating payment status");
          }
        },
        backdropclose: false,
      },
      handler: async function (response) {
        const payload = {
          paymentId: res.data.data.paymentId,
          bookingId: res.data.data.bookingId,
          startDate,
          endDate,
          locId,
        };

        const body = { ...payload, ...response };
        const verifyRes = await fetch(
          "http://localhost:3000/profile/payment-success",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          }
        );
        const result = await verifyRes.json();

        if (result.success) {
          toast.success("Payment completed successfully!");
          dispatch(rentItActions.clearStateData({isDone:true}));
        } else {
          toast.error("Payment verification failed!");
        }
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    toast.dismiss(toastId);
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
