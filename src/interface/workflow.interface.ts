export interface IKeys {
  name: string;
  value: string;
}
export interface IIableData {
  id?: number;
  args: string;
  command: string | string[];
  env: string | IKeys[];
  image: string;
  name: string;
  volueMounts: string | string[];
}
interface IK8sInfo {
  projectName: string;
  pipelineName: string;
  gitRevision: string;
  gitURL: string;
  gitDockerfile: string;
  workfolder: string;
}
interface IK8sYaml {
  containerPort: string;
  env: IKeys[];
  volueMounts: string[];
  protocol: string;
}
interface ISteps {
  name: string;
  image: string;
  command: string[];
  args: string[];
  volumeMountsTMP: string[];
}
interface IPipeline_config {
  k8sInfo: IK8sInfo;
  k8sYaml: IK8sYaml;
  steps: ISteps[];
}
export interface IInseretcicdJob {
  pipeline_id?: string;
  project_id: string;
  create_user?: string;
  update_user?: string;
  pipeline_name: string;
  pipeline_config: IPipeline_config;
}
export interface IListcicdjob {
  project_id: string;
  pageNo: number;
  pageSize: number;
  noLoading: boolean;
}
export interface IWorkListRes {
  data: IWorkListResTable[];
}
export interface IWorkListResTable {
  create_user: string;
  id: string;
  last_failed_build_number: number;
  last_success_build_number: number;
  pipeline_id: string;
  pipeline_name: string;
  pipeline_tmp: string;
  project_id: string;
  remarks: string;
  update_time: string;
  update_user: string;
  pipeline_config: string;
  nowstatus: number;
  stepIndex?: number;
  stepName?: string[];
}
export interface IQuerycicdjob {
  pipeline_id: string;
  project_id: string;
  pipeline_name: string;
}

// cicd
export interface IStatustaskrun {
  taskRunName: string;
  namespace: string;
}
export interface IWorkHistoryTable {
  user: string;
  id: string;
  build_number: number;
  git_hash: string;
  build_time: string;
  build_result_status: number;
  image_name: string;
  pipeline_name: string;
  project_id: string;
  pipeline_id: string;
}
export interface IQueryproject {
  project_id: string;
  isApp?: boolean;
}
export interface IQueryprojectRes {
  project_token: string;
  project_jobtoken: string;
}
export interface IGettaskrunpodRes {
  podName: string;
  stepName: string[];
}
export interface IBaseSearch {
  pipeline_name: string;
  project_id: string;
  id?: string;
}
export interface IAppinfoModal {
  project_id: string;
  pipeline_name: string;
  appinfo: IApresult;
  appinfovisible: boolean;
  handleCancel: () => void;
  replicas: (type: number, replicas: string) => Promise<void>;
}
export interface IApresult {
  domain: string;
  gitcommitid: string;
  image: string;
  canaryimage: string;
  podlist: string[];
  canarypodlist: string[];
  canarypodreplicas: number;
  podreplicas: number;
  canaryweight: number;
}
export interface IGetcicdinfo {
  stepName: string[];
  podname: string;
  jobToken: string;
  token: string;
}
interface IReplicasType {
  type: number;
  count: string;
}
export interface IReplicas {
  pipeline_name: string;
  project_id: string;
  replicas: IReplicasType;
}
export interface ICanaryPercent {
  pipeline_name: string;
  project_id: string;
  canaryweight: string;
}
export interface IBaseupdateimage {
  pipeline_name: string;
  project_id: string;
  baseimage: string;
}
type gitbranchCheck = {
  auth: boolean;
  branch: string[];
};
export interface IWorkflow {
  workFlowList: IWorkListResTable[];
  workHistoryList: IWorkHistoryTable[];
  workFlowOne?: IWorkListResTable;
  appinfo: IApresult;
  inseretcicdjob: (data: IInseretcicdJob) => Promise<boolean>;
  updatecicdjob: (data: IInseretcicdJob) => Promise<boolean>;
  listcicdjob: (data: IListcicdjob) => Promise<boolean>;
  querycicdjob: (data: IQuerycicdjob) => Promise<boolean>;
  runcicdjob: (data: IBaseSearch) => Promise<boolean | string>;
  canaryruncicdjob: (data: IBaseSearch) => Promise<boolean>;
  statustaskrun: (data: IStatustaskrun) => Promise<boolean>;
  listcicdjobhistory: (data: IBaseSearch) => Promise<boolean>;
  queryproject: (data: IQueryproject) => Promise<string>;
  gettaskrunpod: (data: IBaseSearch) => Promise<IGettaskrunpodRes>;
  deletecicdjob: (data: IBaseSearch) => Promise<boolean>;
  getappinfo: (data: IBaseSearch) => Promise<boolean>;
  getcicdinfo: (data: IBaseSearch) => Promise<IGetcicdinfo>;
  stopcicdjob: (data: IBaseSearch) => Promise<boolean>;
  rollback: (data: IBaseSearch) => Promise<boolean>;
  replicas: (data: IReplicas) => Promise<boolean>;
  canaryPercent: (data: ICanaryPercent) => Promise<boolean>;
  baseupdateimage: (data: IBaseupdateimage) => Promise<boolean>;
  gitbranchCheck: (gitLabURL: string) => Promise<gitbranchCheck>;
}
