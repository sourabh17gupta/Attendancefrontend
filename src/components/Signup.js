import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    ID: "",
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navToLogin = () => navigate("/Login");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.role || !formData.ID || !formData.password) {
      toast.warn("Please fill all fields!", { position: "top-right" });
      return;
    }

    try {
      await axios.post("https://attendancebackend-dktt.onrender.com/api/v1/Signup", formData);
      toast.success("Signup successful!", { position: "top-right" });
      setFormData({ name: "", email: "", ID: "", password: "", role: "" });
      navToLogin();
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-[#2c002e] to-[#4b0078] p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <form onSubmit={submitHandler} className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#4b0078] mb-4">Create an Account</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={changeHandler} placeholder="Enter your name" className="mt-1 p-2 w-full border rounded-lg" />
            </div>

            <div>
              <label htmlFor="ID" className="block text-sm font-medium text-gray-700">ID:</label>
              <input type="text" name="ID" id="ID" value={formData.ID} onChange={changeHandler} placeholder="Enter your ID" className="mt-1 p-2 w-full border rounded-lg" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={changeHandler} placeholder="Enter your email" className="mt-1 p-2 w-full border rounded-lg" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={changeHandler} placeholder="Enter a password" className="mt-1 p-2 w-full border rounded-lg" />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
              <select name="role" id="role" value={formData.role} onChange={changeHandler} className="mt-1 p-2 w-full border rounded-lg">
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full mt-6 bg-[#4b0078] text-white py-2 px-4 rounded-lg hover:bg-[#350055] transition-transform transform hover:scale-105">
            Sign Up
          </button>

          <p className="text-sm mt-4">Already have an account? <span onClick={navToLogin} className="text-[#4b0078] cursor-pointer hover:underline">Log in</span></p>
        </form>

        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img src={signup} alt="Signup" className="w-full h-full object-cover" />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;