import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
function DateInputBox() {
  return <Space direction="horizontal" size={12}>
    <RangePicker className='rangePicker p-2 fw-bold' style={{
        border: 'none',
        color: 'black',
        backgroundColor: 'transparent',
      }}/>
  </Space>
}
export default DateInputBox