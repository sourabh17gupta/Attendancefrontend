import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function Student() {
  const location = useLocation();
  const navigate = useNavigate();
  const classId = location.state?.classId;
  const [student, setStudent] = useState([]);

  useEffect(() => {
    if (!classId) {
      navigate("/Class");
    }
  }, [classId, navigate]);

  useEffect(() => {
    const getData = async () => {
      if (!classId) return;
      const token = localStorage.getItem("authToken");

      try {
        const res = await axios.get(
          `https://attendancebackend-dktt.onrender.com/api/v1/getStudent/${classId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setStudent(res.data.students);
        console.log("Data fetched successfully:", res.data.students);
      } catch (err) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
        });
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [classId]);

  const DeleteHandler = async (studentId, studentName, classId) => {
    if (!studentId || !classId) {
      navigate("/Class");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `https://attendancebackend-dktt.onrender.com/api/v1/removestudent1/${classId}/${studentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log("Delete Response:", res);

      toast.success(`${studentName} deleted successfully`, {
        position: "top-right",
      });
      setStudent((prev) => prev.filter((stu) => stu._id !== studentId));
    } catch (err) {
      toast.error("Deletion failed. Please try again", {
        position: "top-right",
      });
      console.error("Error deleting data", err);
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

        <div>
          {student.length > 0 ? (
            student.map((stu) => (
              <div
                key={stu._id}
                className="bg-[#0f3460] p-4 rounded-lg mb-4 hover:bg-[#0e2956] transition-transform transform hover:scale-105"
              >
                <h4 className="text-lg font-semibold">Student: {stu.name}</h4>
                <button
                  onClick={() => DeleteHandler(stu._id, stu.name, classId)}
                  className="mt-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                >
                  DELETE
                </button>
              </div>
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Student;
