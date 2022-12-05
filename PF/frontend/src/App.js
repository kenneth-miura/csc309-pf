import React, { useState } from 'react';
import HomePage from './pages/Home'
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar position="sticky"></Navbar>
      </header>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
