import React from "react";
type Tag = "input" | "select" | "date" | "inputnumber" | "time";
interface IOptionListItem {
  id?: number | string;
  name: string | number | symbol;
}
export interface IConfigListItem {
  id: number;
  label: string;
  tag: Tag;
  value: string;
  placeholder: string;
  optionList: IOptionListItem[];
  optionIndex: string;
  style: React.CSSProperties;
  defaultValue: string | number;
}
export type PartialIConfigListItem = Partial<IConfigListItem>[];
interface keyValue {
  [key: string]: string | number;
}
export interface IProps {
  configList?: PartialIConfigListItem;
  searchForm?: (params: keyValue) => void;
  clearForm?: () => void;
}
