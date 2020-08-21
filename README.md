# React+TypeScript

## 技术选型最新版本

1. React
2. React-router-dom
3. Mobx
4. Typescript
5. ant-design
6. axios

## 启动

```shell
npm install / yarn install
```

```shell
npm start / yarn start
```

## 项目文档

todo

## 流程图

todo

## 代码约束

遵循 typescript-react 规范 以及 arbnb 规范

## 开始开发

#### src 中的目录结构

1. src/api api 请求
2. src/store 状态机
   1. index.ts
3. src/interface
   1. 按照页面分类的类型 interface
4. src/images 图片
5. src/utils 一些工具函数（比如请求的接口设置）
6. src/routes 整个项目的路由路口

7. src/config 配置文件
   1. 导航的配置文件以及其他
8. src/components 公用组件
9. src/container 容器组件
10. tips:目前所有组件都遵从函数组件+hooks 写法，遵循函数式编程，官方提倡

#### tips

1. antd 的 interface 在 antd/lib/组件名字 中寻找
2. store 的加载机制
3. 善用 public private readonly 等修饰词
4. action 最好返回一个 boolean
5. 开发模式采用 webpackdevserver 反向代理机制，具体配置在 setupProxy.js

## 其他说明

1. gitlab ci 待完善
