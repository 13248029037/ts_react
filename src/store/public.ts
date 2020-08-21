import { observable, action } from "mobx";
class Store {
  // 基本设置
  @observable public publicData = null;
  @action public setData = (data) => {
    this.publicData = data;
  };
  @action public clearData = () => {
    this.publicData = null;
  };
}
export default new Store();
