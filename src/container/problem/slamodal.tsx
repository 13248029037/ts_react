import React, { useEffect, useState } from "react";
import { Form, Modal, DatePicker, Button, message, Select } from "antd";
import { ISlaModalProps } from "@/interface/problem.interface";
import { Line } from "@ant-design/charts";
import moment from "moment";
import { dataType } from "@/config";
const { RangePicker } = DatePicker;
const Option = Select.Option;
const SlaModal: React.SFC<ISlaModalProps> = (props) => {
  const {
    type = [],
    dept = [],
    level = [],
    burning = [],
  } = props.listSlaList || {
    type: [],
    dept: [],
    level: [],
    burning: [],
  };
  const [width, setWidth] = useState(1200);
  const [form] = Form.useForm();
  const { modalVisible } = props;
  const onSearch = async () => {
    try {
      const { date, version } = await form.validateFields();
      if (!date) {
        message.error("请输入时间");
        return;
      }
      const start_time =
        date && moment(date[0]).format("YYYY-MM-DD") + " 00:00:00";
      const end_time =
        date && moment(date[1]).format("YYYY-MM-DD") + " 23:59:59";
      console.info(start_time, end_time);
      props.onSearch({
        start_time,
        end_time,
        version,
      });
    } catch (errorInfo) {
      return false;
    }
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  const onClear = () => {
    form.resetFields();
    form.setFieldsValue({
      version: 2,
    });
  };
  const scareTo = () => {
    setWidth(width + 400);
  };
  const reduce = () => {
    if (width !== 1200) {
      setWidth(width - 400);
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      version: 2,
    });
    // eslint-disable-next-line
  }, []);
  const configLine = {
    title: {
      visible: true,
      text: "事件数量部门分布图",
    },
    padding: "auto",
    forceFit: true,
    data: dept,
    xField: "dept_name",
    yField: "count",
    label: {
      visible: true,
      type: "point",
    },
    point: {
      visible: true,
      size: 2,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#2593fc",
        lineWidth: 2,
      },
    },
  };
  return (
    <Modal
      destroyOnClose={true}
      title={"查询数据报表"}
      visible={modalVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
      width={width}
    >
      <Form form={form} layout="inline">
        <Form.Item name={"version"} label={"数据类型"}>
          <Select
            showSearch={true}
            allowClear={true}
            placeholder={"请选择数据类型"}
            style={{ width: 200 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {(dataType || []).map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={"date"} label={"日期"}>
          <RangePicker
            autoComplete="off"
            inputReadOnly={true}
            style={{ width: 250 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={onSearch}>
            查询
          </Button>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={onClear}>
            清空
          </Button>
          <Button type="link" style={{ marginLeft: 10 }} onClick={scareTo}>
            放大
          </Button>
          <Button type="link" onClick={reduce}>
            缩小
          </Button>
        </Form.Item>
      </Form>
      {!!dept.length && (
        <Line
          {...configLine}
          title={{
            visible: true,
            text: "系统可用率部门分布图(百分比)",
          }}
          data={dept}
          xField="dept_name"
          yField="sla"
          color="#7849AF"
          point={{
            visible: true,
            size: 2,
            shape: "pointer",
            style: {
              fill: "white",
              stroke: "#7E33CC",
              lineWidth: 2,
            },
          }}
        />
      )}
      {!!dept.length && (
        <Line
          {...configLine}
          title={{
            visible: true,
            text: "事件不可用时长部门分布图(分钟)",
          }}
          data={dept}
          xField="dept_name"
          yField="burning_time_sum"
          color="#9849AF"
          point={{
            visible: true,
            size: 2,
            shape: "pointer",
            style: {
              fill: "white",
              stroke: "#9849AF",
              lineWidth: 2,
            },
          }}
        />
      )}
      {!!dept.length && <Line {...configLine} />}
      {!!dept.length && (
        <Line
          {...configLine}
          title={{
            visible: true,
            text: "事件影响时长段数量分布图",
          }}
          data={burning}
          xField="name"
          yField="count"
          color="#C849AF"
          point={{
            visible: true,
            size: 2,
            shape: "pointer",
            style: {
              fill: "white",
              stroke: "#C849AF",
              lineWidth: 2,
            },
          }}
        />
      )}
      {!!dept.length && (
        <Line
          {...configLine}
          title={{
            visible: true,
            text: "事件类型数量分布图",
          }}
          data={type}
          xField="type_name"
          yField="count"
          color="#DD9222"
          point={{
            visible: true,
            size: 2,
            shape: "pointer",
            style: {
              fill: "white",
              stroke: "#DD9222",
              lineWidth: 2,
            },
          }}
        />
      )}
      {!!dept.length && (
        <Line
          {...configLine}
          title={{
            visible: true,
            text: "事件等级数量分布图",
          }}
          data={level}
          xField="level_name"
          yField="count"
          color="#29cae4"
          point={{
            visible: true,
            size: 2,
            shape: "triangle",
            style: {
              fill: "white",
              stroke: "#22DDB8",
              lineWidth: 2,
            },
          }}
        />
      )}
    </Modal>
  );
};
export default SlaModal;
