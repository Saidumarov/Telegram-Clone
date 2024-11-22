import { Route, Routes, Navigate } from "react-router-dom";
import Chat from "../pages/Chat";
import Layout from "../layout";
import Auth from "../auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/AuthProvider";

const Router = () => {
  const { token } = useAuth();
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route
          path="/auth"
          element={token ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/"
          element={token ? <Layout /> : <Navigate to="/auth" replace />}
        >
          <Route path="/:id" element={<Chat />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
