import React from 'react';
import { Nav, NavLink, Home, NavMenu} 
    from "./NavBarElements";


const NavBar = () => {
    return (
        <Nav>
            <NavMenu>
            <NavLink to="/"><Home/> </NavLink>
            <NavLink className="nav-link" to="/about"> About Us </NavLink>
            <NavLink className="nav-link" to="https://github.com/richkirk1/rasa-chatbot"> Github </NavLink>
            </NavMenu>
        </Nav>
    )
}

export default NavBar;