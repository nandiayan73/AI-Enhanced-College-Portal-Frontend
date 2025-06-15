import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";

const SubjectDetails = () => {
  const { subjectname, subjectid } = useParams();
  const navigate = useNavigate();
  const [isStudent,setIsStudent]=useState(true);
  const [posts, setPosts] = useState([]);
  const [subjectData, setSubjectData] = useState(null);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceImage, setAttendanceImage] = useState(null);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [enrollingAll, setEnrollingAll] = useState(false);
  const [user,setUser]=useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState("");
  
  const fetchSubjectDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/subjects/${subjectid}`, {
        withCredentials: true,
      });
      setPosts(res.data.posts || []);
      setSubjectData(res.data);
    } catch (err) {
      console.error("Error fetching subject details:", err);
    }
  };
   const generateAnalysis = async () => {
      setIsGenerating(true);
      setAnalysis("");
      try {
        const res = await fetch("http://localhost:3000/paper/prediction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subjectId: subjectid }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setAnalysis(data.prediction);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to generate paper analysis.");
        setAnalysis("Error: " + err.message);
      } finally {
        setIsGenerating(false);
      }
    };
  const checkAuth=async()=>{
    try
    {
      const res = await axios.get("http://localhost:3000/user/auth", { withCredentials: true });
      const user=res.data;
      setUser(user);
      if(user.__t=='Student')
        setIsStudent(true);
      else
        setIsStudent(false);
    }
    catch(err)
    {
      
    }
  }

  useEffect(() => {
    checkAuth();
    fetchSubjectDetails();
  }, [subjectid]);

  const uploadImageToCloudinary = async (file) => {
    setImageUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "my_chat-app");
      data.append("cloud_name", "djmmkgei0");

      const res = await fetch("https://api.cloudinary.com/v1_1/djmmkgei0/image/upload", {
        method: "POST",
        body: data,
      });

      const imgData = await res.json();
      return imgData.url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !image) return alert("Cannot post empty content.");

    try {
      setLoading(true);
      let contentUrl = null;

      if (image) {
        contentUrl = await uploadImageToCloudinary(image);
      }

      const res = await axios.post(
        "http://localhost:3000/subjects/post",
        {
          subjectId: subjectid,
          captionText: content,
          contentUrl,
          type: "caption",
        },
        { withCredentials: true }
      );

      setPosts([res.data.post, ...posts]);
      setContent("");
      setImage(null);
      setShowPostModal(false);
    } catch (err) {
      console.error("Post creation failed:", err);
      alert(err.response?.data?.message || "Failed to post.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAttendanceFromImage = async () => {
    if (!attendanceImage || !attendanceDate) {
      alert("Please provide both date and image.");
      return;
    }

    try {
      setLoading(true);
      const imageUrl = await uploadImageToCloudinary(attendanceImage);

      await axios.post("http://localhost:3000/subjects/markpresent", {
        subjectId: subjectid,
        date: attendanceDate,
        imageUrl,
      });

      alert("Attendance marked successfully.");
      setAttendanceImage(null);
      setAttendanceDate("");
      setShowAttendanceModal(false);
      fetchSubjectDetails();
    } catch (err) {
      console.error("Attendance mark failed:", err);
      alert("Failed to mark attendance.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollAllStudents = async () => {
    if (!window.confirm("Auto enroll all eligible students?")) return;

    try {
      setEnrollingAll(true);

      const res = await axios.post(
        `http://localhost:3000/subjects/${subjectid}/enroll`,
        {},
        { withCredentials: true }
      );

      alert(res.data.message || "Students enrolled.");
      fetchSubjectDetails();
    } catch (err) {
      console.error("Auto-enrollment failed:", err);
      alert(err.response?.data?.message || "Failed to enroll students.");
    } finally {
      setEnrollingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-10">
      {/* <center><h3>Subject- {subjectname.replace(/-/g, " ")}</h3></center> */}
      <h3 className="text-center text-2xl sm:text-3xl font-extrabold tracking-wide text-indigo-700 uppercase drop-shadow-sm">
        Subject - {subjectname.replace(/-/g, " ").toUpperCase()}
    </h3>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full justify-between">
            <h3 className="text-3xl font-bold text-green-700">
              {/* {subjectname.replace(/-/g, " ")} */}
            </h3>

            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setShowAttendanceModal(true)} style={{display:isStudent?"none":""}}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Attendance
              </button>
              <button
                onClick={() => setShowPostModal(true)} style={{display:isStudent?"none":""}}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Post
              </button>
              <button
                onClick={() => navigate(`/${subjectname}/${subjectid}/modeltrain`)} 
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Train Model on Syllabus
              </button>
            </div>
          </div>

          {/* Separate Small Auto Enroll Button */}
          <div>
          <button
            onClick={handleEnrollAllStudents}
            style={{display:isStudent?"none":""}}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded shadow flex items-center gap-1"
            disabled={enrollingAll}
          >
            {enrollingAll ? (
              <>
                <ImSpinner2 className="animate-spin w-3 h-3" /> {/* Smaller spinner */}
                Enrolling...
              </>
            ) : (
              "Auto-Enroll"
            )}
          </button>

          </div>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center">
              No posts yet. Please wait someone will post shortly.
            </p>
          ) : (
            posts.map((post, index) => (
              <div
                key={post._id || index}
                className="bg-white p-4 rounded-xl shadow border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-indigo-700">
                    {user.name || "User"}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
                {post.captionText && (
                  <p className="mt-2 text-gray-800 whitespace-pre-line">
                    {post.captionText}
                  </p>
                )}
                {post.contentUrl && (
                  <img
                    src={post.contentUrl}
                    alt="post"
                    className="mt-3 rounded-lg w-full object-cover max-h-80"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Create Post</h2>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Write a caption..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="mb-4 rounded-lg max-h-60 object-cover w-full"
              />
            )}
            <label className="flex items-center gap-2 text-indigo-600 cursor-pointer mb-4">
              <PhotoIcon className="w-5 h-5" />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={loading || imageUploading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2"
              >
                {loading || imageUploading ? (
                  <>
                    <ImSpinner2 className="animate-spin" /> Posting...
                  </>
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-700">Student Attendance</h2>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full border rounded-lg p-2"
              />

              <label className="block mt-4 mb-2 font-medium">Upload Attendance Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAttendanceImage(e.target.files[0])}
                className="w-full"
              />

              <div className="mt-6">
                <button
                  onClick={handleMarkAttendanceFromImage}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  disabled={loading || imageUploading}
                >
                  {loading || imageUploading ? (
                    <>
                      <ImSpinner2 className="animate-spin" /> Marking...
                    </>
                  ) : (
                    "Mark Attendance from Image"
                  )}
                </button>
              </div>
            </div>

            {subjectData?.students?.length > 0 ? (
              <table className="w-full text-left border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Roll</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectData.students.map((stu, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2 border">{stu.student?.rollNo || `#${idx + 1}`}</td>
                      <td className="p-2 border">{stu.student?.name || "N/A"}</td>
                      <td className="p-2 border">{stu.totalPercentage ?? "N/A"}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No attendance records available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDetails;
