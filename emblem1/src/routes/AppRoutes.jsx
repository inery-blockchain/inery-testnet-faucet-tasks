import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../main/Main";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
    </Routes>
  );
}

export default AppRoutes;
