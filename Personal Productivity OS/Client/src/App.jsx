import { useEffect } from "react";
import { subscribeUser } from "./utils/subscriber";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-toastify";
import "./App.css";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Calendar from "./pages/Dashboard/Calendar";
import Pomodoro from "./pages/Dashboard/pomodoro";
import Home from "./pages/HomePage";
import Note from "./pages/Dashboard/note";
import Project from "./pages/Dashboard/project";
import Task from "./pages/Dashboard/task";


function App() {
  useEffect(() => {
    subscribeUser();
  }, []);
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={ <Login/>} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Calendar/>} />
            <Route path="/task" element={<Task />} />
            <Route path="/note" element={ <Note/>} />
            <Route path="/project" element={<Project />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
          </Routes>
        </Router>
      </div>

      <Toaster toastOptions={{className: "", style: {fontSize: "13px"}}}/>
    </UserProvider>
  );
}

export default App;
