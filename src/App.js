import React from "react";
import Main from "./components/Main";
import { UserContextProvider } from "./context/UserAuthContext";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import { QR } from "./components/QR";
import "bootstrap/dist/css/bootstrap.css";
import { ProtectRoute } from "./components/ProtectRoute";

function App() {
  return (
    <>
      <div id="wrap">
        <UserContextProvider>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              path="/main"
              element={
                <ProtectRoute>
                  <Main />
                </ProtectRoute>
              }
            />
            <Route path="/qrlogin" element={<QR />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
