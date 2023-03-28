import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login/Login";
import UserManagmentPage from "./pages/user-managment";
import DashboardPage from "./pages/dashboard";
import BidManagmentPage from "./pages/bid-managment";
import { BlindHeader } from "./components/header/BlindHeader";
import { BlindFooter } from "./components/footer/BlindFooter";
import PrivateRoute from "./routes";

const Home = () => {
  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
    </>
  );
};
const Login = () => {
  return (
    <>
      <div>
        <BlindHeader />
        <LoginPage />
        <BlindFooter />
      </div>
    </>
  );
};

const UserManagment = () => {
  return (
    <>
      <div>
        <Layout>
          <UserManagmentPage />
        </Layout>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <div>
        <Layout>
          <DashboardPage />
        </Layout>
      </div>
    </>
  );
};

const BidManagment = () => {
  return (
    <>
      <div>
        <Layout>
          <BidManagmentPage />
        </Layout>
      </div>
    </>
  );
};

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("admin"));

    if (login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<PrivateRoute isLoggedIn={login} />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/user-managment" element={<UserManagment />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/bid-managment" element={<BidManagment />}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
