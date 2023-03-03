import React from 'react';
import MainLayout from '../styles/Home';
import Button from '../styles/Button';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <MainLayout>
      <h1>카테고리</h1>
      <div className="newPost">
        <Button>
          <NavLink to={'post'}>새 글 쓰기</NavLink>
        </Button>
      </div>
      <div>
        <Button>JavaScript</Button>
        <Button>TypeScript</Button>
      </div>
    </MainLayout>
  );
}

export default Home;
