import React, { useState } from "react";
import { Select, Spin } from "antd";
import { userListNormal } from "@/api";
import { debounce, Trim } from "@/utils/function";
const { Option } = Select;
interface IProps {
  style?: React.CSSProperties;
  placeholder?: string;
  value?: string;
  onChange?: (params?) => void;
}
interface IResult {
  data: IOption[];
}
interface IOption {
  user_name: string;
}
const MySelect: React.SFC<IProps> = (props) => {
  const [options, setOptions] = useState<IOption[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const onSearch = debounce(async (user_name) => {
    const str = Trim(user_name);
    if (!str) {
      return;
    }
    setFetching(true);
    try {
      let result: IResult = await userListNormal<IResult>({
        page_no: 1,
        page_size: 100000,
        user_name: str,
        noLoading: true,
      });
      setFetching(false);
      setOptions(result.data || []);
    } catch (error) {
      setFetching(false);
    }
  }, 800);
  return (
    <Select
      onChange={props.onChange}
      style={props.style}
      showSearch={true}
      placeholder={props.placeholder || "请输入"}
      optionFilterProp="children"
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      allowClear={true}
      value={props.value}
      notFoundContent={fetching ? <Spin size="small" /> : null}
    >
      {options.map((item) => (
        <Option key={item.user_name} value={item.user_name}>
          {item.user_name}
        </Option>
      ))}
    </Select>
  );
};
export default MySelect;
