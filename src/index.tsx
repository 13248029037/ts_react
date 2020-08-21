import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { AppContainer } from "react-hot-loader";
// import * as serviceWorker from "./serviceWorker";
// import "@/utils/websocket"; //启动websocket
ReactDOM.render(
  <AppContainer>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </AppContainer>,
  document.getElementById("root")
);
if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
