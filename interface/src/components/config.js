import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../widgets/Options";
import Carousel from "../widgets/Carousel/Carousel";
import InfoBox from "../widgets/InfoBox";

const config = {
  initialMessages: [createChatBotMessage(`Hello! I am Rover, how can I help you with your job search today?`)],
  state: {
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
    }
  ]
}

export default config