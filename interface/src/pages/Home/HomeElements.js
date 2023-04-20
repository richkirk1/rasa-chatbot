import styled from "styled-components";


export const Header = styled.div`
  align-items: center;
  padding-top:30px;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 30px;
  color: #fff;
`


export const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction:Column;
  padding-top: 50px;
  z-index: 10;
  flex-wrap: wrap;
`;


export const Container = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-radius: 10px;
  display: flex;
  background: #7ED4FF;
  padding: 10px;
  max-width: 300px;
`;

export const Image = styled.img`
  display: center;
  border-radius: 10px;
  height: 350px;
  width: 350px;
`

export const Rover = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  position: fixed;
  z-index: 9999;
  right: 40px;
  bottom: 21.5px;
  cursor: pointer;
`

export const ChatButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: none;
  position: fixed;
  z-index: 9999;
  right: 40px;
  bottom: 21.5px;
  cursor: pointer;
`

export const Content = styled.p`
  color: #fff;
  font-weight:bold;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
`;


export const Info = styled.div`
  color:white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
  
`
