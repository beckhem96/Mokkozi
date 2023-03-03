import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/home.page';
import MyStudy from './pages/MyStudy.page';
import Post from './pages/post.page';
// import Login from './pages/login.page';
// 아래는 뭐 어따 쓰는건지?
// declare function BrowserRouter(props: BrowserRouterProps): React.ReactElement;
// interface BrowserRouterProps {
//   basename?: string;
//   children?: React.ReactNode;
//   window?: Window;
// }

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
