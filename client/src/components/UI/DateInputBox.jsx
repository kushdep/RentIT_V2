import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
function DateInputBox() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Space direction="horizontal" size={12}>
            <RangePicker className="p-2 border-dark border-2" />
          </Space>
        </div>
      </div>
    </div>
  );
}
export default DateInputBox;
