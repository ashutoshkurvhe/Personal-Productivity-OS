import { useEffect } from "react";
import { subscribeUser } from "./utils/subscriber";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "./context/userContext";
import "./App.css";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import CalendarEvent from "./pages/Dashboard/CalendarEvents";
import Pomodoro from "./pages/Dashboard/pomodoro";
import Home from "./pages/Dashboard/Home";
import Note from "./pages/Dashboard/note";
import Project from "./pages/Dashboard/project";
import Task from "./pages/Dashboard/task";



function App() {
  useEffect(() => {
    subscribeUser();
  }, []);
  return (
    <UserProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<SignUp/>} />
            <Route path="/dashboard" element={<Home/>} />
            <Route path="/note" element={<Note/>} />
            <Route path="/task" element={<Task/>} />
            <Route path="/project" element={<Project/>} />
            <Route path="/pomodoro" element={<Pomodoro/>} />
            <Route path="/event" element={<CalendarEvent/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>      
 </UserProvider>
  );
}

export default App;


const Root = () => {
  //Check if token exists in localstorage
  const isAuthenticates = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticates ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
