import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function CreateSubject() {
  const location = useLocation();
  const navigate = useNavigate();
  const classId = location.state?.classId;
  const [subject, setSubject] = useState({
    teacherId: "",
    subjectName: "",
  });

  const isTeacherId = () => subject.teacherId !== "";
  const isSubjectName = () => subject.subjectName !== "";

  const AddStuHandler = async (e) => {
    e.preventDefault();

    if (!classId || !isSubjectName() || !isTeacherId()) {
      toast.warn("Please provide both teacher ID and subject name", {
        position: "top-right",
      });
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      console.log("Submitting subject:", subject);
      console.log("Class ID:", classId);

      const res = await axios.post(
        `https://attendancebackend-dktt.onrender.com/api/v1/createsubject/${classId}`,
        subject,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      toast.success(`${subject.subjectName} created successfully`, {
        position: "top-right",
      });
      navigate(-1);
    } catch (err) {
      toast.error("Subject alredy Exist or teacher not exist. Please try again", {
        position: "top-right",
      });
      console.error("Error creating subject", err);
    }
  };

  function BackHandler() {
    navigate(-1);
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setSubject((prevFormData) => ({
      ...prevFormData,
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
        <form onSubmit={AddStuHandler} className="space-y-6">
          <div>
            <label htmlFor="teacherId" className="block mb-2 text-sm font-medium">
              Teacher ID:
            </label>
            <input
              type="text"
              id="teacherId"
              name="teacherId"
              value={subject.teacherId}
              onChange={changeHandler}
              className="w-full p-3 rounded-lg bg-[#0f3460] text-white focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
              placeholder="Enter Teacher ID"
            />
          </div>

          <div>
            <label htmlFor="subjectName" className="block mb-2 text-sm font-medium">
              Subject Name:
            </label>
            <input
              type="text"
              id="subjectName"
              name="subjectName"
              value={subject.subjectName}
              onChange={changeHandler}
              className="w-full p-3 rounded-lg bg-[#0f3460] text-white focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
              placeholder="Enter Subject Name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f3460] text-white py-3 rounded-lg hover:bg-[#0e2956] transition-transform transform hover:scale-105"
          >
            Create Subject
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSubject;