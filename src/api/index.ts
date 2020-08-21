import Request from "src/utils/request";
import { IOpts } from "src/utils/request.interface";
import { ILoginparams } from "src/interface/login.interface";
import {
  IListProject,
  IHandleOk,
  IDeleteProps,
  IUpdateList,
} from "src/interface/project.interface";
import {
  IInseretcicdJob,
  IQuerycicdjob,
  IListcicdjob,
  IStatustaskrun,
  IQueryproject,
  IBaseSearch,
  IReplicas,
  ICanaryPercent,
  IBaseupdateimage,
} from "@/interface/workflow.interface";
import {
  IUserRolePairsByResource,
  IUserList,
  IRoleSetRights,
  IDeleteRole,
} from "@/interface/rights.interface";
import {
  PatialInseretissue,
  ISearchParams,
  IListsla,
} from "@/interface/problem.interface";
import {
  ISetRole,
  ISetTeam,
  IAdminRole,
  IAdminRoleDelete,
  ISearchListParams,
} from "@/interface/manager.interface";
const apiUrl = {
  //登录接口
  userLogin: "/bk/v1/user/login",
  userLogout: "/bk/v1/user/logout",
  getCurrentUser: "/bk/v1/user/currentUser",
  listproject: "/bk/devops/listproject",
  inseretproject: "/bk/devops/inseretproject",
  deleteproject: "/bk/devops/deleteproject",
  updateproject: "/bk/devops/updateproject",
  inseretcicdjob: "/bk/devops/inseretcicdjob",
  updatecicdjob: "/bk/devops/updatecicdjob",
  listcicdjob: "/bk/devops/listcicdjob",
  querycicdjob: "/bk/devops/querycicdjob",

  //cicd
  runcicdjob: "/bk/devops/runcicdjob",
  statustaskrun: "/bk/devops/statustaskrun",
  queryproject: "/bk/devops/queryproject",
  gettaskrunpod: "/bk/devops/gettaskrunpod",
  getpodlist: "/bk/devops/getpodlist",
  deletecicdjob: "/bk/devops/deletecicdjob",
  getcicdinfo: "/bk/devops/getcicdinfo",
  stopcicdjob: "/bk/devops/stopcicdjob",
  canaryruncicdjob: "/bk/devops/canaryruncicdjob",
  gitbranchCheck: "/bk/devops/gitbranch",

  //appinfo
  getappinfo: "/bk/devops/getappinfo",
  replicas: "/bk/devops/replicas",
  canaryPercent: "/bk/devops/vsweight",
  baseupdateimage: "/bk/devops/baseupdateimage",

  //历史日志
  listcicdjobhistory: "/bk/devops/listcicdjobhistory",
  rollback: "/bk/devops/rollback",
  //权限
  userList: "/bk/v1/admin/user/list",
  userListNormal: "/bk/v1/user/list",
  userRolesearch: "/bk/v1/role/userRolePairsByResource",
  roleSet: "/bk/v1/role",
  setforuser: "/bk/v1/admin/role/setforuser",
  deleteRole: "/bk/v1/role/delete",
  setTeam: "/bk/v1/admin/user/setTeam",
  //问题管理
  inseretissue: "/bk/issue/inseretissue",
  listissue: "/bk/issue/listissue",
  queryissue: "/bk/issue/queryissue",
  updateissue: "/bk/issue/updateissue",
  listsla: "/bk/issue/listsla",
  deleteissue: "/bk/issue/deleteissue",

  //上传附件
  uploadOss: "/bk/v1/oss",
  uploadexcel: "/bk/issue/uploadexcel",
  //接口权限
  adminRole: "/bk/v1/admin/role",
  adminRoleList: "/bk/v1/admin/role/list",
  adminRoleDelete: "/bk/v1/admin/role/delete",
};
export const userLogin = <T>(data: ILoginparams): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.userLogin,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const userLogout = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.userLogout,
    method: "POST",
  };
  return Request<T>(opts);
};
export const getCurrentUser = <T>(): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.getCurrentUser,
  };
  return Request<T>(opts);
};
export const listproject = <T>(data: IListProject): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.listproject,
    method: "POST",
    data,
  };
  return Request<T>(opts);
};
export const inseretproject = <T>(data: IHandleOk): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.inseretproject,
    method: "POST",
    data,
  };
  return Request<T>(opts);
};
export const deleteproject = <T>(data: IDeleteProps): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.deleteproject,
    method: "POST",
    data,
  };
  return Request<T>(opts);
};
export const updateproject = <T>(data: IUpdateList): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.updateproject,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};

