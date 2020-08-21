import RedirectComponent from "@/components/redirectcomponent/index";
import AsyncComponent from "@/components/asynccomponent/index";

export default [
  {
    component: AsyncComponent(() => import("@/container/login/index")),
    path: "/user/login",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/project/index")),
    path: "/project/list",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/project/detail")),
    path: "/project/list/detail",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/workflow/loglist")),
    path: "/project/list/workflow/loglist",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/workflow/logone")),
    path: "/project/list/workflow/logone",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/workflow/create")),
    path: "/project/list/workflow/create",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/system/index")),
    path: "/system/list",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/manager/index")),
    path: "/manager/list",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/rights/index")),
    path: "/project/list/right",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/problem/index")),
    path: "/problem/list",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/problem/create")),
    path: "/problem/list/create",
    exact: true,
  },
  {
    component: AsyncComponent(() =>
      import("@/container/fortressmachine/index")
    ),
    path: "/fortressmachine/list",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/aliyun/index")),
    path: "/aliyun/list",
    exact: true,
  },
  {
    component: AsyncComponent(() => import("@/container/manager/rights")),
    path: "/interface/list",
    exact: true,
  },
  {
    component: RedirectComponent("/project/list"),
    path: "/",
  },
];
