import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function Studentattendance() {
  const location = useLocation();
  const navigate = useNavigate();
  const teacherId = location.state?.teacherId;
  const subjectId = location.state?.subjectId;

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!teacherId || !subjectId) {
      navigate("/");
    }
  }, [teacherId, subjectId, navigate]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Unauthorized");

        const res = await axios.get(
          `https://attendancebackend-dktt.onrender.com/api/v1/teacherStudentAttendance/${subjectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const response = res.data.StuAttendance;
        setStudents(response);
      } catch (err) {
        toast.error("No student found", {
          position: "top-right",
        });
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [subjectId]);

  function BackHandler() {
    navigate(-1);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2c002e]">
      <div className="w-[80%] max-w-5xl bg-transparent shadow-lg rounded-lg overflow-hidden p-8">

        <button
          onClick={BackHandler}
          className="bg-[#6a0dad] text-white py-2 px-8 rounded-md hover:bg-[#4b0078] transition-transform transform hover:scale-105 mb-8"
        >
          Back
        </button>

        <h2 className="text-3xl font-semibold text-[#e0b0ff] mb-8">Student Attendance</h2>

        {students.length > 0 ? (
          students.map((stu) => (
            <div
              key={stu._id}
              className="flex justify-between items-center bg-transparent border-b-2 border-[#e0b0ff] text-[#e0b0ff] p-4 mb-4 hover:bg-[#4b0078] transition-transform transform hover:scale-105 rounded-lg"
            >
              <h4 className="text-lg font-semibold">{stu.studentName}</h4>
              <p>{stu.attendancePercentage}</p>
            </div>
          ))
        ) : (
          <p className="text-lg text-[#e0b0ff]">No student found</p>
        )}
      </div>
    </div>
  );
}

export default Studentattendance;