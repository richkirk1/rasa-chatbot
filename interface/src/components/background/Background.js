import React from "react";

import "./Background.css";

const Background = (props) => {
  return <div className="app-gradient">{props.children}</div>;
};

export default Background;