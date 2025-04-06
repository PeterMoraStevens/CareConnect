import { useState } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import Landing from "./routes/Landing";
import Resources from "./routes/Resources";
import AddOrganization from "./components/AddOrganization";
import OrgSignUp from "./routes/OrgSignUp";
import OrgSignIn from "./routes/OrgSignIn";
import Profiles from "./routes/Profiles";

export const CareRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Resources" element={<Resources />} />
      <Route path="/AddOrganization" element={<AddOrganization />} />
      <Route path="/SignUpOrg" element={<OrgSignUp />} />
      <Route path="/SignInOrg" element={<OrgSignIn />} />
      <Route path="/orgProfile" element={<Profiles/>}/>
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
