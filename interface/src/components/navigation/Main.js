import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import About from '../../pages/About/About';

const Main = () => {
  return (
    <Routes> 
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/about' element={<About/>}></Route>
    </Routes>
  );
}

export default Main;