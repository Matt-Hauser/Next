import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import BattleApp from "./components/BattleApp";
import TestBattle from "./components/TestBattle";
function App() {
  return (
    <div className="App">
      <TestBattle />
    </div>
  );
}

export default App;
