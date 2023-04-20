import { ConditionallyRender } from "react-util-kit";
import { Chatbot } from 'react-chatbot-kit';
import React, { useState } from "react";


import Background from '../../components/background/Background';
import Docs from './Docs/Docs';

import MessageParser from '../../components/chatbot/MessageParser';
import ActionProvider from '../../components/chatbot/ActionProvider';
import config from '../../components/chatbot/config';

import {Header, Image, Content, Main, Container, Info, Rover,ChatButton} from './HomeElements';
import 'react-chatbot-kit/build/main.css';
import './Interface.css';
import './Chatbot.css';

import rover from '../../icons/rover.png';



const Home = () => {
    const [displayChatbot, toggleChatbot] = useState(true);

    return(
        
        <div>
        <Background>
            <Header>Meet Rover</Header>
            <Image src={rover}></Image>
            <Content>Your new fluffy friend who is here to help you on your job search.</Content>
            <Main>
                <Header>Get started now</Header>
                <Container>
                    <Info> You can start your job search by uploading your resume or by telling Rover you're looking for a job.</Info>
                </Container>
            </Main>
            <div className='chatbot-container'>
                <ConditionallyRender
                    ifTrue={displayChatbot}
                    show={
                    <Chatbot 
                        config={config}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        headerText='Rover Support'
                    />
                    }
                />
            </div>
            <ChatButton
            onClick={() => toggleChatbot((prev) => !prev)}
            ><Rover src={rover}></Rover></ChatButton>
        </Background>
        <Docs/>
        </div>
    )
}

export default Home;

