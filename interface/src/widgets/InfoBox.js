import React from "react";
import "./InfoBox.css"


const InfoBox = ({payload, setState, index}) => {

  return (
    <div className="infoBox">
      <button className="closeInfoBox"
        onClick={() => setState((state) => ({ ...state, infoBox: "inactive" }))}
      >
      </button>

      {payload.attachment[index].company}
     
      <div ></div>
    </div>
  );
};

export default InfoBox;