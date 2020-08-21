interface IItem {
  event: string;
  callback: (params?: string) => void;
}
class EventEmiter {
  public callbackArr: IItem[] = [];
  public on(event: string, callback: (params?: string) => void) {
    if (!this.callbackArr.find((item) => item.event === event)) {
      this.callbackArr.push({ event, callback });
    }
  }
  public emit(event: string, url?: string) {
    this.callbackArr.forEach((item: IItem) => {
      if (item.event === event) {
        item.callback(url);
      }
    });
  }
  public off(event: string) {
    this.callbackArr = this.callbackArr.filter(
      (item: IItem) => item.event !== event
    );
  }
}

export default new EventEmiter();
