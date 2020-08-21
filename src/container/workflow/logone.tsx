import React, { useState, useEffect } from "react";
import style from "./logone.less";
import Bar from "@/components/bar";
import { IWorkflow } from "@/interface/workflow.interface";
import { ISetting } from "@/interface/setting.interface";
import { IGettaskrunpodRes } from "@/interface/workflow.interface";
import { inject, observer } from "mobx-react";
import { getQueryString, fetchRequest } from "@/utils/function";
import { CodeSandboxOutlined, FullscreenOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";
import Showlog from "@/components/showlog";
import moment from "moment";
import { Button } from "antd";
import { sleep } from "@/utils/function";
import Link from "@/components/link";
interface IProps {
  workflow?: IWorkflow;
  setting?: ISetting;
}
interface IRes {
  code: number;
}
let timer = null;
let outTimer = null;
let project_token = "";
const Logone: React.SFC<IProps & RouteComponentProps> = (props) => {
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState(Date.now());
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    getToken();
    //五分钟自动停止
    if (getQueryString("pop_name")) {
      outTimer = setTimeout(() => {
        clearInterval(timer);
      }, 5 * 60 * 1000);
    }
    return () => {
      clearInterval(timer);
      clearTimeout(outTimer);
    };
    // eslint-disable-next-line
  }, []);
  const getToken = async () => {
    project_token = await props.workflow.queryproject({
      project_id: getQueryString("project_id"),
      isApp: !!getQueryString("pop_name"),
    });
    if (getQueryString("pop_name")) {
      await onlineLogApp();
      timer = setInterval(async () => {
        await onlineLogApp();
        setTime(Date.now());
      }, 5000);
    } else {
      await gettaskrunpod();
    }
  };
  const gettaskrunpod = async () => {
    let res: IGettaskrunpodRes = await props.workflow.gettaskrunpod({
      id: getQueryString("id"),
      project_id: getQueryString("project_id"),
      pipeline_name: getQueryString("pipeline_name"),
    });
    await pipelineHistoryLog(res);
  };
  //工作流日志
  const pipelineHistoryLog = async (res) => {
    for (let container of res.stepName || []) {
      const url = `https://devops-hub.tutorabc.com.cn/k8s/api/v1/namespaces/${
        getQueryString("project_id") + "-tektoncd"
      }/pods/${
        res.podName
      }/log?pretty=true&follow=true&container=${container}&tailLines=1000`;
      let logresult = await fetchRequest(url, project_token);
      if (logresult.status === 400) {
        await sleep(2000);
        pipelineHistoryLog(res);
        return;
      }
      const log = await logresult.text();
      setMsg((lastMsg) => lastMsg + log);
      setTime(Date.now());
    }
  };
  const onlineLogApp = async () => {
    //容器实时日志
    const url = `https://devops-hub.tutorabc.com.cn/k8s/api/v1/namespaces/${getQueryString(
      "project_id"
    )}/pods/${getQueryString(
      "pop_name"
    )}/log?pretty=true&container=${getQueryString(
      "pipeline_name"
    )}&tailLines=200`;
    let res = await fetchRequest(url, project_token);
    if (res) {
      const log = await res.text();
      setMsg(log);
    }
  };
  const showlogOnload = (dom: HTMLElement) => {
    setCurrent(dom);
  };
  const onClickFullScreen = () => {
    current.requestFullscreen();
  };
  const gotoProject = () => {
    props.history.push(
      `/project/list/detail?projectId=${getQueryString("project_id")}`
    );
  };
  return (
    <div className={style.container}>
      <h3 className={style.projectlogtitle}>
        <CodeSandboxOutlined
          style={{ fontSize: 20, color: "#0997F7", paddingRight: 10 }}
        />
        <span style={{ fontSize: 14 }}>项目:</span>
        <span style={{ fontSize: 24, paddingLeft: 4 }}>
          <Link
            text={getQueryString("project_id")}
            onClick={() => gotoProject()}
          />
        </span>
      </h3>
      {getQueryString("pop_name") ? (
        <Bar title={`容器(${getQueryString("pop_name")})构建日志...`} />
      ) : (
        <Bar title={`工作流(${getQueryString("pipeline_name")})构建日志...`} />
      )}
      <p style={{ paddingLeft: 10, marginBottom: 6 }}>
        <span style={{ color: "orange" }}>日志更新最新至 : </span>
        {` ${moment(time).format("YYYY-MM-DD HH:mm:ss")}`}
      </p>
      <Button
        className={style.button}
        type="link"
        icon={<FullscreenOutlined />}
        onClick={onClickFullScreen}
      >
        全屏展示
      </Button>
      <Showlog content={msg} onload={showlogOnload} />
    </div>
  );
};
export default inject("workflow")(observer(Logone));
