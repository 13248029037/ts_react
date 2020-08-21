import React, { useEffect, useState } from "react";
import style from "./index.less";
import Bar from "@/components/bar";
import { Table, Button, message, Menu, Dropdown } from "antd";
import { IProblem, ISearchParams } from "@/interface/problem.interface";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import FooterPage from "@/components/footerpage";
import { IPublic } from "@/interface/public.interface";
import { withRouter } from "react-router-dom";
import SearchList, { IConfigListItem } from "@/components/searchList";
import {
  departments,
  bugTypeList,
  statusList,
  levelList,
  effectTimeList,
  dataType,
} from "@/config";
import moment from "moment";
import Link from "@/components/link";
import { Popover } from "antd";
import Upload from "@/components/upload";
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
  DownOutlined,
} from "@ant-design/icons";
import SlaModal from "./slamodal";
import { ISetting } from "@/interface/setting.interface";
interface Ires {
  token: string;
}
interface IProps {
  problem: IProblem;
  setting: ISetting;
  public: IPublic<ISearchParams>;
}
const configList: IConfigListItem = [
  {
    id: 1,
    label: "问题名称",
    tag: "input",
    value: "name",
    placeholder: "请输入问题名称",
  },
  {
    id: 2,
    label: "问题类型",
    tag: "select",
    value: "type",
    placeholder: "请选择问题类型",
    optionList: bugTypeList,
    optionIndex: "id",
  },
  {
    id: 3,
    label: "部门",
    tag: "select",
    value: "dept_name",
    placeholder: "请选择部门",
    optionList: Reflect.ownKeys(departments).map((item) => ({ name: item })),
  },
  {
    id: 4,
    label: "问题状态",
    tag: "select",
    value: "status",
    placeholder: "请选择问题状态",
    optionList: statusList,
    optionIndex: "id",
  },
  {
    id: 5,
    label: "级别",
    tag: "select",
    value: "level",
    placeholder: "请选择级别",
    optionList: levelList,
    optionIndex: "id",
  },
  {
    id: 6,
    label: "数据类型",
    tag: "select",
    value: "version",
    placeholder: "请选择数据类型",
    optionList: dataType,
    optionIndex: "id",
  },
  {
    id: 7,
    label: "不可用时长",
    tag: "select",
    value: "time",
    placeholder: "请选择不可用时长",
    optionList: effectTimeList,
    optionIndex: "id",
  },
  {
    id: 8,
    label: "发生日期",
    tag: "date",
    value: "date",
    style: { width: 270 },
  },
];

const ProblemList: React.SFC<IProps & RouteComponentProps> = (props) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isAdmin =
    props.setting.roleName.indexOf("questionAdmin") !== -1 ||
    props.setting.roleName.indexOf("admin") !== -1;
  useEffect(() => {
    props.public.clearData();
    props.problem.listSlaList = null;
    listissue();
    // eslint-disable-next-line
  }, []);
  const listissue = async (data?) => {
    const {
      pageNoTemp = 1,
      type,
      name,
      dept_name,
      status,
      start_time,
      end_time,
      level,
      burning_start_time,
      burning_end_time,
      version,
    } = data || {};
    return props.problem.listissue({
      pageNo: pageNoTemp,
      pageSize,
      name,
      type,
      dept_name,
      status,
      level,
      start_time,
      end_time,
      burning_start_time,
      burning_end_time,
      version,
    });
  };
  const searchForm = async (params) => {
    props.public.setData(params);
    const date = params.date;
    const time = params.time;
    console.info(time);
    const data = {
      ...params,
      pageNoTemp: 1,
      start_time: date && moment(date[0]).format("YYYY-MM-DD") + " 00:00:00",
      end_time: date && moment(date[1]).format("YYYY-MM-DD") + " 23:59:59",
      burning_start_time: time && parseInt(time.split("-")[0], 10),
      burning_end_time: time && parseInt(time.split("-")[1], 10),
    };
    await listissue(data);
    setPageNo(1);
  };
  const gotoCreate = () => {
    props.history.push("/problem/list/create");
  };
  const gotoEdit = (item) => {
    props.history.push(`/problem/list/create?isEdit=true&id=${item.id}`);
  };
  const gotoLook = (item) => {
    props.history.push(`/problem/list/create?isLook=true&id=${item.id}`);
  };
  const gotojira = (jira_number) => {
    window.open(`http://jira.tutorabc.com/browse/${jira_number}`);
  };
  const downloadModelFile = () => {
    window.open(
      "https://devops-prod.oss-cn-shanghai.aliyuncs.com/public/%E9%97%AE%E9%A2%98%E4%BF%A1%E6%81%AF%E6%94%B6%E9%9B%86.xlsx"
    );
  };
  const onFooterChange = (pageNoTemp: number) => {
    const data = props.public.publicData || {};
    setPageNo(pageNoTemp);
    listissue({ ...data, pageNoTemp });
  };
  const columns = [
    {
      title: "关联jira单号",
      width: 180,
      dataIndex: "jira_number",
      render: (jira_number) => (
        <Link text={jira_number} onClick={() => gotojira(jira_number)} />
      ),
    },
    {
      title: "问题类型",
      width: 260,
      dataIndex: "typeName",
    },
    {
      title: "问题名称",
      width: 80,
      render: (item) => (
        <div>
          <Popover
            content={
              <div
                style={{
                  maxWidth: 600,
                  maxHeight: 800,
                  overflow: "auto",
                }}
                dangerouslySetInnerHTML={{
                  __html: item.name,
                }}
              />
            }
          >
            <div className={style.ellipsis}>
              {item.version === 1 && <span className={style.warn}>老数据</span>}
              {item.name}
            </div>
          </Popover>
        </div>
      ),
    },
    {
      title: "级别",
      width: 80,
      render: (item) => (
        <div>
          {item.levelName && item.levelName.length > 2 ? (
            <span
              style={{ color: "red", fontSize: 16, marginRight: 4 }}
              className={style.ellipsislevel}
            >
              {item.levelName}
            </span>
          ) : (
            <span style={{ color: "red", fontSize: 16, marginRight: 4 }}>
              {item.levelName}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "发生时间",
      width: 300,
      render: (item) => (
        <div>
          <p>
            <span style={{ marginLeft: 4 }}>
              {item.start_time &&
                moment(item.start_time).format("YYYY-MM-DD HH:mm") + " - "}
            </span>
          </p>
          <p>
            <span style={{ marginLeft: 4 }}>
              {item.end_time &&
                moment(item.end_time).format("YYYY-MM-DD HH:mm")}
            </span>
          </p>
        </div>
      ),
    },
    {
      title: "影响",
      width: 290,
      render: (item) => (
        <div>
          <p>
            归还:
            <span style={{ color: "red", marginLeft: 4 }}>
              {!!item.level && item.impact_number}
            </span>
          </p>
          <p>
            不可用时长(分):
            <span style={{ color: "red", marginLeft: 4 }}>
              {item.burning_time}
            </span>
          </p>
          <Popover
            placement={"top"}
            content={<div>{`备注:${item.change_comment}`}</div>}
          >
            {item.change_comment && (
              <QuestionCircleOutlined
                style={{ color: "red", fontSize: 12, cursor: "pointer" }}
              />
            )}
          </Popover>
        </div>
      ),
    },
    {
      title: "部门别",
      width: 120,
      render: (item) => (
        <div>
          <p>{item.leader} / </p>
          <p>{item.dept_name}</p>
        </div>
      ),
    },
    {
      title: "问题信息",
      width: 70,
      render: (item) => (
        <div>
          <Popover
            placement={"top"}
            content={
              <div
                style={{
                  minWidth: 800,
                  maxWidth: 1000,
                  maxHeight: 800,
                  overflow: "auto",
                }}
                dangerouslySetInnerHTML={{
                  __html: item.improvement_config || item.improvement,
                }}
              />
            }
          >
            {item.improvement && <Button type="link">查看</Button>}
          </Popover>
        </div>
      ),
    },
    {
      title: "状态",
      width: 140,
      render: (item) => (
        <span style={{ color: item.status === 1 && "red" }}>
          {item.statusName}
        </span>
      ),
    },
    {
      title: "附件",
      width: 80,
      render: (item) => (
        <div>
          <Popover
            placement={"top"}
            content={
              <div style={{ maxWidth: 1000, maxHeight: 800, overflow: "auto" }}>
                <ul>
                  {(item.upload_url || []).map((obj) => (
                    <li key={obj.url}>
                      <a target="_brank" href={obj.url}>
                        <LinkOutlined />
                        {obj.fileName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }
          >
            {item.upload_url && !!item.upload_url.length && (
              <Button type="link">查看</Button>
            )}
          </Popover>
        </div>
      ),
    },
    {
      title: "创建者",
      width: 100,
      dataIndex: "create_user",
    },
    {
      title: "操作",
      width: 260,
      render: (item) => (
        <div>
          <span className={style.edit} onClick={() => gotoLook(item)}>
            详情
          </span>
          {isAdmin && (
            <Dropdown overlay={createMenu(item)} placement="bottomCenter">
              <span className={style.more}>
                更多 <DownOutlined />
              </span>
            </Dropdown>
          )}
        </div>
      ),
    },
  ];
  const createMenu = (item) => {
    return (
      <Menu>
        <Menu.Item>
          <span className={style.edit} onClick={() => gotoEdit(item)}>
            <EditOutlined />
            编辑
          </span>
        </Menu.Item>
        <Menu.Item>
          <span className={style.delete} onClick={() => deleteOne(item.id)}>
            <DeleteOutlined />
            删除
          </span>
        </Menu.Item>
      </Menu>
    );
  };
  const deleteOne = async (id) => {
    const tag = await props.problem.deleteissue(id);
    if (tag) {
      message.success("删除成功");
      const data = props.public.publicData || {};
      listissue({ ...data, pageNo });
    }
  };
  const godownLoad = () => {
    let searchParams = "";
    const publicData = props.public.publicData;
    console.info(publicData, "publicDatapublicData");
    if (publicData) {
      searchParams = Object.keys(publicData).reduce((front, next) => {
        if (next === "date" && publicData[next]) {
          const date = publicData[next];
          const start_time = new Date(
            moment(date[0]).format("YYYY-MM-DD") + " 00:00:00"
          ).getTime();
          const end_time = new Date(
            moment(date[1]).format("YYYY-MM-DD") + " 23:59:59"
          ).getTime();
          return `${front}start_time=${start_time}&end_time=${end_time}&`;
        }
        return publicData[next]
          ? `${front}${next}=${publicData[next]}&`
          : front;
      }, "?");
    }
    window.open(
      `/bk/issue/downexcel${searchParams.substr(0, searchParams.length - 1)}`
    );
  };
  const clearForm = () => {
    props.public.clearData();
  };
  const onSuccess = () => {
    onFooterChange(pageNo);
    message.success("上传成功");
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const onShowInfoModal = () => {
    setModalVisible(true);
  };
  const listsla = (data) => {
    props.problem.listsla(data);
  };
  return (
    <div className={style.container}>
      <SearchList
        configList={configList}
        searchForm={searchForm}
        clearForm={clearForm}
      />
      <div className={style.operation}>
        <Bar title="问题列表" style={{ flex: 1 }} />
        {isAdmin && (
          <Button type="primary" className={style.action} onClick={gotoCreate}>
            创建问题
          </Button>
        )}
        {isAdmin && (
          <Button
            type="primary"
            className={style.action}
            onClick={downloadModelFile}
          >
            下载模板
          </Button>
        )}
        <Button type="primary" className={style.action} onClick={godownLoad}>
          下载问题信息
        </Button>
        {isAdmin && (
          <Upload
            onSuccess={onSuccess}
            className={style.action}
            text="上传问题信息"
            type={"primary"}
          />
        )}
        <Button
          type="primary"
          className={style.action}
          onClick={onShowInfoModal}
        >
          查看问题统计
        </Button>
      </div>
      <Table
        scroll={{ x: 1600 }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={props.problem.problemList}
        pagination={false}
      />
      <FooterPage
        onChange={onFooterChange}
        current={pageNo}
        pageSize={pageSize}
        total={props.problem.total}
      />
      <SlaModal
        listSlaList={props.problem.listSlaList}
        onSearch={listsla}
        handleCancel={handleCancel}
        modalVisible={modalVisible}
      />
    </div>
  );
};
export default withRouter(
  inject("problem", "public", "setting")(observer(ProblemList))
);
