import React, { useEffect } from "react";
import style from "./loglist.less";
import Bar from "@/components/bar";
import { Table, message } from "antd";
import { IWorkflow } from "@/interface/workflow.interface";
import { ISetting } from "@/interface/setting.interface";
import { inject, observer } from "mobx-react";
import { getQueryString } from "@/utils/function";
import { CodeSandboxOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";
import { runStatus } from "@/config";
import Link from "@/components/link";

interface IProps {
  workflow?: IWorkflow;
  setting?: ISetting;
}
const LogList: React.SFC<IProps & RouteComponentProps> = (props) => {
  const listcicdjobhistory = async () => {
    await props.workflow.listcicdjobhistory({
      project_id: getQueryString("project_id"),
      pipeline_name: getQueryString("pipeline_name"),
    });
    //查看当前日志
    if (getQueryString("current")) {
      let workHistoryList = props.workflow.workHistoryList || [];
      gotoLognone(workHistoryList[0]);
    }
  };
  useEffect(() => {
    listcicdjobhistory();
    // eslint-disable-next-line
  }, []);
  const gotoLognone = (item) => {
    props.history.push(
      `/project/list/workflow/logone?project_id=${item.project_id}&pipeline_name=${item.pipeline_name}&id=${item.id}`
    );
  };
  const rollback = async (item) => {
    const tag = await props.workflow.rollback({
      id: item.id,
      pipeline_name: item.pipeline_name,
      project_id: item.project_id,
    });
    if (tag) {
      message.success("回滚成功");
      listcicdjobhistory();
    }
  };
  const columns = [
    {
      title: "镜像",
      width: 200,
      dataIndex: "image_name",
      render: (value) => <span>{value || "-"}</span>,
    },
    {
      title: "构建状态",
      width: 200,
      render: (item) => (
        <div>
          <span style={{ color: item.build_result_status === 3 ? "red" : "" }}>
            {item.build_result_status === 0
              ? "运行中"
              : runStatus[item.build_result_status]}
          </span>
        </div>
      ),
    },
    {
      title: "构建时间",
      width: 200,
      dataIndex: "build_time",
    },
    {
      title: "构建人",
      width: 80,
      dataIndex: "user",
    },
    {
      title: "操作",
      width: 200,
      render: (item) => (
        <div>
          <Link onClick={() => gotoLognone(item)} text="查看" />
          <Link onClick={() => rollback(item)} text="回滚" />
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
          {getQueryString("project_id")}
        </span>
      </h3>
      <div className={style.workflow}>
        <Bar title={`工作流(${getQueryString("pipeline_name")})构建历史记录`} />
      </div>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={props.workflow.workHistoryList}
        pagination={false}
      />
    </div>
  );
};
export default inject("workflow")(observer(LogList));
