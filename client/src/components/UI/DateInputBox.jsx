import { DatePicker, Space } from "antd";
import dayjs from 'dayjs'


const { RangePicker } = DatePicker;
function DateInputBox({disDates}) {
  const onDateSele = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Space direction="horizontal" size={12}>
            <RangePicker
              className="p-2 border-dark border-2"
              onChange={onDateSele}
              minDate={dayjs()}
              maxDate={dayjs().add(30,'day')}
            />
          </Space>
        </div>
      </div>
    </div>
  );
}
export default DateInputBox;
