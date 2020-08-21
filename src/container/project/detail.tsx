import React, { useEffect, useState } from "react";
import style from "./detail.less";
import Bar from "@/components/bar";
import { Table, Button, Popover, message, Menu, Dropdown } from "antd";
import { IWorkflow } from "@/interface/workflow.interface";
import { ISetting } from "@/interface/setting.interface";
import { inject, observer } from "mobx-react";
import { getQueryString } from "@/utils/function";
import { Spin } from "antd";
import {
  CodeSandboxOutlined,
  DeploymentUnitOutlined,
  PlusOutlined,
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { RouteComponentProps } from "react-router";
import { runStatus } from "@/config";
import DeleteModal from "@/components/deletemodal";
import Appinfomodal from "./appinfomodal";
import Link from "@/components/link";
import eventEmiter from "@/utils/eventEmiter";
import { eventEmitterType } from "@/enum";
import { withRouter } from "react-router-dom";
import { sleep } from "@/utils/function";
interface IProps {
  workflow?: IWorkflow;
  setting?: ISetting;
}
const ProjectDetail: React.SFC<IProps & RouteComponentProps> = (props) => {
  const { appinfo } = props.workflow;
  const listcicdjob = () => {
    return props.workflow.listcicdjob({
      project_id: getQueryString("projectId"),
      pageNo: 1,
      pageSize: 1000000,
      noLoading: true,
    });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [appinfovisible, setAppinfovisible] = useState(false);
  const [itemTemp, setItemTemp] = useState(null);
  const [pipeline_name, setPipeline_name] = useState("");

  interface Ires {
    token: string;
  }
  useEffect(() => {
    props.workflow.workFlowList = [];
    listcicdjob();
    //定义是否重新自动获取数据和websocket相关联
    eventEmiter.on(eventEmitterType.reloadcicd, listcicdjob);
    return () => {
      eventEmiter.off(eventEmitterType.reloadcicd);
    };
    // eslint-disable-next-line
  }, []);
  const gotoRight = (item) => {
    props.history.push(
      `/project/list/right?project_id=${item.project_id}&pipeline_name=${item.pipeline_name}`
    );
  };
  const lookCurrent = (item) => {
    const url = `/project/list/workflow/loglist?project_id=${item.project_id}&pipeline_name=${item.pipeline_name}&current=true`;
    window.open(url);
  };
  const gotohistory = (item) => {
    const url = `/project/list/workflow/loglist?project_id=${item.project_id}&pipeline_name=${item.pipeline_name}`;
    props.history.push(url);
  };
  const handleCancel = () => {
    setModalVisible(false);
    setAppinfovisible(false);
  };
  const handleOk = async () => {
    await deleteOne(itemTemp);
    setModalVisible(false);
  };
  const setDeleteConfirm = (item) => {
    setItemTemp(item);
    setModalVisible(true);
  };
  const editOne = (item) => {
    props.history.push(
      `/project/list/workflow/create?project_id=${getQueryString(
        "projectId"
      )}&workFlow=${item.pipeline_name}&pipeline_id=${item.pipeline_id}`
    );
  };
  const deleteOne = async (item) => {
    let tag = await props.workflow.deletecicdjob({
      project_id: item.project_id,
      pipeline_name: item.pipeline_name,
      id: item.pipeline_id,
    });
    if (tag) {
      listcicdjob();
    }
  };
  const createWorkFlow = () => {
    props.history.push(
      `/project/list/workflow/create?project_id=${getQueryString("projectId")}`
    );
  };
  const run = async (item, tag) => {
    const operation = [
      props.workflow.canaryruncicdjob,
      props.workflow.runcicdjob,
    ];
    await operation[tag - 1]({
      pipeline_name: item.pipeline_name,
      project_id: item.project_id,
      id: item.id,
    });
    // await listcicdjob();
  };
  const gotoAppInfo = async (item) => {
    setItemTemp(item);
    setPipeline_name(item.pipeline_name);
    const tag = await props.workflow.getappinfo({
      pipeline_name: item.pipeline_name,
      project_id: item.project_id,
      id: item.pipeline_id,
    });
    if (tag) {
      setAppinfovisible(true);
    }
  };
  const stopcicdjob = async (item) => {
    const tag: boolean = await props.workflow.stopcicdjob({
      pipeline_name: item.pipeline_name,
      project_id: item.project_id,
      id: item.id,
    });
    if (tag) {
      message.success("解锁成功");
      listcicdjob();
    }
  };
  const replicas = async (type, value) => {
    let tag = false;
    switch (type) {
      case 1: //base副本
      case 2: //canary副本
        tag = await props.workflow.replicas({
          pipeline_name: itemTemp.pipeline_name,
          project_id: itemTemp.project_id,
          replicas: {
            type: type.toString(),
            count: value,
          },
        });
        break;
      case 3:
        tag = await props.workflow.canaryPercent({
          pipeline_name: itemTemp.pipeline_name,
          project_id: itemTemp.project_id,
          canaryweight: value,
        });
        break;
      case 4:
        tag = await props.workflow.baseupdateimage({
          pipeline_name: itemTemp.pipeline_name,
          project_id: itemTemp.project_id,
          baseimage: value,
        });
        break;
      case 5:
        gotoAppInfo(itemTemp);
        return;
    }
    if (tag) {
      message.success("设置成功，实际最终生成的结果可能会有一定的延迟");
      await sleep(1000);
      gotoAppInfo(itemTemp);
    }
  };
  const createMenu = (item) => {
    return (
      <Menu>
        <Menu.Item>
          <span className={style.edit} onClick={() => run(item, 2)}>
            全量发布
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className={style.edit} onClick={() => gotoRight(item)}>
            权限设置
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className={style.edit} onClick={() => gotohistory(item)}>
            历史构建日志
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className={style.edit} onClick={() => editOne(item)}>
            <EditOutlined />
            编辑
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className={style.delete} onClick={() => setDeleteConfirm(item)}>
            <DeleteOutlined />
            删除
          </span>
        </Menu.Item>
      </Menu>
    );
  };
  const columns = [
    {
      title: "工作流名称",
      width: 160,
      render: (item) => (
        <div>
          <DeploymentUnitOutlined
            style={{ fontSize: 16, color: "#0997F7", paddingRight: 10 }}
          />
          <Popover
            content={
              <div>
                <p>创建人：{item.create_user}</p>
                <p>创建时间：{item.update_time}</p>
                <p>点击查看容器信息</p>
              </div>
            }
          >
            <span>
              <Link
                style={{ fontWeight: "bold" }}
                text={item.pipeline_name}
                onClick={() => gotoAppInfo(item)}
              />
            </span>
          </Popover>
        </div>
      ),
    },
    {
      title: "最近一次运行状态",
      width: 200,
      render: (item) => (
        <div>
          {item.nowstatus === 1 ? (
            <span>
              <Popover content="查看当前构建日志">
                <span className={style.look} onClick={() => lookCurrent(item)}>
                  <Link text="查看" />
                </span>
              </Popover>
              <Spin style={{ marginLeft: 50 }} size="small" />
            </span>
          ) : (
            <span
              style={{
                color:
                  item.nowstatus &&
                  item.nowstatus !== 2 &&
                  item.nowstatus !== 5 &&
                  "red",
              }}
            >
              {runStatus[item.nowstatus] || "运行成功"}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "创建人",
      dataIndex: "create_user",
      width: 100,
    },
    {
      title: "操作",
      width: 200,
      render: (item) => (
        <div>
          {item.nowstatus !== 1 ? (
            <span>
              <span
                className={style.edit}
                onClick={() => run(item, 1)}
                style={{ marginRight: 10 }}
              >
                canary发布
              </span>
              <Dropdown overlay={createMenu(item)} placement="bottomCenter">
                <span className={style.edit}>
                  更多操作 <DownOutlined />
                </span>
              </Dropdown>
            </span>
          ) : (
            <span className={style.edit} onClick={() => stopcicdjob(item)}>
              解锁
            </span>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className={style.container}>
      <h3 className={style.project}>
        <CodeSandboxOutlined
          style={{ fontSize: 20, color: "#0997F7", paddingRight: 10 }}
        />
        <span style={{ fontSize: 14 }}>项目:</span>
        <span style={{ fontSize: 24, paddingLeft: 4 }}>
          {getQueryString("projectId")}
        </span>
      </h3>
      <div className={style.workflow}>
        <Bar title="工作流" />
        <Button
          onClick={createWorkFlow}
          type="primary"
          className={style["create-workflow"]}
          icon={<PlusOutlined />}
        >
          创建工作流
        </Button>
      </div>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={props.workflow.workFlowList}
        pagination={false}
      />
      <DeleteModal
        title="删除工作流"
        modalVisible={modalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
      <Appinfomodal
        pipeline_name={pipeline_name}
        project_id={getQueryString("projectId") || ""}
        appinfo={appinfo}
        appinfovisible={appinfovisible}
        handleCancel={handleCancel}
        replicas={replicas}
      />
    </div>
  );
};
export default withRouter(inject("workflow")(observer(ProjectDetail)));
