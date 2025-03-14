import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

function Class() {
  const location = useLocation();
  const navigate = useNavigate();
  const adminId = location.state?.adminId;
  const classId = location.state?.classId;
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    if (!classId) {
      navigate("/AdminDashboard"); // Navigate to Admin Dashboard
    }
  }, [classId, navigate]);

  useEffect(() => {
    const getData = async () => {
      if (!classId) return;

      const token = localStorage.getItem("authToken");

      try {
        const res = await axios.get(
          `https://attendancebackend-dktt.onrender.com/api/v1/getsubject/${classId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setSubject(res.data.subject);

        console.log("Data fetched successfully:", res.data.subject);
      } catch (err) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
        });
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [classId]);

  function AddStuHandler() {
    navigate("/AddStudent", { state: { adminId, classId } });
  }

  function DeleteStuHandler() {
    navigate("/DeleteStudent", { state: { adminId, classId } });
  }

  function StuHandler() {
    navigate("/Student", { state: { adminId, classId } });
  }

  function createSubHandler() {
    navigate("/CreateSubject", { state: { adminId, classId } });
  }

  function BackHandler() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <ToastContainer position="top-right" />
      <div className="max-w-4xl mx-auto">
        <button
          onClick={BackHandler}
          className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105 mb-6"
        >
          Back
        </button>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={AddStuHandler}
            className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform hover:scale-105"
          >
            Add Student
          </button>
          <button
            onClick={DeleteStuHandler}
            className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform hover:scale-105"
          >
            Delete Student
          </button>
          <button
            onClick={StuHandler}
            className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform hover:scale-105"
          >
            Student
          </button>
          <button
            onClick={createSubHandler}
            className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform hover:scale-105"
          >
            Create Subject
          </button>
        </div>

        <div>
          {subject.length > 0 ? (
            subject.map((sub, index) => (
              <div
                key={index}
                className="bg-[#0f3460] p-4 rounded-lg mb-4 hover:bg-[#0e2956] transition-transform transform hover:scale-105"
              >
                <p className="text-lg font-semibold">{sub.name}</p>
                <p className="text-sm">Teacher: {sub.teacher.name}</p>
              </div>
            ))
          ) : (
            <p>No Subject Created</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Class;
