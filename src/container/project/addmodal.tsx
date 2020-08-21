import React from "react";
import { Form, Input, Modal } from "antd";
import { IAddModalProps } from "@/interface/project.interface";
const formItemLayout = {
  labelCol: { span: 4, offset: 4 },
  wrapperCol: { span: 12 },
};
const AddModal: React.SFC<IAddModalProps> = (props) => {
  const [form] = Form.useForm();
  const { modalVisible } = props;
  if (!Object.keys(form.getFieldsValue()).length) {
    form.setFieldsValue({
      project_name: props.isEdit ? props.editProjectId : "",
      team: props.isEdit ? props.editTeam : undefined,
    });
  }
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      props.handleOk({
        team: values.team,
        project_name: values.project_name,
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
      forceRender={true}
      destroyOnClose={true}
      title={props.isEdit ? "编辑项目" : "添加项目"}
      visible={modalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} name="dynamic_rule">
        <Form.Item
          {...formItemLayout}
          name="project_name"
          label="项目名称"
          rules={[
            {
              required: true,
              message: "Please input your project name",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                let reg = /^([0-9]|[a-z])*$/;
                if (!reg.test(getFieldValue("project_name"))) {
                  return Promise.reject("只能输入小写字母或者数字");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input
            autoComplete={"off"}
            disabled={props.isEdit}
            placeholder="请输入项目名称"
            allowClear={true}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddModal;
