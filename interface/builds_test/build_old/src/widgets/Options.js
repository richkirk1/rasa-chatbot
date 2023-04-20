import React from "react";
import "./Options.css";

const Options = (props) => {
  const options = props.payload.options;
  const optionsMarkup = options.map((button, index) => (
    <button
      className="button option"
      key={index}
      onClick={() => {
        console.log(button.title);
        props.actionProvider.addUserMessage(button.title)
      }}
    >
      {button.title}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};

export default Options;