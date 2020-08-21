import eventEmiter from "@/utils/eventEmiter";
import { eventEmitterType } from "@/enum";
import { message } from "antd";
enum readState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}
let ws = null;
(function createWebSocketClient() {
  ws = new WebSocket(`ws://${window.location.host}/ws`);
  switch (ws.readyState) {
    case readState.CONNECTING:
      console.info("websocket CONNECTING...");
      break;
    case readState.OPEN:
      console.info("websocket OPEN...");
      break;
    case readState.CLOSING:
      console.info("websocket CLOSING...");
      break;
    case readState.CLOSED:
      console.info("websocket CLOSED...");
      break;
    default:
      console.info("websocket welcome....");
      break;
  }
  ws.onerror = function (evt) {
    console.log("error occur  from websocket ...");
    message.error("error occur  from websocket ...");
  };
  ws.onopen = function (evt) {
    console.log("Connection open ...");
  };
  ws.onmessage = function (evt) {
    console.log("Received Message: " + evt.data);
    const receiveData = JSON.parse(evt.data);
    switch (receiveData.type) {
      case "1":
        //更新工作流信息
        const confirmPage = window.location.pathname === "/project/list/detail";
        if (confirmPage) {
          console.info("come in type1");
          eventEmiter.emit(eventEmitterType.reloadcicd);
        }
        break;
    }
  };
  ws.onclose = function (evt) {
    console.log(" websocket Connection closed.");
    createWebSocketClient();
  };
})();
export default ws;
