import React from "react";
import { Form, Input, Select, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { departments } from "@/config";
import style from "./index.less";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};
interface ISlider {
  style?: React.CSSProperties;
  collaps?: boolean;
  search_team: string;
  project_id: string;
  isAdmin?: boolean;
  collapsOnChange?: () => void;
  searchOnchange?: () => void;
  clearAllCondition: () => void;
  onFieldsChange: (value) => void;
  onchangeSearch: () => Promise<boolean>;
}
const Slider: React.SFC<ISlider> = (props) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    search_team: props.search_team,
    project_id: props.project_id,
  });
  const collapsOnChange = () => {
    props.collapsOnChange();
  };
  const clearAllCondition = () => {
    props.clearAllCondition();
  };
  const onFieldsChange = (value, vv) => {
    props.onFieldsChange(vv);
  };
  const onchangeSearch = () => {
    props.onchangeSearch();
  };
  return (
    <div style={props.style}>
      <div
        className={
          props.collaps
            ? style["slider-container"] +
              " " +
              style["slider-container-collaps"]
            : style["slider-container"]
        }
      >
        {!props.collaps && (
          <Form onFieldsChange={onFieldsChange} form={form} name="dynamic_rule">
            <Form.Item {...formItemLayout} name="project_id" label="项目名称">
              <Input
                autoComplete="off"
                placeholder="请输入项目名称"
                allowClear={true}
              />
            </Form.Item>
            {props.isAdmin && (
              <Form.Item
                {...formItemLayout}
                name="search_team"
                label="所属团队"
              >
                <Select
                  placeholder="请选择团队"
                  allowClear={true}
                  showSearch={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Object.keys(departments).map((item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                style={{ marginRight: 10 }}
                onClick={onchangeSearch}
              >
                查询
              </Button>
              <Button style={{ marginRight: 10 }} onClick={clearAllCondition}>
                清空
              </Button>
            </Form.Item>
          </Form>
        )}
        <div className={style.operation} onClick={collapsOnChange}>
          <span>列</span>
          <span>表</span>
          <span>查</span>
          <span>询</span>
          {props.collaps ? <LeftOutlined /> : <RightOutlined />}
        </div>
      </div>
      {!props.collaps && (
        <div onClick={collapsOnChange} className={style["slider-wrap"]}>
          {""}
        </div>
      )}
    </div>
  );
};
export default Slider;
