import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function Announcement() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentId = location.state?.studentId;
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    if (!studentId) navigate("/"); // Redirect to login if no studentId
  }, [studentId, navigate]);

  useEffect(() => {
    const getData = async () => {
      if (!studentId) return;
      const token = localStorage.getItem("authToken");

      try {
        const res = await axios.get(
          `https://attendancebackend-dktt.onrender.com/api/v1/getAnnouncement/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const formattedAnnouncements = res.data.announcements.map((item) => ({
          ...item,
          date: new Date(item.date).toISOString().split("T")[0],
        }));

        setAnnouncements(formattedAnnouncements);
        console.log("Data fetched successfully:", formattedAnnouncements);
      } catch (err) {
        toast.error("Unauthorized access. Please log in again.");
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [studentId]);

  function BackHandler() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold">Announcements</h1>
          <button
            onClick={BackHandler}
            className="bg-[#0f3460] text-white py-2 px-6 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105"
          >
            Back
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {announcements.length > 0 ? (
            announcements.map((item, index) => (
              <div
                key={index}
                className="bg-[#1b1b2f] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h4 className="text-2xl font-semibold mb-4">{item.message}</h4>
                <p className="text-lg">Date: {item.date}</p>
                <p className="text-lg">Subject: {item.subject?.name || "N/A"}</p>
              </div>
            ))
          ) : (
            <p className="text-lg col-span-full">No announcements available.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Announcement;
