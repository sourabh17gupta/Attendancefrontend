import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function TeacherDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const teacherId = location.state?.teacherId;
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    if (!teacherId) navigate("/"); // Redirect to login if no teacherId
  }, [teacherId, navigate]);

  useEffect(() => {
    const getData = async () => {
      if (!teacherId) return;
      const token = localStorage.getItem("authToken");

      try {
        const res = await axios.get(
          `https://attendancebackend-dktt.onrender.com/api/v1/getSubjectsForTeacher/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setSubject(res.data.subjects);
        console.log("Data fetched successfully:", res.data);
      } catch (err) {
        toast.error("Unauthorized access. Please log in again.");
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [teacherId]);

  const AnnouncementHandler = (subjectId, subjectName) => {
    navigate("/CreateAnnouncement", { state: { subjectId, teacherId, subjectName } });
  };

  const AttendanceHandler = (subjectId, subjectName) => {
    navigate("/Attendance", { state: { subjectId, teacherId, subjectName } });
  };

  const StudentAttendanceHandler = (subjectId, subjectName) => {
    navigate("/Studentattendance", { state: { subjectId, teacherId, subjectName } });
  };

  return (
    <div className="min-h-screen bg-[#2c002e] text-[#e0b0ff] p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-extrabold">Teacher Dashboard</h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {subject.length > 0 ? (
            subject.map((sub, index) => (
              <div
                key={index}
                className="bg-[#6a0dad] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <h4 className="text-3xl font-semibold mb-6">{sub.name}</h4>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => AnnouncementHandler(sub._id, sub.name)}
                    className="bg-[#4b0078] text-white py-2 px-6 rounded-lg hover:bg-[#320053] transition-transform transform hover:scale-110"
                  >
                    Announcement
                  </button>
                  <button
                    onClick={() => AttendanceHandler(sub._id, sub.name)}
                    className="bg-[#4b0078] text-white py-2 px-6 rounded-lg hover:bg-[#320053] transition-transform transform hover:scale-110"
                  >
                    Attendance
                  </button>
                  <button
                    onClick={() => StudentAttendanceHandler(sub._id, sub.name)}
                    className="bg-[#4b0078] text-white py-2 px-6 rounded-lg hover:bg-[#320053] transition-transform transform hover:scale-110"
                  >
                    Student
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-2xl col-span-full">No subjects assigned.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
