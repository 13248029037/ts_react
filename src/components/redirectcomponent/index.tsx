import React from "react";
import { Redirect } from "react-router-dom";
export default function redirectComponent(to: string) {
  const RedirectComponent: React.SFC = (props) => {
    return <Redirect to={to} />;
  };
  return RedirectComponent;
}
