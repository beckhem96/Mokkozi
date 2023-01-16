import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyStudy from './pages/MyStudy';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
