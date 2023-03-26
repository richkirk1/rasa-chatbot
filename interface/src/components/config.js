import { createChatBotMessage } from "react-chatbot-kit";
import ButtonWidget from "./ButtonWidget";

const config = {
  initialMessages: [createChatBotMessage(`Hello! I am Rover, how can I help you with your job search today?`)],
  widgets: [
    {
      widgetName: "buttonWidget",
      widgetFunc: (props) => <ButtonWidget {...props} />
    }
  ]
}

export default config