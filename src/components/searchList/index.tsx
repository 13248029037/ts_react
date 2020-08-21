import React, { useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import style from "./index.less";
import { IProps, PartialIConfigListItem } from "./index.interface";
export type IConfigListItem = PartialIConfigListItem;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const SearchList: React.SFC<IProps> = (props) => {
  const { configList = [] } = props;
  const [form] = Form.useForm();
  const clearForm = () => {
    form.resetFields();
    if (props.clearForm) {
      props.clearForm();
    }
  };
  const searchForm = async () => {
    const value = await form.getFieldsValue();
    console.info(value, "vvdsvsv");
    if (props.searchForm) {
      props.searchForm({
        ...value,
      });
    }
  };
  useEffect(() => {
    const data = {};
    configList.map((item) => {
      if (item.defaultValue && item.tag) {
        data[item.value] = item.defaultValue;
      }
      return null;
    });
    form.setFieldsValue({
      ...data,
    });
    // eslint-disable-next-line
  }, []);
  return (
    <Form
      form={form}
      layout="inline"
      className={style["ant-advanced-search-form"]}
    >
      {!!configList.length ? (
        <Row>
          {configList.map((item) => (
            <Col span={3} key={item.id} className={style["ant-form-item"]}>
              {item.tag === "select" && (
                <Form.Item
                  name={item.value}
                  label={<div className={style.label}>{item.label}</div>}
                >
                  <Select
                    showSearch={true}
                    allowClear={true}
                    placeholder={item.placeholder}
                    style={{ width: 200, ...item.style }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {(item.optionList || []).map((option) => (
                      <Option
                        key={option[item.optionIndex || "name"]}
                        value={option[item.optionIndex || "name"]}
                      >
                        {option.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              {item.tag === "input" && (
                <Form.Item
                  name={item.value}
                  label={<div className={style.label}>{item.label}</div>}
                >
                  <Input
                    autoComplete="off"
                    allowClear={true}
                    placeholder={item.placeholder}
                    style={{ width: 200, ...item.style }}
                  />
                </Form.Item>
              )}
              {item.tag === "inputnumber" && (
                <Form.Item
                  name={item.value}
                  label={<div className={style.label}>{item.label}</div>}
                >
                  <InputNumber
                    placeholder={item.placeholder}
                    style={{ width: 200, ...item.style }}
                  />
                </Form.Item>
              )}
              {item.tag === "date" && (
                <Form.Item
                  name={item.value}
                  label={<div className={style.label}>{item.label}</div>}
                >
                  <RangePicker
                    autoComplete="off"
                    inputReadOnly={true}
                    style={{ width: 300, ...item.style }}
                  />
                </Form.Item>
              )}
              {item.tag === "time" && (
                <Form.Item
                  name={item.value}
                  label={<div className={style.label}>{item.label}</div>}
                >
                  <TimePicker
                    autoComplete="off"
                    inputReadOnly={true}
                    style={{ width: 200, ...item.style }}
                  />
                </Form.Item>
              )}
            </Col>
          ))}
          <Col className={style["ant-form-item"]}>
            <Form.Item>
              <div>
                <Button onClick={searchForm} type="primary">
                  查询
                </Button>
                <Button onClick={clearForm} style={{ marginLeft: 10 }}>
                  清空
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      ) : null}
    </Form>
  );
};
export default SearchList;
