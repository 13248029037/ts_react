import { observable, computed, action } from "mobx";
import * as api from "../api";
import { ILoginparams } from "src/interface/login.interface";
class Store {
  // 基本设置

  @observable public collaps = false;
  @observable public globalLoadingSpin = false;

  @observable public userInfo = {};

  @computed public get getCollaps() {
    return this.collaps;
  }
  @action.bound public setCollaps() {
    this.collaps = !this.collaps;
  }

  @action public async userLogin(data: ILoginparams) {
    try {
      await api.userLogin(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new Store();
