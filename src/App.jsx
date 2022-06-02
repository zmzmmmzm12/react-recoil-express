import React from "react";
import { Routes, Route } from "react-router-dom";

import Todo from "./pages/Todo";

import "./scss/App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
