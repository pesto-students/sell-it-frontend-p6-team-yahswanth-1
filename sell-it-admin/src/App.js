import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/home";

const Home = () => {
  return (
    <>
      <Layout>
        <HomePage />
      </Layout>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
