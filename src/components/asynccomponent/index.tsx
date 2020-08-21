import React from "react";
import Loadable from "react-loadable";
const loadingComponent = () => {
  return <div>loading...</div>;
};
export default function asyncComponent(
  importComponent: () => Promise<{
    default: React.ComponentClass | React.StatelessComponent;
  }>
) {
  return Loadable({
    loader: importComponent,
    loading: loadingComponent,
  });
}
