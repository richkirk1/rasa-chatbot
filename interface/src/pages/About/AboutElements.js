import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

import {AiFillGithub,AiOutlineMail} from "react-icons/ai";


export const Header = styled.div`
  align-items: center;
  padding-top:40px;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
`


export const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 50px 90px;
  z-index: 10;
  flex-wrap: wrap;

`;


export const Container = styled.div`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0 0 330px;
  background-image: linear-gradient(to bottom right, #70bee6, #eff2f5);
 
`;

export const Image = styled.img`
  padding: 10px;
  height: 200px;
  width 200px;
`

export const Github = styled(AiFillGithub)`
  padding-left: 2px;
`
export const Mail = styled(AiOutlineMail)`
  padding-left: 2px;
`

export const NavLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
`;

export const MailInfo = styled.p`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
`;


export const Info = styled.div`
  font-weight: light;
  font-size: 12px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  
`