export const inseretcicdjob = <T>(data: IInseretcicdJob): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.inseretcicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const listcicdjob = <T>(data: IListcicdjob): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.listcicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const querycicdjob = <T>(data: IQuerycicdjob): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.querycicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const updatecicdjob = <T>(data: IInseretcicdJob): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.updatecicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const runcicdjob = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.runcicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const canaryruncicdjob = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.canaryruncicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const statustaskrun = <T>(data: IStatustaskrun): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.statustaskrun,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const getpodlist = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.getpodlist,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
//历史日志
export const listcicdjobhistory = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.listcicdjobhistory,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const queryproject = <T>(data: IQueryproject): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.queryproject,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const gettaskrunpod = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.gettaskrunpod,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const deletecicdjob = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.deletecicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const getappinfo = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.getappinfo,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const getcicdinfo = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.getcicdinfo,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const userList = <T>(params: IUserList): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.userList,
    params,
    method: "GET",
  };
  return Request<T>(opts);
};
export const userListNormal = <T>(params: IUserList): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.userListNormal,
    params,
    method: "GET",
  };
  return Request<T>(opts);
};
export const userRolesearch = <T>(
  params: IUserRolePairsByResource
): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.userRolesearch,
    params,
    method: "GET",
  };
  return Request<T>(opts);
};
export const roleSet = <T>(data: IRoleSetRights): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.roleSet,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const setforuser = <T>(data: ISetRole): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.setforuser,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const deleteRole = <T>(data: IDeleteRole): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.deleteRole,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const stopcicdjob = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.stopcicdjob,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const setTeam = <T>(data: ISetTeam): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.setTeam,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const rollback = <T>(data: IBaseSearch): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.rollback,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const replicas = <T>(data: IReplicas): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.replicas,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const canaryPercent = <T>(data: ICanaryPercent): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.canaryPercent,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const baseupdateimage = <T>(data: IBaseupdateimage): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.baseupdateimage,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const inseretissue = <T>(data: PatialInseretissue): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.inseretissue,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const listissue = <T>(data: ISearchParams): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.listissue,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const queryissue = <T>(id: string): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.queryissue,
    data: { id },
    method: "POST",
  };
  return Request<T>(opts);
};
export const updateissue = <T>(data: PatialInseretissue): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.updateissue,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const uploadOss = <T>(file: FormData): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.uploadOss,
    data: file,
    method: "POST",
  };
  return Request<T>(opts);
};
export const uploadexcel = <T>(file: FormData): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.uploadexcel,
    data: file,
    method: "POST",
  };
  return Request<T>(opts);
};
export const listsla = <T>(data: IListsla): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.listsla,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const deleteissue = <T>(id: string | number): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.deleteissue,
    data: { id },
    method: "POST",
  };
  return Request<T>(opts);
};
export const gitbranchCheck = <T>(gitLabURL: string): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.gitbranchCheck,
    data: { gitLabURL },
    method: "POST",
  };
  return Request<T>(opts);
};
export const adminRole = <T>(data: IAdminRole): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.adminRole,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
export const adminRoleList = <T>(params: ISearchListParams): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.adminRoleList,
    method: "GET",
    params,
  };
  return Request<T>(opts);
};
export const adminRoleDelete = <T>(data: IAdminRoleDelete): Promise<T> => {
  const opts: IOpts = {
    url: apiUrl.adminRoleDelete,
    data,
    method: "POST",
  };
  return Request<T>(opts);
};
