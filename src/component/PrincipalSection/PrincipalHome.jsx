import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

function PrincipalHome() {
  const navigate = useNavigate();
  const [principalData, setPrincipalData] = useState(null);
  const [notice, setNotice] = useState("");
  const [noticeImage, setNoticeImage] = useState(null);
  const [notices, setNotices] = useState([]);
  const [unapprovedHods, setUnapprovedHods] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false); // 👈 Hover state

  useEffect(() => {
    const fetchPrincipalData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });

        if (res.data.__t !== "Principal") {
          navigate("/login/PrincipalHome");
          setError("Unauthorized access");
          return;
        }

        setPrincipalData(res.data);

        const [noticeRes, hodRes] = await Promise.all([
          axios.get(
            `http://localhost:3000/principal/getallnotices?id=${res.data._id}`,
            { withCredentials: true }
          ),
          axios.get("http://localhost:3000/user/allunapprovedHODs", {
            withCredentials: true,
          }),
        ]);

        setNotices(noticeRes.data);
        setUnapprovedHods(hodRes.data.hods);
      } catch (err) {
        console.error(err);
        setError("Session expired or unauthorized");
      }
    };

    fetchPrincipalData();
  }, [navigate]);

  const postDetails = async (pic) => {
    if (!pic) {
      toast.warning("Please Select an Image");
      return;
    }

    setLoading(true);
    if (!["image/jpeg", "image/png"].includes(pic.type)) {
      toast.warning(`${pic.type} is not supported`);
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "my_chat-app");
      data.append("cloud_name", "djmmkgei0");

      const cloudRes = await fetch(
        "https://api.cloudinary.com/v1_1/djmmkgei0/image/upload",
        { method: "post", body: data }
      );
      const info = await cloudRes.json();

      await axios.post(
        "http://localhost:3000/principal/update-photo",
        { photo: info.url.toString(), id: principalData._id },
        { withCredentials: true }
      );

      setPrincipalData((prev) => ({
        ...prev,
        photo: info.url.toString(),
      }));
      toast.success("Photo updated!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const sendNotice = async () => {
    if (!notice.trim()) return toast.warning("Please enter a notice");

    setLoading(true);
    let uploadedPhotoUrl = "";

    if (noticeImage) {
      try {
        const data = new FormData();
        data.append("file", noticeImage);
        data.append("upload_preset", "my_chat-app");
        data.append("cloud_name", "djmmkgei0");

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/djmmkgei0/image/upload",
          { method: "post", body: data }
        );
        const info = await cloudRes.json();
        uploadedPhotoUrl = info.url.toString();
      } catch {
        toast.error("Notice image upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      await axios.post(
        "http://localhost:3000/principal/uploadnotice",
        {
          caption: notice,
          photo: uploadedPhotoUrl,
          id: principalData._id,
        },
        { withCredentials: true }
      );
      toast.success("Notice uploaded!");
      setNotice("");
      setNoticeImage(null);

      const res = await axios.get(
        `http://localhost:3000/principal/getallnotices?id=${principalData._id}`,
        { withCredentials: true }
      );
      setNotices(res.data);
    } catch {
      toast.error("Failed to send notice");
    } finally {
      setLoading(false);
    }
  };

  const approveHOD = async (hodId) => {
    try {
      await axios.post(
        "http://localhost:3000/user/approveHOD",
        { hodId },
        { withCredentials: true }
      );
      setUnapprovedHods((prev) => prev.filter((h) => h._id !== hodId));
      toast.success("HOD approved");
    } catch {
      toast.error("Approval failed");
    }
  };

  const rejectHOD = (hodId) => {
    setUnapprovedHods((prev) => prev.filter((h) => h._id !== hodId));
    toast.info("HOD rejected");
  };

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <ToastContainer />
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!principalData) {
    return (
      <div className="container mt-5 text-center">
        <ToastContainer />
        <div className="spinner-border text-primary" role="status" />
        <p>Loading principal information...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left Panel */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-lg text-center mb-4 p-4">
              <h2 className="mb-3">Welcome, {principalData.name}</h2>
              <div
                className="position-relative d-inline-block mb-3"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <center>
                  <img
                    src={principalData.photo}
                    alt="Principal"
                    className="rounded-circle shadow"
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "cover",
                      border: "3px solid #007bff",
                    }}
                  />
                  {hovered && (
                    <label
                      htmlFor="upload-photo"
                      className="position-absolute"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: "50%",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <i className="fas fa-camera text-white"></i>
                    </label>
                  )}
                  <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </center>
              </div>
              <p><strong>Email:</strong> {principalData.email}</p>
              <p><strong>Designation:</strong> Principal</p>
            </div>

            {/* Rest of the components remain unchanged */}

            <div className="card shadow p-4 mb-4">
              <h4 className="mb-3">📨 Post a Notice</h4>
              <textarea
                className="form-control mb-3"
                placeholder="Write your notice here..."
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                rows={4}
              />
              <div className="mb-3">
                <label className="form-label"><strong>Attach Image (optional)</strong></label><br />
                <label
                  htmlFor="notice-image"
                  className="btn btn-outline-secondary rounded-circle"
                  style={{
                    width: "45px",
                    height: "45px",
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i className="fas fa-camera"></i>
                </label>
                <input
                  type="file"
                  id="notice-image"
                  accept="image/*"
                  onChange={(e) => setNoticeImage(e.target.files[0])}
                  style={{ display: "none" }}
                  disabled={loading}
                />
                {noticeImage && (
                  <span className="ms-3 text-muted small">
                    {noticeImage.name.length > 25
                      ? noticeImage.name.slice(0, 25) + "..."
                      : noticeImage.name}
                  </span>
                )}
              </div>
              <button
                className="btn btn-primary"
                onClick={sendNotice}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Notice"}
              </button>
            </div>

            <div className="card shadow p-4">
              <h4 className="mb-3">👨‍🏫 Pending HOD Approvals</h4>
              {unapprovedHods.length === 0 ? (
                <p className="text-muted">No pending requests.</p>
              ) : (
                unapprovedHods.map((hod) => (
                  <div
                    key={hod._id}
                    className="d-flex justify-content-between align-items-center border rounded p-3 mb-3 bg-light"
                  >
                    <div>
                      <p className="mb-1 fw-bold">{hod.name}</p>
                      <p className="mb-0 text-muted">
                        {hod.email} • {hod.department}
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => approveHOD(hod._id)}
                      >
                        <i className="fas fa-check me-1"></i>Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectHOD(hod._id)}
                      >
                        <i className="fas fa-times me-1"></i>Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel (Notices) */}
          <div className="col-lg-4">
            <div
              className="shadow p-4"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                maxHeight: "84vh",
                overflowY: "auto",
              }}
            >
              <h5 className="mb-3">📢 Recent Notices</h5>
              {notices.length === 0 ? (
                <p className="text-muted">No notices uploaded.</p>
              ) : (
                notices.map((n, i) => (
                  <div key={i} className="mb-4">
                    <p className="mb-1">{n.caption}</p>
                    {n.photo && (
                      <img
                        src={n.photo}
                        alt="Notice"
                        className="img-fluid rounded mb-2"
                      />
                    )}
                    <small className="text-muted d-block">
                      {new Date(n.createdAt).toLocaleString()}
                    </small>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrincipalHome;
