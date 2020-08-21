import { observable, computed, action } from "mobx";
import * as api from "@/api";
import { IuserInfo } from "@/interface/setting.interface";
class Store {
  // 基本设置
  @observable public collaps: boolean = false;
  @observable public globalLoadingSpin: boolean = true;
  @observable public station: string = "1";
  @observable public userName: string = "";
  @observable public roleName: string[] = [];

  @computed public get getCollaps() {
    return this.collaps;
  }
  @computed public get getCurrentUserName() {
    return this.userName;
  }
  @action.bound public setCollaps() {
    this.collaps = !this.collaps;
  }
  @action.bound public setStation(station) {
    this.station = station;
  }
  @action.bound public setGlobalLoadingVisible(flag) {
    this.globalLoadingSpin = flag;
  }
  @action public async getCurrentUser() {
    try {
      let data: IuserInfo = await api.getCurrentUser<IuserInfo>();
      this.userName = data.user_name || "";
      this.roleName = data.user_role || [];
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new Store();
