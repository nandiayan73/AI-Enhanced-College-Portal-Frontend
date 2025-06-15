import React, { useEffect, useState } from "react";
import axios from "axios";

function Notification() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/notice/getnotices");
        const sorted = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((notice) => {
            const isNew = (Date.now() - new Date(notice.createdAt)) / (1000 * 60 * 60 * 24) <= 3;
            return {
              date: new Date(notice.createdAt).toLocaleDateString("en-GB"),
              text: notice.caption,
              file: notice.photo,
              isNew,
              publisherName: notice.publishedBy?.name || "Unknown",
            };
          });
        setAnnouncements(sorted);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };

    fetchNotices();
  }, []);

  const scrollStyle = {
    maxHeight: "300px",
    overflowY: "auto",
    paddingRight: "70px",
  };

  const customScrollbarStyle = `
    ::-webkit-scrollbar {
      width: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border-radius: 10px;
    }
  `;

  return (
    <div className="card bg-light border-0">
      <style>{customScrollbarStyle}</style>
      <div className="card-body">
        <h5 className="card-title fw-bold text-primary border-bottom pb-2">
          LATEST ANNOUNCEMENT
        </h5>
        <h6 className="text-muted">Notice</h6>
        <div style={scrollStyle}>
          {announcements.length === 0 ? (
            <p className="text-muted">No notices yet.</p>
          ) : (
            <ul className="list-unstyled mt-3">
              {announcements.map((item, index) => (
                <li key={index} className="mb-3 position-relative">
                  <strong>{item.date}</strong> - {item.text}
                  {item.isNew && (
                    <span
                      className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: "0.6rem", marginLeft: "5px" }}
                    >
                      New
                    </span>
                  )}
                  <br />
                  <p className="text-muted small mt-1">
                    Published by <strong>principal</strong>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
