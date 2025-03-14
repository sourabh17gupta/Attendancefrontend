import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const adminId = location.state?.adminId;
  const [cls, setClass] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const res = await axios.get("https://attendancebackend-dktt.onrender.com/api/v1/getClass", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setClass(res.data.res);
        console.log("Data fetched successfully:", res.data.res);
      } catch (err) {
        toast.error("Unauthorized access. Please log in again.", {
          position: "top-right",
        });
        console.error("Error fetching data:", err);
      }
    };

    getData();
  }, [adminId]);

  function clsHandler(classId) {
    navigate("/Class", { state: { adminId, classId } });
  }

  function CreateClsHandler() {
    navigate("/MakeClass", { state: { adminId } });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={CreateClsHandler}
          className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105 mb-6"
        >
          Create Class
        </button>
        <div className="space-y-6">
          {cls.length > 0 ? (
            cls.map((clsItem, index) => (
              <div
                key={index}
                onClick={() => clsHandler(clsItem._id)}
                className="flex items-center justify-between bg-[#0f3460] p-4 rounded-lg shadow-md hover:bg-[#0e2956] transition-transform transform hover:scale-105 cursor-pointer"
              >
                <h4 className="text-lg font-semibold">{clsItem.name}</h4>
              </div>
            ))
          ) : (
            <p className="text-center">No classes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
