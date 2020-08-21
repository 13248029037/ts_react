export interface ISearchParams {
  page_no: number;
  page_size: number;
  user_name: string;
}
export interface IUserList {
  user_name: string;
  user_pswd: string;
  user_role: string[];
  user_team: string;
}
export interface Ires {
  data?: IUserList[];
  total: number;
}
export interface ISetRole {
  role_name: string[];
  user_name: string;
}
export interface ISetTeam {
  teamName: string;
  userName: string[];
}
export interface IAdminRole {
  role_name: string;
  resource_object: string;
  resource_action: string;
}
export interface ISearchListParams {
  page_no: number;
  page_size: number;
}
export interface IAdminRoleDelete extends IAdminRole {
  id?: number | string;
}
export interface IInterfaceRoleRes {
  data?: IAdminRole[];
  total: number;
}
export interface IManager {
  userList: IUserList[];
  interfaceRoleList: IAdminRole[];
  total: number;
  searchUserList: (data: ISearchParams) => Promise<boolean>;
  setRole: (data: ISetRole) => Promise<boolean>;
  setTeam: (data: ISetTeam) => Promise<boolean>;
  adminRole: (data: IAdminRole) => Promise<boolean>;
  adminRoleList: (data: ISearchListParams) => Promise<boolean>;
  adminRoleDelete: (data: IAdminRoleDelete) => Promise<boolean>;
}
