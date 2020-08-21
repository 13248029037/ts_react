export interface IListProject {
  pageNo: number;
  pageSize: number;
  project_id?: string;
  team: string;
}
export interface IProjectList {
  project_id: string;
  project_name: string;
  team: string;
  project_group: string;
  project_token?: string;
  update_user?: string;
}
export interface IProjectListRes {
  data: IProjectList[];
  total: number;
}

export interface IOnchangeField {
  name: string;
  value: string;
}
export interface IProject {
  total: number;
  pageNo: number;
  pageSize: number;
  projectList: IProjectList[];
  search_team: string;
  project_id: string;
  clearAllCondition: () => void;
  onFieldsChange: (value: IOnchangeField[]) => void;
  listProject: (pageIndex?: number) => Promise<boolean>;
  inseretproject: (data: IHandleOk) => Promise<boolean>;
  deleteproject: (data: IDeleteProps) => Promise<boolean>;
  updateproject: (data: IUpdateList) => Promise<boolean>;
}
export interface IHandleOkProps {
  create_user: string;
  project_id: string;
  project_name: string;
  team: string;
  update_user: string;
}
export interface IHandleOk {
  create_user?: string;
  project_id?: string;
  project_name?: string;
  team: string;
  update_user?: string;
}
export interface IUpdateList extends IHandleOk {
  update_time?: string;
}
export interface IAddModalProps {
  editProjectId?: string;
  editTeam?: string;
  modalVisible: boolean;
  isEdit: boolean;
  handleOk: (data: IHandleOk) => void;
  handleCancel: () => void;
}
export interface IDeleteModalProps {
  modalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
export interface IDeleteProps {
  project_id: string;
}
