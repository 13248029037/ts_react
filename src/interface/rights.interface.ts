export interface IUserRolePairsByResource {
  resource_type: string;
  project_id: string;
  pipeline_name: string;
}
export interface IUserList {
  page_no: number;
  page_size: number;
  user_name: string;
  noLoading?: boolean;
}
export interface ITableList {
  role_name: string;
  user_name: string;
}
export interface IRoleSetRights {
  resource_type: string;
  user_name: string;
  role_name: string;
  project_id: string;
  pipeline_name: string;
}
export interface IDeleteRole {
  resource_type: string;
  user_name: string;
  role_name: string;
  project_id: string;
  pipeline_name: string;
}
export interface IRights {
  tableList: ITableList[];
  userRolesearch: (data: IUserRolePairsByResource) => Promise<boolean>;
  roleSet: (data: IRoleSetRights) => Promise<boolean>;
  deleteRole: (data: IDeleteRole) => Promise<boolean>;
}
