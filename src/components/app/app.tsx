import React from "react";
import AppHeader from "../app-header/app-header";
import Home from "../../pages/home/home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <AppHeader />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
