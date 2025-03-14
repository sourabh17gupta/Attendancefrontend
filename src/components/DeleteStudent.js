import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-toastify";
import { useState } from "react";

function DeleteStudent() {
  const location = useLocation();
  const navigate = useNavigate();
  const classId = location.state?.classId;
  const [student, setStudent] = useState({
    ID: "",
  });

  const isStudentId = () => student.ID !== "";

  const DeleteStuHandler = async (e) => {
    e.preventDefault(); // Prevent form submission reload

    if (!classId || !isStudentId()) {
      toast.warn("Please provide a student ID", { position: "top-right" });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      console.log("Submitting student deletion:", student);
      console.log("Class ID:", classId);

      const res = await axios.post(
        `https://attendancebackend-dktt.onrender.com/api/v1/removeStudent/${classId}`,
        student,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(
        `${res.data.student?.name || "Student"} deleted successfully`,
        { position: "top-right" }
      );
      navigate(-1);
    } catch (err) {
      toast.error("Student deletion failed. Please try again", {
        position: "top-right",
      });
      console.error("Error deleting data", err);
    }
  };

  function BackHandler() {
    navigate(-1);
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={BackHandler}
          className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105 mb-6"
        >
          Back
        </button>
        <form onSubmit={DeleteStuHandler} className="space-y-6">
          <div>
            <label htmlFor="ID" className="block mb-2 text-sm font-medium">
              Student ID:
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              value={student.ID}
              onChange={changeHandler}
              className="w-full p-3 rounded-lg bg-[#0f3460] text-white focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
              placeholder="Enter Student ID"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
          >
            DELETE
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteStudent;
