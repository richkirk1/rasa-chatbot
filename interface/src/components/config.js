import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../widgets/Options";
import Carousel from "../widgets/Carousel";

const config = {
  initialMessages: [createChatBotMessage(`Hello! I am Rover, how can I help you with your job search today?`)],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />
    },
    {
      widgetName: "carousel",
      widgetFunc: (props) => <Carousel {...props} />
    }
  ]
}

export default config