import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import IntroPage from './pages/IntroPage';
import NetworkPage from './pages/NetworkPage';
import UserIdPage from './pages/UserIdPage';
import MyPage from './pages/MyPage';
import UsersPage from './pages/UsersPage';

const App = () => {
  return (
    <Routes>
      <Route path="/intro" element={<IntroPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/network" element={<NetworkPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/:id" element={<UserIdPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};

export default App;
