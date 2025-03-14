import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import { useEffect, useState } from "react";

function Attendance() {
  const location = useLocation();
  const navigate = useNavigate();
  const teacherId = location.state?.teacherId;
  const subjectId = location.state?.subjectId;
  const subjectName = location.state?.subjectName;

  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);

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
          `https://attendancebackend-dktt.onrender.com/api/v1/getAllStudentForAttendance/${subjectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const response = res.data.response.students;
        setStudents(response);

        const initialAttendance = response.map((stu) => ({
          student: stu._id,
          status: "",
        }));
        setRecords(initialAttendance);
      } catch (err) {
        toast.error("No student found", {
          position: "top-right",
        });
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [subjectId]);

  const isAttendanceComplete = () => {
    return records.every((record) => record.status !== "");
  };

  const changeHandler = (studentId, status) => {
    setRecords((prev) =>
      prev.map((entry) =>
        entry.student === studentId ? { ...entry, status } : entry
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAttendanceComplete()) {
      toast.warn("Please fill all entries");
      return;
    }
    if (records.length === 0) {
      toast.warn("No student available so no data has to be submitted");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `https://attendancebackend-dktt.onrender.com/api/v1/takeAttendance/${subjectId}/${teacherId}`,
        { records },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Attendance submitted successfully!");
      console.log("Submit Response:", res.data);
    } catch (err) {
      toast.error("Error submitting attendance.");
      console.error("Submit Error:", err);
    }
  };

  function BackHandler() {
    navigate(-1);
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
        <h4 className="text-3xl font-extrabold mb-8">Attendance for {subjectName}</h4>

        <form onSubmit={handleSubmit} className="bg-[#1b1b2f] p-6 rounded-lg shadow-lg space-y-6">
          {students.length > 0 ? (
            students.map((stu) => (
              <div key={stu._id} className="flex items-center justify-between bg-[#0f3460] p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">{stu.name}</p>

                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`status-${stu._id}`}
                      value="Present"
                      checked={
                        records.find((a) => a.student === stu._id)?.status === "Present"
                      }
                      onChange={() => changeHandler(stu._id, "Present")}
                      className="mr-2"
                    />
                    Present
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`status-${stu._id}`}
                      value="Absent"
                      checked={
                        records.find((a) => a.student === stu._id)?.status === "Absent"
                      }
                      onChange={() => changeHandler(stu._id, "Absent")}
                      className="mr-2"
                    />
                    Absent
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}

          <button
            type="submit"
            className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105"
          >
            Submit Attendance
          </button>
        </form>
      </div>
    </div>
  );
}

export default Attendance;