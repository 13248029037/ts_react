import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { IProject, IHandleOk } from "@/interface/project.interface";
import { ISetting } from "@/interface/setting.interface";
import style from "./index.less";
import Card from "@/components/card";
import FooterPage from "@/components/footerpage";
import { PlusOutlined } from "@ant-design/icons";
import AddModal from "./addmodal";
import DeleteModal from "./deletemodal";
import Slider from "@/components/slider";
import { message } from "antd";
import { RouteComponentProps } from "react-router";
interface IProps {
  project: IProject;
  setting: ISetting;
}
const Project: React.SFC<IProps & RouteComponentProps> = (props) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tempProjectId, setTempProjectId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editProjectId, setEditProjectId] = useState("");
  const [editTeam, setEditTeam] = useState(null);
  const [sliderCollaps, setSliderCollaps] = useState(true);
  const [placerHolder] = useState([1, 2, 3, 4, 5]);
  const isAdmin =
    props.setting.roleName.indexOf("projectAdmin") !== -1 ||
    props.setting.roleName.indexOf("admin") !== -1;
  const {
    projectList = [],
    pageNo,
    pageSize,
    total,
    search_team,
    project_id,
  } = props.project;
  useEffect(() => {
    props.project.projectList = [];
    props.project.listProject();
    // eslint-disable-next-line
  }, []);
  const onchangeSearch = async () => {
    let tag = await props.project.listProject(1);
    if (tag) {
      setSliderCollaps(!sliderCollaps);
    }
    return tag;
  };
  const onFieldsChange = (value) => {
    props.project.onFieldsChange(value);
  };
  const clearAllCondition = () => {
    props.project.clearAllCondition();
  };
  const collapsOnChange = () => {
    setSliderCollaps(!sliderCollaps);
  };
  const handleProject = (item, tag) => {
    switch (tag) {
      case 1:
        setAddModalVisible(true);
        setIsEdit(true);
        setEditTeam(item.team);
        setEditProjectId(item.project_id);
        break;
      case 2:
        props.history.push(`/project/list/detail?projectId=${item.project_id}`);
        break;
      case 3:
        setDeleteModalVisible(true);
        setTempProjectId(item.project_id);
        break;
      case 4:
        props.history.push(`/project/list/right?project_id=${item.project_id}`);
        break;
    }
  };
  const onFooterChange = (pageIndex: number) => {
    props.project.listProject(pageIndex);
  };
  const handleCancel = () => {
    setAddModalVisible(false);
    setDeleteModalVisible(false);
  };
  const addProject = () => {
    setAddModalVisible(true);
    setIsEdit(false);
  };
  const handleOkDeleteModal = async () => {
    let tag = await props.project.deleteproject({
      project_id: tempProjectId,
    });
    if (tag) {
      handleCancel();
      props.project.listProject();
    }
  };
  const handleOk = async (data: IHandleOk) => {
    let func = props.project.updateproject;
    if (!isEdit) {
      func = props.project.inseretproject;
    }
    let tag = await func({
      ...data,
      project_id: data.project_name,
    });
    if (tag) {
      message.success(isEdit ? "编辑成功" : "添加成功");
      await props.project.listProject();
      handleCancel();
    }
  };
  return (
    <div className={style.project}>
      {(projectList || []).map((item) => (
        <Card
          key={item.project_name}
          title={item.project_name}
          team={item.team || item.project_group}
          updateUser={item.update_user}
          hancleChange={(tag) => handleProject(item, tag)}
        />
      ))}
      {isAdmin && (
        <div onClick={addProject} className={style.add}>
          <PlusOutlined className={style.button} />
        </div>
      )}
      {placerHolder.map((v) => (
        <div key={v} className={style.place}>
          {v}
        </div>
      ))}
      <FooterPage
        onChange={onFooterChange}
        current={pageNo}
        pageSize={pageSize}
        total={total}
      />
      <AddModal
        editProjectId={editProjectId}
        editTeam={editTeam}
        isEdit={isEdit}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalVisible={addModalVisible}
      />
      <DeleteModal
        handleOk={handleOkDeleteModal}
        handleCancel={handleCancel}
        modalVisible={deleteModalVisible}
      />
      <Slider
        onchangeSearch={onchangeSearch}
        search_team={search_team}
        project_id={project_id}
        collapsOnChange={collapsOnChange}
        collaps={sliderCollaps}
        clearAllCondition={clearAllCondition}
        onFieldsChange={onFieldsChange}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default inject("project", "setting")(observer(Project));
