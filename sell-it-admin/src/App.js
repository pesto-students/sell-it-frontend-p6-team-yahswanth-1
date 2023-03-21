import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login/Login";
import UserManagmentPage from "./pages/user-managment";
import DashboardPage from "./pages/dashboard";
import BidManagmentPage from "./pages/bid-managment";
import { BlindHeader } from "./components/header/BlindHeader";
import { BlindFooter } from "./components/footer/BlindFooter";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user-managment" element={<UserManagment />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/bid-managment" element={<BidManagment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
