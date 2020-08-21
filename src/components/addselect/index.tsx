import React, { useState } from "react";
import { Select, Divider, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.less";
const { Option } = Select;
interface IProps {
  style?: React.CSSProperties;
  placeholder?: string;
  value?: string;
  onChange?: (params?: string) => void;
  optionList?: string[];
  allowClear?: boolean;
}
const MySelect: React.SFC<IProps> = (props) => {
  const [optionList, setOptionList] = useState(props.optionList || []);
  const [addOption, setAddOption] = useState<string>("");
  const onChange = (e) => {
    setAddOption(e.target.value);
  };
  const onSelectChange = (v: string) => {
    props.onChange(v);
  };
  const addItem = () => {
    if (addOption) {
      setOptionList([...optionList, addOption]);
      setAddOption("");
    }
  };
  return (
    <Select
      allowClear={props.allowClear}
      className={styles.container}
      style={props.style}
      onChange={onSelectChange}
      value={props.value}
      placeholder={props.placeholder}
      showSearch={true}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider style={{ margin: "4px 0" }} />
          <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
            <Input
              style={{ flex: "auto" }}
              value={addOption}
              onChange={onChange}
            />
            <Button onClick={addItem} type="link">
              <PlusOutlined /> Add item
            </Button>
          </div>
        </div>
      )}
    >
      {optionList.map((v) => (
        <Option key={v} value={v}>
          {v}
        </Option>
      ))}
    </Select>
  );
};
export default MySelect;
