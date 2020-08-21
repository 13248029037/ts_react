import React, { useState, useEffect } from "react";
import style from "./index.less";
import Bar from "@/components/bar";
import { Form, Select, Table, Button, message, Input } from "antd";
import { IManager } from "@/interface/manager.interface";
import { inject, observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import FooterPage from "@/components/footerpage";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 10 },
};
interface IProps {
  manager: IManager;
}
const roleEnum = ["admin", "user"];
const methodsEnum = ["post", "get", "delete", "put"];
const Rights: React.SFC<IProps> = (props) => {
  const [isrequest, setIsrequest] = useState<boolean>(false);
  const [pageSize] = useState<number>(20);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [form] = Form.useForm();
  const onFooterChange = (page_no: number) => {
    setPageIndex(page_no);
    adminRoleList(page_no);
  };
  const onAdd = async () => {
    try {
      setIsrequest(true);
      const values = await form.validateFields();
      const tag: boolean = await props.manager.adminRole({
        role_name: values.role_name,
        resource_object: values.resource_object,
        resource_action: values.resource_action,
      });
      if (tag) {
        form.setFieldsValue({
          role_name: undefined,
          resource_object: undefined,
          resource_action: undefined,
        });
        message.success("操作成功");
        setIsrequest(false);
      }
    } catch (error) {
      console.info(error);
      setIsrequest(false);
    }
  };
  const deleteInterface = async (item) => {
    const tag = await props.manager.adminRoleDelete(item);
    if (tag) {
      adminRoleList(pageIndex);
      message.success("删除成功");
    }
  };
  const columns = [
    {
      title: "角色",
      dataIndex: "role_name",
      width: 100,
    },
    {
      title: "接口",
      dataIndex: "resource_object",
      width: 100,
    },
    {
      title: "方法",
      dataIndex: "resource_action",
      width: 100,
    },
    {
      title: "操作",
      width: 200,
      render: (item) => (
        <div>
          <span className={style.delete} onClick={() => deleteInterface(item)}>
            删除
          </span>
        </div>
      ),
    },
  ];
  useEffect(() => {
    adminRoleList(pageIndex);
    // eslint-disable-next-line
  }, []);
  const adminRoleList = async (page_no: number) => {
    await props.manager.adminRoleList({
      page_no,
      page_size: pageSize,
    });
  };
  return (
    <div className={style.container}>
      <Form form={form}>
        <Bar title="接口权限列表" />
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
            {roleEnum.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="resource_object"
          label="接口名"
          rules={[
            {
              required: true,
              message: "请输入接口名",
            },
          ]}
        >
          <Input
            style={{ width: 400 }}
            allowClear={true}
            placeholder="请输入接口名"
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="resource_action"
          label="接口方法"
          rules={[
            {
              required: true,
              message: "请选择接口方法",
            },
          ]}
        >
          <Select
            style={{ width: 400 }}
            placeholder={"请选择接口方法"}
            allowClear={true}
          >
            {methodsEnum.map((item) => (
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
          rowKey={(record) => record.resource_action + record.resource_object}
          columns={columns}
          pagination={false}
          dataSource={props.manager.interfaceRoleList}
        />
        <FooterPage
          onChange={onFooterChange}
          current={pageIndex}
          pageSize={pageSize}
          total={props.manager.total}
        />
      </Form>
    </div>
  );
};
export default inject("manager")(observer(Rights));
