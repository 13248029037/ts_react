import React from "react";
import style from "./index.less";
import { Form, Input, Button, Checkbox } from "antd";
import logo from "src/asset/logo.svg";
import { observer, inject } from "mobx-react";
import { Iprops } from "src/interface/login.interface";
import { getQueryString, encryptionData } from "@/utils/function";
import eventEmiter from "@/utils/eventEmiter";
import { eventEmitterType } from "@/enum";
const Login: React.SFC<Iprops> = (props) => {
  const onFinish = async (values) => {
    let tag = await props.login.userLogin({
      user_name: values.username,
      user_pswd: encryptionData(values.password),
      type: "account",
    });
    if (tag) {
      eventEmiter.emit(
        eventEmitterType.redirect,
        getQueryString("redirect") || "/"
      );
      eventEmiter.emit(eventEmitterType.getCurrentUser);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={style.container}>
      <div className={style.form}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: 350 }}
        >
          <div className={style.title}>
            <Form.Item>
              <h1>
                <img alt="xxx" src={logo} />
                xxxxxxxxxxx
              </h1>
              <p style={{ marginTop: 10 }}>xxxxxxxxxxxxxxx</p>
            </Form.Item>
          </div>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input style={{ height: 40 }} placeholder="username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input
              type="password"
              style={{ height: 40 }}
              placeholder="password"
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: 40 }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default inject("login")(observer(Login));
