import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

function CreateAnnouncement() {
  const location = useLocation();
  const navigate = useNavigate();
  const teacherId = location.state?.teacherId;
  const subjectId = location.state?.subjectId;
  const subjectName = location.state?.subjectName;

  const [formData, setFormData] = useState({
    message: "",
  });

  useEffect(() => {
    if (!teacherId || !subjectId) {
      toast.error("Invalid access. Redirecting to home...");
      navigate("/");
    }
  }, [teacherId, subjectId, navigate]);

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const CreateAnnouncement = async (event) => {
    event.preventDefault();

    if (!formData.message) {
      toast.warn("Please fill all fields!");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `https://attendancebackend-dktt.onrender.com/api/v1/createAnnouncement/${teacherId}/${subjectId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setFormData({ message: "" });
      toast.success("Message created successfully!");
      console.log("Message created successfully!", res.data);
    } catch (err) {
      toast.error("Announcement creation failed. Please try again.");
      console.log("Error posting data", err);
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
        <h3 className="text-3xl font-extrabold mb-8">Create Announcement for {subjectName}</h3>

        <div className="bg-[#1b1b2f] p-6 rounded-lg shadow-lg">
          <form onSubmit={CreateAnnouncement} className="flex flex-col space-y-6">
            <textarea
              placeholder="Enter your message here"
              onChange={changeHandler}
              name="message"
              value={formData.message}
              className="p-4 rounded-lg text-black h-40 resize-none"
            ></textarea>

            <button
              type="submit"
              className="bg-[#0f3460] text-white py-2 px-4 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105"
            >
              Create Announcement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAnnouncement;