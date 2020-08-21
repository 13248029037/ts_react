import React, { useEffect, useState } from "react";
import style from "./index.less";
import Bar from "@/components/bar";
import { Table, Button, message } from "antd";
import { IManager } from "@/interface/manager.interface";
import { inject, observer } from "mobx-react";
import { RouteComponentProps } from "react-router";
import Modal from "./modal";
import TaddModal from "./tmodal";
import FooterPage from "@/components/footerpage";
import { ISetting } from "@/interface/setting.interface";
import { withRouter } from "react-router-dom";
import SearchList, { IConfigListItem } from "@/components/searchList";
import { IPublic } from "@/interface/public.interface";
interface Ires {
  token: string;
}
interface IProps {
  manager: IManager;
  setting: ISetting;
  public: IPublic<{ username: string }>;
}
const configList: IConfigListItem = [
  {
    id: 1,
    label: "用户名",
    tag: "input",
    value: "username",
    placeholder: "请输入用户名",
  },
];
const Manager: React.SFC<IProps & RouteComponentProps> = (props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [tmodalVisible, setTmodalVisible] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [roleName, setRoleName] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  useEffect(() => {
    props.public.clearData();
    searchUserLIst();
    locationIndex();
    // eslint-disable-next-line
  }, [props.setting.userName]);
  const locationIndex = () => {
    if (
      props.setting.userName &&
      props.setting.roleName.indexOf("admin") === -1
    ) {
      props.history.push("/");
    }
  };
  const searchUserLIst = async (
    page_no: number = 1,
    user_name: string = ""
  ) => {
    return props.manager.searchUserList({
      page_no,
      page_size: pageSize,
      user_name,
    });
  };
  const onFooterChange = (page_no: number) => {
    const { username } = props.public.publicData || {};
    setPageNo(page_no);
    searchUserLIst(page_no, username);
    setSelectedRowKeys([]);
  };
  const handleCancel = () => {
    setModalVisible(false);
    setTmodalVisible(false);
    setUserName("");
  };
  const handleOk = async (data) => {
    const tag = await setRole(userName, data.role_name);
    if (tag) {
      message.success("操作成功");
      setModalVisible(false);
      searchForm(props.public.publicData, pageNo);
    }
  };
  const handleModifyOk = async (data) => {
    console.info(userName);
    console.info(selectedRowKeys);
    const tag = await props.manager.setTeam({
      teamName: data.teamName,
      userName: userName ? [userName] : selectedRowKeys, //单个还是批量
    });
    if (tag) {
      message.success("操作成功");
      setTmodalVisible(false);
      setSelectedRowKeys([]);
      searchForm(props.public.publicData, pageNo);
    }
  };
  const editOne = (item) => {
    setRoleName(item.user_role || []);
    setUserName(item.user_name);
    setModalVisible(true);
  };
  const editOneForTeam = (item) => {
    setUserName(item.user_name);
    setTmodalVisible(true);
  };
  const searchForm = async (params, page_no: number = 1) => {
    props.public.setData(params);
    await searchUserLIst(page_no, (params && params.username) || "");
    setPageNo(page_no);
  };
  const setRole = async (user_name: string, role_name: string[]) => {
    return props.manager.setRole({
      user_name,
      role_name,
    });
  };
  const columns = [
    {
      title: "用户名",
      width: 160,
      dataIndex: "user_name",
    },
    {
      title: "用户所属团队",
      width: 160,
      dataIndex: "user_team",
    },
    {
      title: "用户角色",
      width: 160,
      render: (item) => item.user_role && item.user_role.join("、"),
    },
    {
      title: "操作",
      width: 200,
      render: (item) => (
        <div>
          <span className={style.edit} onClick={() => editOne(item)}>
            赋予角色
          </span>
          <span className={style.edit} onClick={() => editOneForTeam(item)}>
            更改团队
          </span>
        </div>
      ),
    },
  ];
  const onSelectChange = (selectedRowKeysFromTable) => {
    setSelectedRowKeys(selectedRowKeysFromTable);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const clearForm = () => {
    props.public.clearData();
  };
  return (
    <div className={style.container}>
      <SearchList
        configList={configList}
        searchForm={searchForm}
        clearForm={clearForm}
      />
      <div className={style.workflow}>
        <Bar title="用户列表" />
        <Button
          style={{ margin: 10 }}
          type="primary"
          disabled={!selectedRowKeys.length}
          onClick={() => setTmodalVisible(true)}
        >
          批量更改团队
        </Button>
        {`已选择${selectedRowKeys.length}项`}
      </div>
      <Table
        rowSelection={rowSelection}
        rowKey={(record) => record.user_name}
        columns={columns}
        dataSource={props.manager.userList}
        pagination={false}
      />
      <Modal
        role_name={roleName}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalVisible={modalVisible}
      />
      <TaddModal
        handleOk={handleModifyOk}
        handleCancel={handleCancel}
        modalVisible={tmodalVisible}
      />
      <FooterPage
        onChange={onFooterChange}
        current={pageNo}
        pageSize={pageSize}
        total={props.manager.total}
      />
    </div>
  );
};
export default withRouter(
  inject("manager", "public", "setting")(observer(Manager))
);
