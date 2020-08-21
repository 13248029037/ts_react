import React, { useState, useEffect } from "react";
import style from "./index.less";
import Bar from "@/components/bar";
import { Form, Select, Table, Button, message } from "antd";
import { IRights } from "@/interface/rights.interface";
import { inject, observer } from "mobx-react";
import { getQueryString } from "@/utils/function";
import { PlusOutlined } from "@ant-design/icons";
import MySelect from "@/components/usersearchselect";
import DeleteModal from "@/components/deletemodal";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 10 },
};
interface IProps {
  style?: object;
  title?: string;
  rights: IRights;
}
const protocolEnum = ["admin", "guest"];
const Rights: React.SFC<IProps> = (props) => {
  const pipeline_name = getQueryString("pipeline_name");
  const project_id = getQueryString("project_id");
  const [isProject] = useState(!pipeline_name);
  const [isrequest, setIsrequest] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemTemp, setItem] = useState(null);

  const [form] = Form.useForm();
  form.setFieldsValue({
    projectId: getQueryString("project_id"),
  });
  const deleteOne = (item) => {
    setModalVisible(true);
    setItem(item);
  };
  const onAdd = async () => {
    try {
      setIsrequest(true);
      const values = await form.validateFields();
      const tag: boolean = await props.rights.roleSet({
        resource_type: isProject ? "project" : "pipeline",
        user_name: values.user_name,
        role_name: values.role_name,
        pipeline_name,
        project_id,
      });
      if (tag) {
        form.setFieldsValue({
          user_name: undefined,
          role_name: undefined,
        });
        userRolesearch();
        message.success("操作成功");
        setIsrequest(false);
      }
    } catch (error) {
      console.info(error);
      setIsrequest(false);
    }
  };
  const columns = [
    {
      title: "用户名",
      dataIndex: "user_name",
      width: 100,
    },
    {
      title: "角色",
      dataIndex: "role_name",
      width: 100,
    },
    {
      title: "操作",
      width: 200,
      render: (item) => (
        <div>
          <span className={style.delete} onClick={() => deleteOne(item)}>
            删除
          </span>
        </div>
      ),
    },
  ];
  const userRolesearch = () => {
    props.rights.userRolesearch({
      resource_type: isProject ? "project" : "pipeline",
      pipeline_name,
      project_id,
    });
  };
  const clearData = () => {
    props.rights.tableList = [];
  };
  const deleteRole = async () => {
    const tag: boolean = await props.rights.deleteRole({
      resource_type: isProject ? "project" : "pipeline",
      user_name: itemTemp.user_name,
      role_name: itemTemp.role_name,
      pipeline_name,
      project_id,
    });
    if (tag) {
      message.success("删除成功");
      setModalVisible(false);
      userRolesearch();
    }
  };
  useEffect(() => {
    clearData();
    userRolesearch();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.container} style={props.style}>
      <Form form={form} name="dynamic_rule">
        <Bar
          title={`${
            isProject ? "项目：" + project_id : "工作流：" + pipeline_name
          } 权限配置`}
        />
        <Form.Item
          {...formItemLayout}
          name="user_name"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <MySelect style={{ width: 400 }} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="role_name"
          label="角色"
          rules={[
            {
              required: true,
              message: "请选择角色",
            },
          ]}
        >
          <Select
            style={{ width: 400 }}
            placeholder={"请选择角色"}
            allowClear={true}
          >
            {protocolEnum.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            disabled={isrequest}
            icon={<PlusOutlined />}
            type="primary"
            onClick={onAdd}
            loading={isrequest}
          >
            添加
          </Button>
        </Form.Item>
        <Table
          rowKey={(record) => record.user_name}
          columns={columns}
          pagination={false}
          dataSource={props.rights.tableList}
        />
      </Form>
      <DeleteModal
        title={"删除用户"}
        modalVisible={modalVisible}
        handleOk={() => deleteRole()}
        handleCancel={() => setModalVisible(false)}
      />
    </div>
  );
};
export default inject("rights")(observer(Rights));
