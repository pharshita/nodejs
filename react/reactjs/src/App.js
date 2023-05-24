import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainApi from './container/MainApi';
import NewForm from './component/NewForm';
export default function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainApi/>}></Route>
      <Route path='/newform' element={<NewForm/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>

  )
}

