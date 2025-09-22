import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { rentItActions } from "../../store/rentIt-slice";

const { RangePicker } = DatePicker;
function DateInputBox({ disDates, rentPrice, err }) {
  const dispatch = useDispatch();

  function onDateSele(dates, dateString) {
    if (dates) {
      const start = dayjs(dateString[1]);
      const nights = start.diff(dateString[0], "day");
      dispatch(
        rentItActions.setBookingDates({
          start: dateString[0],
          end: dateString[1],
          duration: nights,
        })
      );
      dispatch(rentItActions.setTotalRent({ totalAmt: rentPrice * nights }));
    } else {
      toast.error("not able to select dates");
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {err && <p className="fs-6 text-danger">{err}</p>}
          <Space direction="horizontal" size={12}>
            <RangePicker
              className="p-2 border-dark border-2"
              onChange={onDateSele}
              minDate={dayjs()}
              maxDate={dayjs().add(30, "day")}
            />
          </Space>
        </div>
      </div>
    </div>
  );
}
export default DateInputBox;
