import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/home";
import LoginPage from "./pages/login/Login";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
