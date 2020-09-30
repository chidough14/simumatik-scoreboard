import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Scoreboard from './components/Scoreboard';
import 'antd/dist/antd.css';


function App() {
  return (
    <div className="App">
        <div className="wrapper">
            <Scoreboard />
        </div>
    </div>
  );
}

export default App;
