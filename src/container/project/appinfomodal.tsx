import React from "react";
import { Modal, Descriptions, Popover, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { IAppinfoModal } from "@/interface/workflow.interface";
import { RouteComponentProps, withRouter } from "react-router";
import Link from "@/components/link";
import SingleForm from "@/components/singleform";
const AppinfoModal: React.SFC<IAppinfoModal & RouteComponentProps> = (
  props
) => {
  const { appinfovisible, appinfo } = props;
  const handleOk = () => {
    props.handleCancel();
  };
  const handleCancel = () => {
    props.handleCancel();
  };
  const gotolog = (popName) => {
    window.open(
      `/project/list/workflow/logone?project_id=${props.project_id}&pipeline_name=${props.pipeline_name}&pop_name=${popName}`
    );
  };
  const link = (linkurl) => {
    window.open(linkurl);
  };
  const confirm = (type, value) => {
    props.replicas(type, value.toString());
  };
  return (
    <Modal
      width={900}
      getContainer={false}
      destroyOnClose={true}
      title="App信息"
      visible={appinfovisible}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender={true}
      closable={false}
    >
      {appinfo && (
        <div>
          <h4 style={{ marginBottom: 10, position: "relative" }}>
            展示信息
            <Button
              type="primary"
              style={{ position: "absolute", right: 0, top: -5 }}
              onClick={() => confirm(4, appinfo.canaryimage)}
            >
              全量发布
            </Button>
            <Button
              type="primary"
              style={{ position: "absolute", left: 80, top: -5 }}
              onClick={() => confirm(5, "")}
            >
              刷新数据
            </Button>
          </h4>
          <Descriptions bordered={true} style={{ marginBottom: 30 }}>
            <Descriptions.Item label="域名">
              <Link
                text={appinfo.domain}
                onClick={() => link(appinfo.domain)}
              />
            </Descriptions.Item>
            <Descriptions.Item span={2} label="git最近提交commitId">
              {appinfo.gitcommitid}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="镜像">
              {appinfo.image}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="容器">
              {(appinfo.podlist || []).map((v) => (
                <Popover key={v} content="点击查看容器实时日志">
                  <span
                    style={{ paddingRight: "15px", display: "inline-block" }}
                  >
                    <Link text={v} onClick={() => gotolog(v)} />
                  </span>
                </Popover>
              ))}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="canary镜像">
              {appinfo.canaryimage}
            </Descriptions.Item>
            <Descriptions.Item span={3} label="canary容器">
              {(appinfo.canarypodlist || []).map((v) => (
                <Popover key={v} content="点击查看canary容器实时日志">
                  <span
                    style={{ paddingRight: "15px", display: "inline-block" }}
                  >
                    <Link text={v} onClick={() => gotolog(v)} />
                  </span>
                </Popover>
              ))}
            </Descriptions.Item>
          </Descriptions>
          <h4>
            操作
            <Popover content="最终操作结果由于容器启动或者关闭等原因会有一定的延迟,如遇数据未及时更新，请手动刷新多次获取最新数据并确认">
              <QuestionCircleOutlined
                style={{
                  fontSize: 14,
                  marginLeft: 4,
                  cursor: "pointer",
                  color: "red",
                }}
              />
            </Popover>
          </h4>
          <SingleForm
            confirm={confirm}
            relationKey="replicas"
            min={0}
            max={10}
            value={appinfo.podreplicas}
            label="base副本数"
            tag={1}
          />
          <SingleForm
            confirm={confirm}
            relationKey="canaryreplicas"
            min={0}
            max={10}
            value={appinfo.canarypodreplicas}
            label="canary副本数"
            tag={2}
          />
          <SingleForm
            confirm={confirm}
            relationKey="datapercent"
            min={0}
            max={100}
            value={appinfo.canaryweight}
            label="canary流量百分比"
            tag={3}
          />
        </div>
      )}
    </Modal>
  );
};
export default withRouter(AppinfoModal);
