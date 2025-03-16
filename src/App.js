import { NavLink, Route, Routes } from "react-router";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Announcement from "./components/Announcement";
import CreateAnnouncement from "./components/CreateAnnouncement";
import Attendance from "./components/Attendance";
import Class from "./components/Class";
import MakeClass from "./components/MakeClass";
import CreateSubject from "./components/CreateSubject";
import AddStudent from "./components/AddStudent";
import DeleteStudent from "./components/DeleteStudent";
import Student from "./components/Student";
import { Toaster } from "react-hot-toast";
import Studentattendance from "./components/Studentattendance";

function App() {
  return (
    <div className="App">

     <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
        <Route path="/StudentDashboard" element={<StudentDashboard/>}></Route>
        <Route path="/TeacherDashboard" element={<TeacherDashboard/>}></Route>
        <Route path="/Announcement" element={<Announcement/>}></Route>
        <Route path="/CreateAnnouncement" element={<CreateAnnouncement/>}></Route>
        <Route path="/Attendance" element={<Attendance/>}></Route>
        <Route path="/Class" element={<Class/>}></Route>
        <Route path="/MakeClass" element={<MakeClass/>}></Route>
        <Route path="/CreateSubject" element={<CreateSubject/>}></Route>
        <Route path="/AddStudent" element={<AddStudent/>}></Route>
        <Route path="/DeleteStudent" element={<DeleteStudent/>}></Route>
        <Route path="/Student" element={<Student/>}></Route>
        <Route path="/Studentattendance" element={<Studentattendance/>}></Route>

     </Routes>
    </div>
  );
}

export default App;
