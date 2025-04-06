import { useState } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import Landing from "./routes/Landing";
import Resources from "./routes/Resources";

export const CareRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path= "/Resources" element = {<Resources />} />
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
