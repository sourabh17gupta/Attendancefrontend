import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentId = location.state?.studentId;
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!studentId) navigate("/"); // Redirect to login if no studentId
  }, [studentId, navigate]);

  useEffect(() => {
    const getData = async () => {
      if (!studentId) return;
      const token = localStorage.getItem("authToken");

      try {
        const res = await axios.get(
          `https://attendancebackend-dktt.onrender.com/api/v1/getStudentSubjectsWithAttendance/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setSubjects(res.data.subjects);
        console.log("Data fetched successfully:", res.data);
      } catch (err) {
        toast.error("Unauthorized access. Please log in again.");
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [studentId]);

  function AnnouncementHandler() {
    navigate("/Announcement", { state: { studentId } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c002e] to-[#4b0078] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Student Dashboard</h1>

        <button
          onClick={AnnouncementHandler}
          className="mb-8 bg-[#4b0078] text-white py-2 px-6 rounded-lg hover:bg-[#350055] transition-transform transform hover:scale-105"
        >
          View Announcements
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.length > 0 ? (
            subjects.map((sub, index) => (
              <div
                key={index}
                className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-2xl font-semibold mb-2">{sub.subjectName}</h4>
                <p className="text-lg">Attendance: {sub.attendancePercentage}</p>
              </div>
            ))
          ) : (
            <p className="text-lg col-span-full">No subjects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
