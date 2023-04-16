import React from "react";
import "./InfoBox.css"



const InfoBox = ({payload, setState, index}) => {

  console.log(payload);
  return (
    <div className="infoBox">
      <button className="closeInfoBox"
        onClick={() => setState((state) => ({ ...state, infoBox: "inactive" }))}
      >
      </button>
      <h2>{payload.attachment[index].title.split('-')[0]}</h2>
      <p>{payload.attachment[index].company}</p>
      <h3>Description:</h3>
      <p>{payload.attachment[index].description.split('Job Description')[1]}</p>
     
      <div ></div>
    </div>
  );
};

export default InfoBox;