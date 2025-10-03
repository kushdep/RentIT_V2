import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  getPaymentsInfo } from "../store/profile-slice";
import { curfmt } from "../utils/formatter";

function PaymentsInfo() {
  const { payments } = useSelector((state) => state.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if(payments.length==0){
        const token = localStorage.getItem("token");
        dispatch(getPaymentsInfo(token));
    }
  }, []);

  console.log(payments);
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-around">
        {payments.length !== 0 ? payments.map((e)=>
          <div
            className="col-5 card text-bg-transparent mb-3 p-0 me-2"
          >
            <div className="card-header d-flex justify-content-between bg-dark text-light">
                <p className="">Receipt No #{e.receiptNo}</p>
                <p className={e.status==='SUCCESS'?'badge text-bg-success':(e.status==='PENDING'?'badge text-bg-info':'badge text-bg-danger')}>{e.status}</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Amount - {curfmt.format(e.amount/100)}</h5>
              <p className="card-text">Payment_id - {e.razorpay_payment_id}</p>
            </div>
              <div className="card-footer p-0">
              <p className="text-center text-muted">{new Date(e.createdAt).toISOString().slice(0,10) + " "+ "("+new Date(e.createdAt).toLocaleTimeString()+")"}</p>

              </div>
          </div>
        ) : (
          <div className="text-center">
            <img src="/public/icons/empty-folder.png" className="" />
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default PaymentsInfo;
