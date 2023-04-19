
import React from "react";
import kirby from '../../icons/kirby.png';
import pikachu from '../../icons/pikachu.png';
import eve from '../../icons/eve.png';
import mimikyu from '../../icons/mimikyu.png';
import vulpix from '../../icons/vulpix.png';
import cubone from '../../icons/cubone.png';

import {Main, Image, Container, Github, NavLink, Info, Mail, MailInfo, Header} from './AboutElements';
import './About.css';


const About = () => {
    return(
        <div style={{padding: 20,}}>
            <Header>Meet the Team</Header>
            <Main>
                <Container>
                    <Image src={eve}
                        alt="eve"/>
                    Nick Dalessandro
                    <Info>
                    <NavLink to="https://github.com/nickdalessandro ">nickdalessandro <Github/></NavLink>
                    <MailInfo onclick={() =>  navigator.clipboard.writeText('dalessandro.40@osu.edu')}>dalessandro.40@osu.edu <Mail/></MailInfo>
                    </Info>
                </Container>
                <Container>
                    <Image src={mimikyu}
                        alt="mimikyu"/>
                    Jena Fogarty
                    <Info>
                    <NavLink to="https://github.com/jenafogarty ">jenafogarty <Github/></NavLink>
                    <MailInfo onclick={() =>  navigator.clipboard.writeText('jenanealfogarty@gmail.com')}>jenanealfogarty@gmail.com <Mail/></MailInfo>
                    </Info>
                </Container>
                <Container>
                    <Image src={pikachu}
                        alt="pikachu"/>
                    Rich Kirk
                    <Info>
                    <NavLink to="https://github.com/richkirk1 ">richkirk1 <Github/></NavLink>
                    <MailInfo onclick={() =>  navigator.clipboard.writeText('kirk.391@osu.edu')}>kirk.391@osu.edu <Mail/></MailInfo>
                    </Info>
                </Container>
                <Container>
                    <Image src={vulpix}
                        alt="vulpix"/>
                    Chase Long
                    <Info>
                    <NavLink to="https://github.com/briefchase ">briefchase <Github/></NavLink>
                    <MailInfo onclick={() =>  navigator.clipboard.writeText('long.1669@osu.edu')}>long.1669@osu.edu <Mail/></MailInfo>
                    </Info>
                </Container>
                <Container>
                    <Image src={cubone}
                        alt="cubone"/>
                    Zack Wang
                    <Info>
                    <NavLink to="https://github.com/Wannng1022">wannng1022 <Github/></NavLink>
                    <MailInfo onclick={() =>  navigator.clipboard.writeText('wang.14515@osu.edu')}>wang.14515@osu.edu <Mail/></MailInfo>
                    </Info>
                </Container>
                <Container>
                    <Image src={kirby}
                        alt="kirby"/>
                    Jingxin Zhang
                    <Info>
                    <NavLink to="https://github.com/Ivy1627 ">Ivy1627 <Github/></NavLink>
                    <MailInfo onclick={() =>  navigator.clipboard.writeText('zhang.11041@osu.edu')}>zhang.11041@osu.edu <Mail/></MailInfo>
                    </Info>
                </Container>
            </Main>
        </div>
    )
}

export default About;