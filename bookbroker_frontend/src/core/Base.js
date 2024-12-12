import React from "react";
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Base;
