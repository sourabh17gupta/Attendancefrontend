import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.png";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.warn("Please fill all fields!", { position: "top-right" });
      return;
    }

    try {
      const res = await axios.post("https://attendancebackend-dktt.onrender.com/api/v1/login", formData, {
        withCredentials: true,
      });

      const token = res.data.response.token;
      localStorage.setItem("authToken", token);

      toast.success("Login successful!", { position: "top-right" });
      setFormData({ email: "", password: "" });

      const { role, _id } = res.data.response;
      if (role === "teacher") navigate("/TeacherDashboard", { state: { teacherId: _id } });
      else if (role === "student") navigate("/StudentDashboard", { state: { studentId: _id } });
      else if (role === "admin") navigate("/AdminDashboard", { state: { adminId: _id } });
    } catch (err) {
      toast.error("Login failed! Please try again.", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-[#2c002e] to-[#4b0078] p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <form onSubmit={submitHandler} className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#4b0078] mb-4">Welcome Back</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={changeHandler} placeholder="Enter your email" className="mt-1 p-2 w-full border rounded-lg" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={changeHandler} placeholder="Enter your password" className="mt-1 p-2 w-full border rounded-lg" />
            </div>
          </div>

          <button type="submit" className="w-full mt-6 bg-[#4b0078] text-white py-2 px-4 rounded-lg hover:bg-[#350055] transition-transform transform hover:scale-105">
            Login
          </button>

          <p className="text-sm mt-4">Don't have an account? <span onClick={() => navigate("/")} className="text-[#4b0078] cursor-pointer hover:underline">Sign Up</span></p>
        </form>

        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img src={login} alt="Login Visual" className="w-full h-full object-cover" />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
