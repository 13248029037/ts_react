import React from "react";
import style from "./index.less";
import { Button, Form, InputNumber } from "antd";
interface IProps {
  style?: React.CSSProperties;
  confirm: (tag: number, value: number | string) => void;
  relationKey: string;
  label?: string;
  min: number;
  max: number;
  value: number;
  tag: number;
  placeholader?: string;
}
const Myform: React.SFC<IProps> = (props) => {
  const [form] = Form.useForm();
  const {
    label = "设置",
    relationKey,
    min = 0,
    max = 100,
    value,
    tag,
    placeholader = "",
  } = props;
  form.setFieldsValue({
    [relationKey]: value,
  });
  const clearData = () => {
    form.setFieldsValue({
      [relationKey]: value,
    });
  };
  const confirm = async () => {
    try {
      const values = await form.validateFields();
      props.confirm(tag, values[relationKey]);
    } catch (error) {
      console.info(error);
    }
  };
  return (
    <div className={style.container} style={props.style}>
      <Form form={form} layout="inline" className={style.form}>
        <Form.Item
          name={relationKey}
          label={<span className={style.label}>{label}</span>}
          rules={[
            {
              required: true,
              message: label,
            },
          ]}
          colon={false}
        >
          <InputNumber
            style={{ width: 200 }}
            placeholder={`${placeholader}最大为${max}`}
            min={min}
            max={max}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={confirm} type="primary" style={{ marginLeft: 10 }}>
            设置
          </Button>
          <Button onClick={clearData} style={{ marginLeft: 10 }}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Myform;
