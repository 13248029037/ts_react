import { observable, action } from "mobx";
import * as api from "../api";
import {
  PatialInseretissue,
  ISearchParams,
  Ires,
  IProblemList,
  IListsla,
  ISla,
} from "src/interface/problem.interface";
class Store {
  @observable public listSlaList: ISla = null;
  @observable public problemList: IProblemList[] = [];
  @observable public total: number = 0;
  @observable public singleProblem: IProblemList = null;
  @action public async inseretissue(data: PatialInseretissue) {
    try {
      await api.inseretissue(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async updateissue(data: PatialInseretissue) {
    try {
      await api.updateissue(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async listissue(data: ISearchParams) {
    try {
      const result: Ires = await api.listissue<Ires>(data);
      this.problemList = result.data || [];
      this.total = result.total;
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async queryissue(id: string) {
    try {
      this.singleProblem = await api.queryissue<IProblemList>(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async deleteissue(id: string | number) {
    try {
      await api.deleteissue(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async listsla(data: IListsla) {
    try {
      const dataTemp = await api.listsla<ISla>(data);
      const { dept = [], level = [], type = [], burning = [] } = dataTemp;
      this.listSlaList = {
        dept: dept.map((item) => ({
          ...item,
          sla: Math.floor((item.sla as number) * 100000) / 1000,
          burning_time_sum:
            Math.floor((item.burning_time_sum as number) * 1000) / 1000,
        })),
        level,
        type,
        burning,
      };
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new Store();
