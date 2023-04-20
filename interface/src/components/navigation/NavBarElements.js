import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

import {FaHome} from "react-icons/fa";


export const Nav = styled.nav`
  height: 50px;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  width: 100%;
  gap: 10px;
  z-index: 12;
  background-color: white;
  box-shadow: 5px 1px 5px 1px #514f4f;
`;
  
export const NavLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  padding: 0 1rem;
  cursor: pointer;
  &.active {
    color: #75C5ED;
    fill: #75C5ED;
  }
`;
  
export const Home = styled(FaHome)`

  &.active {
    color: #75C5ED;
  }

`
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

`;

