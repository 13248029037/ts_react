import React, { useState, useEffect } from "react";
import style from "./create.less";
import Bar from "@/components/bar";
import { Form, Input, Select, Table, Button, message, Popover } from "antd";
import AddModal from "./addmodal";
import { IIableData, IWorkflow } from "@/interface/workflow.interface";
import { ISetting } from "@/interface/setting.interface";
import { inject, observer } from "mobx-react";
import { getQueryString } from "@/utils/function";
import { RouteComponentProps } from "react-router";
import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 10 },
};
const tailLayout = {
  wrapperCol: { offset: 3, span: 10 },
};
interface IProps {
  style?: object;
  title?: string;
  workflow: IWorkflow;
  setting: ISetting;
}
const regTrim = /(^\s+)|(\s+$)/g;
const regSplit = /\s+/g;
const protocolEnum = ["http", "tcp"];
const CreateWorkFlow: React.SFC<IProps & RouteComponentProps> = (props) => {
  const columns = [
    {
      title: (
        <span>
          step名称<span style={{ color: "red" }}>*</span>
        </span>
      ),
      dataIndex: "name",
      key: "name",
      width: 160,
    },
    {
      title: <span>step命令参数</span>,
      dataIndex: "args",
      key: "args",
      width: 200,
    },
    {
      title: (
        <span>
          任务镜像<span style={{ color: "red" }}>*</span>
        </span>
      ),
      dataIndex: "image",
      key: "image",
    },
    {
      title: "环境变量",
      dataIndex: "env",
      key: "env",
      width: 200,
    },
    {
      title: "挂载目录",
      dataIndex: "volueMounts",
      key: "volueMounts",
      width: 140,
    },
    {
      title: "操作",
      width: 200,
      render: (item) => (
        <div>
          <span className={style.edit} onClick={() => editOne(item)}>
            编辑
          </span>
          <span className={style.delete} onClick={() => deleteOne(item)}>
            删除
          </span>
        </div>
      ),
    },
  ];
  useEffect(() => {
    async function querycicdjob() {
      if (getQueryString("workFlow")) {
        await props.workflow.querycicdjob({
          pipeline_id: getQueryString("pipeline_id"),
          project_id: getQueryString("project_id"),
          pipeline_name: getQueryString("workFlow"),
        });
        if (props.workflow.workFlowOne) {
          setPipeline_id(props.workflow.workFlowOne.pipeline_id);
        }
        const pipeline_config = JSON.parse(
          props.workflow.workFlowOne.pipeline_config
        );
        const k8sInfo = pipeline_config.k8sInfo;
        const k8sYaml = pipeline_config.k8sYaml;
        const stepFromApi = pipeline_config.steps || [];
        form.setFieldsValue({
          ...k8sInfo,
          ...k8sYaml,
          args:
            k8sYaml.command &&
            (k8sYaml.command || []).join(" ") +
              " " +
              (k8sYaml.args || []).join(" "),
          env: (k8sYaml.env || [])
            .map((item) => `${item.name}=${item.value}`)
            .join(" "),
          volueMounts: (k8sYaml.volueMounts || []).join(" "),
        });
        settSteps(
          stepFromApi.map((node) => ({
            id: randomTag++,
            name: node.name,
            image: node.image,
            args:
              node.command &&
              (node.command || []).join(" ") +
                " " +
                (node.args || []).join(" "),
            volueMounts: (node.volumeMountsTMP || []).join(" "),
            env: (node.env || [])
              .map((item) => `${item.name}=${item.value}`)
              .join(" "),
          }))
        );
      } else {
        form.setFieldsValue({
          gitDockerfile: "/Dockerfile",
          workfolder: "/",
        });
      }
      setRandomTag(randomTag);
    }
    querycicdjob();
    // eslint-disable-next-line
  }, []);
  const [form] = Form.useForm();
  form.setFieldsValue({
    projectId: getQueryString("project_id"),
  });
  const [modalVisible, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [steps, settSteps] = useState([]);
  const [branch, setBranch] = useState([]);
  let [randomTag, setRandomTag] = useState(1);
  let [editItem, setEditItem] = useState(null);
  let [pipeline_id, setPipeline_id] = useState(undefined);
  const deleteOne = (item) => {
    settSteps(steps.filter((v) => v.id !== item.id));
  };
  const editOne = (item) => {
    setIsEdit(true);
    setModal(true);
    setEditItem(item);
  };
  const addOne = () => {
    setModal(true);
    setIsEdit(false);
  };
  const handleOk = (step: IIableData) => {
    if (isEdit) {
      settSteps(
        steps.map((v) => {
          if (v.id === editItem.id) {
            return {
              ...step,
              id: editItem.id,
            };
          }
          return {
            ...v,
          };
        })
      );
    } else {
      steps.push({ id: randomTag, ...step });
      settSteps([...steps]);
      setRandomTag(randomTag + 1);
    }
    setModal(false);
  };
  const handleCancel = () => {
    setModal(false);
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      values.args = values.args && values.args.replace(regTrim, "");
      let params = {
        pipeline_id,
        project_id: values.projectId,
        pipeline_name: String(values.pipelineName),
        pipeline_config: {
          k8sInfo: {
            projectName: String(values.projectId),
            pipelineName: String(values.pipelineName),
            gitRevision: String(values.gitRevision),
            gitURL: String(values.gitURL),
            gitDockerfile: String(values.gitDockerfile),
            workfolder: String(values.workfolder),
          },
          steps: steps.map((v) => {
            v.args = v.args.replace(regTrim, "");
            return {
              name: String(v.name),
              image: String(v.image),
              command: v.args ? [v.args.split(regSplit)[0]] : [],
              args: v.args
                ? v.args
                    .split(regSplit)
                    .map((v2) => String(v2))
                    .slice(1)
                : [],
              volumeMountsTMP: v.volueMounts
                ? v.volueMounts.split(regSplit).map((v3) => String(v3))
                : [],
              env: v.env
                ? v.env.split(regSplit).map((item) => ({
                    name: String(item.split("=")[0]),
                    value: String(item.split("=")[1]),
                  }))
                : [],
            };
          }),
          k8sYaml: {
            containerPort: String(values.containerPort),
            protocol: String(values.protocol),
            command: values.args ? [values.args.split(regSplit)[0]] : [],
            args: values.args
              ? values.args
                  .split(regSplit)
                  .map((v2) => String(v2))
                  .slice(1)
              : [],
            volueMounts: values.volueMounts
              ? values.volueMounts.split(regSplit).map((v4) => String(v4))
              : [],
            env: values.env
              ? values.env.split(regSplit).map((item) => ({
                  name: String(item.split("=")[0]),
                  value: String(item.split("=")[1]),
                }))
              : [],
          },
        },
      };
      //编辑
      let tag: boolean | null = null;
      if (getQueryString("workFlow")) {
        tag = await props.workflow.updatecicdjob(params);
        if (tag) {
          message.success("编辑项目工作流成功");
        }
        props.history.goBack();
        return;
      }
      tag = await props.workflow.inseretcicdjob(params);
      if (tag) {
        message.success("添加项目工作流成功");
        props.history.goBack();
      }
    } catch (errorInfo) {
      return false;
    }
  };
  const gitbranchCheck = async (tag) => {
    const value = form.getFieldValue("gitURL");
    if (!value) {
      message.error("请输入gitUrl");
      return;
    }
    const data = await props.workflow.gitbranchCheck(value);
    if (data) {
      setBranch(data.branch);
      if (tag) {
        message.success("giturl验证成功,请选择代码分支或者tag");
      }
    } else {
      setBranch([]);
      form.setFieldsValue({
        gitURL: "",
        gitRevision: "",
      });
    }
  };
  return (
    <div className={style.container} style={props.style}>
      <h3>项目工作流设置</h3>
      <Form form={form} name="dynamic_rule">
        <Bar title={"基础配置"} />
        <Form.Item
          {...formItemLayout}
          name="projectId"
          label="项目名称"
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
          rules={[
            {
              required: true,
              message: "请输入项目名称",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                let reg = /^([0-9]|[a-z])*$/g;
                if (!reg.test(getFieldValue("projectId"))) {
                  return Promise.reject("只能输入小写字母或者数字");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input
            autoComplete={"off"}
            disabled={true}
            placeholder="请输入项目名称"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="pipelineName"
          label="工作流名称"
          rules={[
            {
              required: true,
              message: "请输入工作流名称",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                let reg = /^([0-9]|[a-z])*$/g;
                if (!reg.test(getFieldValue("pipelineName"))) {
                  return Promise.reject("只能输入小写字母或者数字");
                }
                return Promise.resolve();
              },
            }),
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            disabled={!!getQueryString("workFlow")}
            placeholder="请输入工作流名称"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item className={style.checkbox}>
          <Form.Item
            {...formItemLayout}
            name="gitURL"
            label="代码仓库URL"
            className={style.giturl}
            rules={[
              {
                required: true,
                message: "请输入代码仓库URL",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  let reg = /@/g;
                  if (reg.test(getFieldValue("gitURL"))) {
                    return Promise.reject("只能是http协议下的代码仓库URL");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            getValueFromEvent={(event) => {
              return event.target.value.replace(/\s+/g, "");
            }}
          >
            <Input
              autoComplete={"off"}
              placeholder="请输入http协议下的代码仓库URL"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item {...tailLayout} className={style.checkUrl}>
            <Button
              type="link"
              onClick={gitbranchCheck}
              className={style.checkUrl}
            >
              检验giturl有效性
            </Button>
          </Form.Item>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="gitRevision"
          label="代码分支名"
          rules={[
            {
              required: true,
              message: "请选择代码分支名或者tag",
            },
          ]}
        >
          <Select placeholder={"请选择代码分支或者tag"} allowClear={true}>
            {branch.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="gitDockerfile"
          label="Dockerfile路径"
          rules={[
            {
              required: true,
              message: "请输入Dockerfile路径",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            placeholder="请输入Dockerfile路径,例如/Dockerfile"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="workfolder"
          label={
            <span>
              工作目录{" "}
              <Popover content="默认为/，在CI过程中step命令默认所在的操作路径，如当存在多个子目录时，该参数可指定编译时所在的路径">
                <QuestionCircleOutlined />
              </Popover>
            </span>
          }
          rules={[
            {
              required: true,
              message: "请输入workfolder",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input autoComplete={"off"} placeholder="例如/" allowClear={true} />
        </Form.Item>
        <Bar title={"steps配置"} />
        <Button
          type="primary"
          style={{ position: "absolute", right: 30, marginTop: -50, zIndex: 1 }}
          onClick={() => addOne()}
          icon={<PlusOutlined />}
        >
          添加step
        </Button>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={steps}
          pagination={false}
        />

        <Bar title={"K8s配置"} />
        <Form.Item
          {...formItemLayout}
          name="protocol"
          label="协议"
          rules={[
            {
              required: true,
              message: "请选择协议",
            },
          ]}
        >
          <Select placeholder={"请选择协议"} allowClear={true}>
            {protocolEnum.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="containerPort"
          label="端口"
          rules={[
            {
              required: true,
              message: "请输入端口",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            type="number"
            placeholder="请输入端口"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="args"
          label="命令参数"
          rules={[
            {
              message: "多个命令参数用空格分开，例如clean install",
            },
          ]}
        >
          <Input
            autoComplete={"off"}
            placeholder="多个命令参数用空格分开，例如clean install"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="volueMounts"
          label="挂载目录"
          rules={[
            {
              message: "请输入项目挂载目录",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            autoComplete={"off"}
            placeholder="多个目录用;分开，例/root;/boot"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="env"
          label="环境变量"
          rules={[
            {
              message: "请输入环境变量",
            },
          ]}
          getValueFromEvent={(event) => {
            return event.target.value.replace(/\s+/g, "");
          }}
        >
          <Input
            placeholder="多个环境变量用;分开，例env=stage;region=shanghai"
            allowClear={true}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={save}>
            保存
          </Button>
        </Form.Item>
      </Form>
      <AddModal
        editItem={editItem}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isEdit={isEdit}
        modalVisible={modalVisible}
      />
    </div>
  );
};
export default inject("workflow", "setting")(observer(CreateWorkFlow));
