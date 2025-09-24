import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { rentItActions } from "../../store/rentIt-slice";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
const { RangePicker } = DatePicker;

function DateInputBox({ disDates, rentPrice, err }) {
  const dispatch = useDispatch();
  console.log(disDates);
  const { startDate, endDate } = useSelector((state) => state.rentItData);

  function isDatesAvail(dates, oldBookedDates) {
    try {
      const { startDate, endDate } = dates;
      const newStartDate = new Date(startDate).getTime();
      const newEndDate = new Date(endDate).getTime();
      for (const oldDate of oldBookedDates) {
        const oldStartDate = new Date(oldDate.start).getTime();
        const oldEndDate = new Date(oldDate.end).getTime();
        if (newStartDate >= oldEndDate) {
          continue;
        }
        if (
          newStartDate < oldStartDate &&
          newEndDate > oldStartDate &&
          newEndDate < oldEndDate
        ) {
          return false;
        } else if (newStartDate > oldStartDate && newStartDate < oldEndDate) {
          return false;
        } else if (
          newStartDate > oldStartDate &&
          newStartDate < oldEndDate &&
          newEndDate < oldEndDate
        ) {
          return false;
        } else if (newStartDate < oldStartDate && newEndDate > oldEndDate) {
          return false;
        } else if (newStartDate === oldStartDate || newEndDate === oldEndDate) {
          return false;
        }
      }
      return true;
    } catch (error) {
      console.log("Error in isDatesAvail " + error);
      return false;
    }
  }

  function onDateSele(dates, dateString) {
    if (dates) {
      const start = dayjs(dateString[1]);
      const nights = start.diff(dateString[0], "day");

      if (disDates.length > 0) {
        const isAvail = isDatesAvail(
          { startDate: dateString[0], endDate: dateString[1] },
          disDates
        );
        console.log(isAvail);
        if (!isAvail) {
          toast.error("Dates are't available");
          dispatch(rentItActions.clearStateData({isDone:false}));
          return;
        }
      }
      console.log(dateString);

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
              disabledDate={(current) => {
                if (!current) return false;
                return disDates.some((b) => {
                  const start = dayjs(b.start, "YYYY-MM-DD");
                  const end = dayjs(b.end, "YYYY-MM-DD");
                  return current.isBetween(start, end, "day", "()");
                });
              }}
              value={
                startDate !== "" && endDate !== ""
                  ? [dayjs(startDate), dayjs(endDate)]
                  : null
              }
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
