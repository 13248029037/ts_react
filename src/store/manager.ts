import { observable, action } from "mobx";
import * as api from "../api";
import {
  ISearchParams,
  IUserList,
  Ires,
  ISetRole,
  ISetTeam,
  IAdminRole,
  ISearchListParams,
  IInterfaceRoleRes,
  IAdminRoleDelete,
} from "src/interface/manager.interface";
class Store {
  @observable public userList: IUserList[] = [];
  @observable public interfaceRoleList: IAdminRole[] = [];
  @observable public total: number = 0;
  @action public async searchUserList(data: ISearchParams) {
    try {
      const result: Ires = await api.userList<Ires>(data);
      this.userList = result.data || [];
      this.total = result.total || 0;
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async setRole(data: ISetRole) {
    try {
      await api.setforuser(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async setTeam(data: ISetTeam) {
    try {
      await api.setTeam(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async adminRole(data: IAdminRole) {
    try {
      await api.adminRole(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async adminRoleList(data: ISearchListParams) {
    try {
      const result: IInterfaceRoleRes = await api.adminRoleList(data);
      this.interfaceRoleList = result.data || [];
      this.total = result.total || 0;
      return true;
    } catch (error) {
      return false;
    }
  }
  @action public async adminRoleDelete(data: IAdminRoleDelete) {
    try {
      await api.adminRoleDelete(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new Store();
