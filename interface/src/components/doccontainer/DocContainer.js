import React from "react";

import "./DocContainer.css";

const DocsContainer = ({title, children }) => {
  return (
    <div className="app-docs-container">
      <h1 className="app-docs-container-header">
       {title}
      </h1>
      {children}
    </div>
  );
};

export default DocsContainer;