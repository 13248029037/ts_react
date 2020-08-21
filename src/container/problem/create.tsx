import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import Ueditor from "@/components/ueditor";
import Bar from "@/components/bar";
import Upload from "@/components/uploadoss";
import { withRouter } from "react-router-dom";
import { departments } from "@/config";
import { getQueryString, computedTimeToString } from "@/utils/function";
import BraftEditor from "braft-editor";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Popover,
  InputNumber,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import style from "./index.less";
import Myselect from "@/components/addselect";
import { bugTypeList, levelList, statusList } from "@/config";
import moment from "moment";
import { IProblem } from "@/interface/problem.interface";
import { RouteComponentProps } from "react-router";
const { Option } = Select;
const format = "YYYY-MM-DD HH:mm";
const { TextArea } = Input;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};
const departmentList: string[] = Object.keys(departments);
const managerList = [];
interface IProps {
  problem: IProblem;
}
const CreateProblem: React.SFC<IProps & RouteComponentProps> = (props) => {
  const [fileList, setFileList] = useState([]);
  const [version, setVersion] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    const id = getQueryString("id");
    if (id) {
      queryissue(id);
    }
    // eslint-disable-next-line
  }, []);
  const save = async () => {
    const values = await form.validateFields();
    let tag: boolean = false;
    console.info(values, "vaca");
    const functions = [props.problem.inseretissue, props.problem.updateissue];
    const data = {
      ...values,
      happen_time: values.happen_time
        ? values.happen_time.format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      start_time:
        values.start_time && values.start_time.format("YYYY-MM-DD HH:mm:ss"),
      end_time:
        values.end_time && values.end_time.format("YYYY-MM-DD HH:mm:ss"),
      improvement: values.probleminfo ? values.probleminfo[1] : "",
      improvement_config: values.probleminfo ? values.probleminfo[0] : "",
      id: getQueryString("id"),
      upload_url: fileList,
      version: version || 2,
    };
    if (getQueryString("id")) {
      tag = await functions[1](data);
    } else {
      tag = await functions[0](data);
    }
    if (tag) {
      message.success("操作成功");
      props.history.push("/problem/list");
    }
  };
  const onUpload = (tag: number, item) => {
    switch (tag) {
      case 1:
        if (item) {
          fileList.push(item);
          setFileList([...fileList]);
        }
        break;
      case 2:
        setFileList([...fileList.filter((v) => v !== item)]);
        break;
    }
  };
  const computedTime = () => {
    const s = form.getFieldValue("start_time");
    const e = form.getFieldValue("end_time");
    if (e && s) {
      const result = computedTimeToString(s, e);
      form.setFieldsValue({
        burning_time: result.totalMinutes,
      });
    } else {
      form.setFieldsValue({
        burning_time: "",
      });
    }
  };
  const computedDegree = (count) => {
    let level = null;
    if (count >= 100) {
      level = 1;
    } else if (count >= 10 && count < 100) {
      level = 2;
    } else if (count > 0 && count < 10) {
      level = 3;
    } else if (count === 0) {
      level = 4;
    } else {
      level = 5;
    }
    form.setFieldsValue({
      level: typeof count === "number" ? level : undefined,
    });
  };
  const departmentListOnchange = (v) => {
    form.setFieldsValue({
      leader: departments[v],
    });
  };
  const queryissue = async (id: string) => {
    const tag = await props.problem.queryissue(id);
    const record = props.problem.singleProblem;
    if (tag) {
      form.setFieldsValue({
        ...record,
        happen_time: record.happen_time
          ? moment(record.happen_time)
          : undefined,
        end_time: record.end_time ? moment(record.end_time) : undefined,
        start_time: record.start_time ? moment(record.start_time) : undefined,
        change_level: record.change_level || undefined,
        level: record.level || undefined,
        status: record.status || undefined,
        type: record.type || undefined,
        impact_number: record.level ? record.impact_number : undefined,
        probleminfo: BraftEditor.createEditorState(
          record.improvement_config || record.improvement
        ),
      });
      setFileList(record.upload_url || []);
      setVersion(record.version);
    }
  };
  return (
    <div className={style.container}>
      <Bar title="创建/编辑问题" />
      <Form form={form} {...layout}>
        <Form.Item name="type" label="问题类型">
          <Select placeholder="请选择问题类型" style={{ width: 300 }}>
            {bugTypeList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="问题名称"
          rules={[
            {
              required: true,
              message: "请输入问题名称",
            },
          ]}
        >
          <Input
            autoComplete="off"
            style={{ width: 300 }}
            placeholder="请输入问题名称"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item name="level" label={<span>问题级别</span>}>
          <Select
            style={{ width: 300 }}
            placeholder="问题级别"
            showSearch={true}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear={true}
          >
            {levelList.map((v) => (
              <Option key={v.id} value={v.id}>
                {v.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="burning_time"
          label={
            <span>
              不可用时长(分)
              <Popover content="不可用时长通过输入自动计算得出">
                <QuestionCircleOutlined style={{ marginLeft: 4 }} />
              </Popover>
            </span>
          }
        >
          <Input
            style={{ width: 300, color: "red" }}
            placeholder="不可用时长"
            readOnly={true}
          />
        </Form.Item>
        <Form.Item name="jira_number" label="jira单号">
          <Input
            autoComplete="off"
            style={{ width: 300 }}
            placeholder="请输入jira单号"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item name="happen_time" label="发生日期">
          <DatePicker
            autoComplete="off"
            inputReadOnly={true}
            aria-autocomplete="none"
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item name="start_time" label="问题开始时间">
          <DatePicker
            placeholder="请选择问题开始时间"
            style={{ width: 300 }}
            onChange={computedTime}
            format={format}
            autoComplete="off"
            inputReadOnly={true}
            showTime={true}
          />
        </Form.Item>
        <Form.Item name="end_time" label="问题结束时间">
          <DatePicker
            placeholder="请选择问题结束时间"
            style={{ width: 300 }}
            onChange={computedTime}
            format={format}
            autoComplete="off"
            inputReadOnly={true}
            showTime={true}
          />
        </Form.Item>
        <Form.Item name="impact_number" label="归还">
          <InputNumber
            type="number"
            min={0}
            max={100000000}
            autoComplete="off"
            style={{ width: 300 }}
            placeholder="请输入影响人数"
            onChange={computedDegree}
          />
        </Form.Item>
        <Form.Item name="dept_name" label="部门别">
          <Myselect
            allowClear={true}
            placeholder="请选择部门别"
            style={{ width: 300 }}
            optionList={departmentList}
            onChange={departmentListOnchange}
          />
        </Form.Item>
        <Form.Item name="leader" label="总负责人">
          <Myselect
            allowClear={true}
            placeholder="总负责人"
            style={{ width: 300 }}
            optionList={managerList}
          />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select placeholder="请选择状态" style={{ width: 300 }}>
            {statusList.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="change_comment" label="备注">
          <TextArea style={{ width: 500 }} placeholder="请输入备注" rows={6} />
        </Form.Item>
        <Form.Item name="probleminfo" label="问题描述以及改进方案">
          <Ueditor />
        </Form.Item>
        <Form.Item label="上传附件">
          <Upload onFileChange={onUpload} fileList={fileList} />
        </Form.Item>
        {!getQueryString("isLook") && (
          <Form.Item {...tailLayout}>
            <Button onClick={save} type="primary">
              {getQueryString("id") ? "编辑问题" : "创建问题"}
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
export default withRouter(inject("problem")(observer(CreateProblem)));
