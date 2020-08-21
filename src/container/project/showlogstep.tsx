import React, { useEffect } from "react";
import { IWorkflow } from "@/interface/workflow.interface";
import { IGetcicdinfo } from "@/interface/workflow.interface";
import { inject, observer } from "mobx-react";
import { fetchRequest } from "@/utils/function";
import { sleep } from "@/utils/function";
interface IItem {
  pipeline_name: string;
  project_id: string;
  id: string;
  nowstatus: number;
}
interface IProps {
  workflow?: IWorkflow;
  item: IItem;
  stopRequest: boolean;
  getInfo: (stepName: string[], stepIndex: number) => void;
}
interface IRes {
  code: number;
}
const Test: React.SFC<IProps> = (props) => {
  let allInfo: IGetcicdinfo = null;
  let project_token = "";
  let stepIndex = 0;
  useEffect(() => {
    if (props.item.nowstatus === 1) {
      getToken();
    }
    // eslint-disable-next-line
  }, []);
  const getToken = async () => {
    allInfo = await props.workflow.getcicdinfo({
      pipeline_name: props.item.pipeline_name,
      project_id: props.item.project_id,
      id: props.item.id,
    });
    if (allInfo) {
      project_token = allInfo.jobToken;
      props.getInfo(allInfo.stepName, stepIndex);
      await pipelineHistoryLog({
        stepName: allInfo.stepName,
        podName: allInfo.podname,
      });
    }
  };
  //工作流日志
  const pipelineHistoryLog = async (res) => {
    stepIndex = 0;
    for (let container of res.stepName || []) {
      const url = `https://devops-hub.tutorabc.com.cn/k8s/api/v1/namespaces/${
        props.item.project_id + "-tektoncd"
      }/pods/${res.podName}/log?pretty=true&follow=true&container=${container}`;
      if (props.item.nowstatus === 1 && !props.stopRequest) {
        let logresult = await fetchRequest(url, project_token);
        stepIndex++;
        props.getInfo(res.stepName, stepIndex);
        if (logresult.status === 400 && props.item.nowstatus === 1) {
          await sleep(2000);
          pipelineHistoryLog(res);
          return;
        }
      }
    }
  };
  return <span>{""}</span>;
};
export default inject("workflow")(observer(Test));
