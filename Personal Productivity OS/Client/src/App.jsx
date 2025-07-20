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
import Pomodoro from "./pages/Dashboard/Pomodoro";
import Home from "./pages/Dashboard/Home";
import Note from "./pages/Dashboard/Note";
import Project from "./pages/Dashboard/Project";
import Task from "./pages/Dashboard/Task";



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
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/notes" element={<Note />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/events" element={<CalendarEvent />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </Router>
      </div>
 </UserProvider>
  );
}

export default App;


const Root = () => {
  //Check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
