import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";
import Layout from "../layout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/:id" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
