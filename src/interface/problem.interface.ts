export interface IItem {
  fileName: string;
  url: string;
}
export interface IInseretissue {
  id?: string;
  type: string;
  name: string;
  level: number;
  burning_time: number;
  jira_number: string;
  happen_time: string;
  start_time: string;
  end_time: string;
  impact_number: string;
  leader: string;
  dept_name: string;
  change_level: number;
  change_comment: string;
  important_event: string;
  important_event_config: string;
  improvement: string;
  improvement_config: string;
  upload_url: IItem[];
  status: number;
  version: number;
}
export interface IProblemList extends IInseretissue {
  createUser?: string;
}
export interface Ires {
  data?: IProblemList[];
  total: number;
}
export interface ISearchParams {
  name?: string;
  type?: number;
  dept_name?: string;
  start_time?: string;
  end_time?: string;
  burning_start_time?: number;
  burning_end_time?: number;
  status?: number;
  level?: number;
  pageSize?: number;
  pageNo?: number;
  version: number;
}
export type PatialInseretissue = Partial<IInseretissue>;
export interface ISlaModalProps {
  onSearch: (data: IListsla) => void;
  modalVisible?: boolean;
  handleCancel: () => void;
  listSlaList?: ISla;
}
export interface IListsla {
  start_time?: string;
  end_time?: string;
  version: number;
}
export interface ISla {
  dept: DataItem[];
  level: DataItem[];
  type: DataItem[];
  burning: DataItem[];
}
export interface DataItem {
  [field: string]: string | number | number[] | null | undefined;
}
export interface IProblem {
  total: number;
  listSlaList: ISla;
  problemList: IProblemList[];
  singleProblem: IProblemList;
  inseretissue: (data: PatialInseretissue) => Promise<boolean>;
  updateissue: (data: PatialInseretissue) => Promise<boolean>;
  listissue: (data: ISearchParams) => Promise<boolean>;
  queryissue: (id: string) => Promise<boolean>;
  listsla: (data: IListsla) => Promise<boolean>;
  deleteissue: (id: number | string) => Promise<boolean>;
}
