import {
  CodepenCircleOutlined,
  WindowsOutlined,
  MediumOutlined,
  SlackSquareOutlined,
  BookOutlined,
  CommentOutlined,
  ApartmentOutlined,
  SlackOutlined,
  DribbbleSquareOutlined,
  YuqueOutlined,
  RedditOutlined,
  SketchOutlined,
  DesktopOutlined,
  DollarOutlined,
  FireOutlined,
  HddOutlined,
  GithubOutlined,
  AimOutlined,
  GoogleOutlined,
  CustomerServiceOutlined,
  DingtalkOutlined,
  InstagramOutlined,
  UserOutlined,
  UserSwitchOutlined,
  BarChartOutlined,
  ShopOutlined,
} from "@ant-design/icons";
//导航栏配置
const config = [
  {
    id: 1,
    icon: SketchOutlined,
    name: "持续集成",
    isHide: false,
    options: [
      {
        id: "1-1",
        name: "项目",
        path: "/project/list",
        show: true,
      },
    ],
  },
  {
    id: 2,
    icon: BarChartOutlined,
    name: "问题管理",
    isHide: false,
    options: [
      {
        id: "2-1",
        name: "问题管理",
        path: "/problem/list",
        show: true,
      },
    ],
  },
  {
    id: 4,
    icon: UserSwitchOutlined,
    name: "管理员设置",
    isHide: true,
    options: [
      {
        id: "4-1",
        name: "用户管理",
        path: "/manager/list",
        show: true,
      },
      {
        id: "4-2",
        name: "接口权限管理",
        path: "/interface/list",
        show: true,
      },
    ],
  },
];
export const runStatus = [
  "未启动",
  "运行中",
  "运行成功",
  "运行失败",
  "未知错误",
  "未运行",
  "已解锁",
];
export const systemEnum = [];
export const pubKey = ``;
export const bugTypeList = [];
//部门员工对照图
export const departments = {};
//等级枚举
export const levelList = [];

export const statusList = [];

export const dataType = [];
export const roleType = [];

export const effectTimeList = [];

export default config;
