import { observable, action } from "mobx";
import * as api from "../api";
import {
  IUserRolePairsByResource,
  IRoleSetRights,
  ITableList,
  IDeleteRole,
} from "src/interface/rights.interface";
class Store {
  @observable public tableList: ITableList[] = [];
  @action public async userRolesearch(data: IUserRolePairsByResource) {
    try {
      this.tableList = (await api.userRolesearch<ITableList[]>(data)) || [];
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async roleSet(data: IRoleSetRights) {
    try {
      await api.roleSet(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async deleteRole(data: IDeleteRole) {
    try {
      await api.deleteRole(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new Store();
