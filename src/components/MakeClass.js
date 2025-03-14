import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

function MakeClass() {
  const navigate = useNavigate();
  const [cls, setClass] = useState({
    name: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setClass((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!cls.name) {
      toast.warn("Please fill all fields!", { position: "top-right" });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      console.log("Submitting class:", cls);

      const res = await axios.post(`https://attendancebackend-dktt.onrender.com/api/v1/createclass`, cls, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setClass({ name: "" });
      toast.success("Class created successfully", { position: "top-right" });
      navigate("/AdminDashboard");
      console.log("Class created successfully!", res.data);
    } catch (err) {
      toast.error("Class creation failed. Please try again", { position: "top-right" });
      console.error("Error posting data", err);
    }
  };

  function BackHandler() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={BackHandler}
          className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105 mb-6"
        >
          Back
        </button>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Class Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={cls.name}
              onChange={changeHandler}
              className="w-full p-3 rounded-lg bg-[#0f3460] text-white focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
              placeholder="Enter Class Name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0f3460] text-white py-3 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MakeClass;
