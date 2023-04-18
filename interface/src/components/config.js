import { createChatBotMessage } from "react-chatbot-kit";
import io from '../socketio';
import Options from "../widgets/Options";
import Carousel from "../widgets/Carousel/Carousel";
import InfoBox from "../widgets/InfoBox";


import UploadBox from "../UploadBox";

const socket = io("http://localhost:5005/");
const config = {
  initialMessages: [
    createChatBotMessage(`Hello friend, my name is Rover. I am here to help you on your job search today!`,
      {
        widget: "upload",
      }),
  createChatBotMessage("1. Ask questions?", 
      {
        delay: 500,
      }),
  createChatBotMessage("2. Upload your resume",
      {
        delay: 500,
      }
  )
],
  state: {
    socket: socket,
    infoBox: "inactive",
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />
    },
    {
      widgetName: "carousel",
      widgetFunc: (props) => <Carousel {...props} />,
      mapStateToProps: ["infoBox"],
    },
    {
      widgetName: "infobox",
      widgetFunc: (props) => <InfoBox {...props} />,
      mapStateToProps: ["infoBox"],
    },
    {
      widgetName: "upload",
      widgetFunc: (props) => <UploadBox {...props} />,
    }
  ]
}



export default config