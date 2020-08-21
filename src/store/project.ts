import { observable, action } from "mobx";
import * as api from "@/api";
import {
  IProjectListRes,
  IProjectList,
  IHandleOk,
  IDeleteProps,
  IUpdateList,
  IOnchangeField,
} from "@/interface/project.interface";
class Store {
  @observable public projectList: IProjectList[] = [];
  @observable public pageNo: number = 1;
  @observable public pageSize: number = 20;
  @observable public total: number = 0;
  @observable public project_id?: string = "";
  @observable public search_team?: string = undefined;
  @action public async listProject(pageIndex) {
    const { pageNo, pageSize, project_id, search_team } = this;
    try {
      const data = await api.listproject<IProjectListRes>({
        pageNo: pageIndex || pageNo,
        pageSize,
        project_id,
        team: search_team,
      });
      this.total = data.total;
      this.projectList = data.data || [];
      if (pageIndex) {
        this.pageNo = pageIndex;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async inseretproject(data: IHandleOk) {
    try {
      await api.inseretproject(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async updateproject(data: IUpdateList) {
    try {
      await api.updateproject(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async deleteproject(data: IDeleteProps) {
    try {
      await api.deleteproject(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public clearAllCondition() {
    this.project_id = "";
    this.search_team = undefined;
  }
  @action public onFieldsChange(value: IOnchangeField[]) {
    value.forEach((item) => {
      this[item.name] = item.value;
    });
  }
}

export default new Store();
