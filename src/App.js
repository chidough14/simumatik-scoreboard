import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Scoreboard from './components/Scoreboard';
import 'antd/dist/antd.css';


function App() {
  return (
    <div className="App">
        <div className="img_logo">
            <img src="https://simumatik.com/wp-content/uploads/2020/05/simumatik-full-logo-1.png"  alt="logo" />
        </div>
        <div className="wrapper">
            <Scoreboard />
        </div>
    </div>
  );
}

export default App;
