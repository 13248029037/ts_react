import React from "react";
import { Form, Modal, Select } from "antd";
import { roleType } from "@/config";
interface IProps {
  modalVisible: boolean;
  role_name: string[];
  handleOk: (data?) => void;
  handleCancel: () => void;
}
const formItemLayout = {
  labelCol: { span: 4, offset: 4 },
  wrapperCol: { span: 12 },
};
const Option = Select.Option;
const AddModal: React.SFC<IProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible } = props;
  form.setFieldsValue({
    role_name: props.role_name,
  });
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      props.handleOk({
        role_name: values.role_name,
      });
    } catch (errorInfo) {
      return false;
    }
    return;
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  return (
    <Modal
      getContainer={false}
      destroyOnClose={true}
      title="赋予角色"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item {...formItemLayout} name="role_name" label="角色">
          <Select mode="multiple" placeholder={"请选择角色"} allowClear={true}>
            {roleType.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddModal;
