import { useState } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import Landing from "./routes/Landing";

export const CareRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <CareRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
