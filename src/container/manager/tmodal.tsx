import React from "react";
import { Form, Modal, Select } from "antd";
import { departments } from "@/config";

interface IProps {
  modalVisible: boolean;
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
  form.setFieldsValue({
    teamName: undefined,
  });
  const { modalVisible } = props;
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      props.handleOk({
        teamName: values.teamName,
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
      title="更改所属团队"
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item
          {...formItemLayout}
          name="teamName"
          label="所属团队"
          rules={[
            {
              required: true,
              message: "请选择所属团队",
            },
          ]}
        >
          <Select
            placeholder={"请选择所属团队"}
            allowClear={true}
            showSearch={true}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Object.keys(departments).map((item) => (
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
