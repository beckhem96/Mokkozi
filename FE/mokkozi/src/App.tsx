import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/home.page';
import MyStudy from './pages/study.page';
import Post from './pages/post.page';
import Calendar from './pages/calelndar.page';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="mystudy/:userId" element={<MyStudy />}></Route>
          {/* userId로 해당 사용자만 접급할 수 있는거 찾아보도록 */}
          {/* <Route path="login" element={<Login />}></Route> */}
          <Route path="post" element={<Post />}></Route>
          <Route path="mystudy/:userId/calendar" element={<Calendar />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
