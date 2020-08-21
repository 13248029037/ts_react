import React, { useState } from "react";
import style from "./index.less";
import Card from "@/components/systemcard";
import { systemEnum } from "@/config";
interface IProps {
  style?: object;
  title?: string;
  team?: string;
  updateUser: string;
  hancleChange: (tag: number) => void;
}
const SystemInfo: React.SFC = () => {
  const [placerHolder] = useState([1, 2, 3, 4, 5]);
  const onclick = (url: string) => {
    window.open(url);
  };
  return (
    <div className={style.container}>
      {(systemEnum || []).map((item) => (
        <Card
          key={item.id}
          component={item.component}
          title={item.name}
          info={item.info}
          onClick={() => onclick(item.url)}
        />
      ))}
      {placerHolder.map((v) => (
        <div key={v} className={style.place}>
          {v}
        </div>
      ))}
    </div>
  );
};
export default SystemInfo;
