import React from "react";
import "./InfoBox.css"
import {ExitIcon} from './ExitIcon.js';



const InfoBox = ({payload, setState, index}) => {

  console.log(payload);
  return (
    <div className="infoBox">
      <button className="closeInfoBox"
        onClick={() => setState((state) => ({ ...state, infoBox: "inactive" }))}
      >
        <ExitIcon/>
      </button>
      <h2 className="title-header">{payload.attachment[index].title.split('-')[0]}</h2>
      <p className="company">{payload.attachment[index].company}</p>
      <div className="description-container">
        <h3 className="description-header">Description</h3>
        <p className="description-content">{payload.attachment[index].description.split('Job Description')[1]}</p>
      </div>
     
      <div ></div>
    </div>
  );
};

export default InfoBox;