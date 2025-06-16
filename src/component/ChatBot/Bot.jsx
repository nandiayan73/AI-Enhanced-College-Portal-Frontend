import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Chatbot() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isPrincipal, setIsPrincipal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [role,setRole]=useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/auth", {
          withCredentials: true,
        });

        if (res.data.__t === "Principal") {
          setIsPrincipal(true);
        } else {
          setIsPrincipal(false);
        }
        setRole(res.data.__t);
      } catch (err) {
        console.error("Auth check failed");
        // navigate("/login/PrincipalHome");
      }
    };

    checkAuth();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setChat([...chat, userMsg]);

    try {
      const res = await axios.post("http://localhost:3000/api/chatbot/chat", {
        message: input,
        role
      });

      const botMsg = { role: "bot", content: res.data.reply };
      setChat((prev) => [...prev, botMsg]);
      setInput("");
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "bot", content: "Something went wrong. Try again." },
      ]);
    }
  };

  const handleUpdateHistory = async () => {
    if (!updateText.trim()) return;

    try {
      await axios.post(
        "http://localhost:3000/api/chatbot/update-history",
        { message: updateText },
        { withCredentials: true }
      );
      toast.success("History updated successfully!");
      setUpdateText("");
      setShowModal(false);
    } catch (err) {
      toast.error("❌ Failed to update history.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="bg-white w-full max-w-xl shadow-lg rounded-lg p-6 relative">
        {/* Top Right Button (Principal-only) */}
        {isPrincipal && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-4 right-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Update Info
          </button>
        )}

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          SVIST  ChatBot
        </h2>

        <div className="h-96 overflow-y-auto border p-4 rounded mb-4 space-y-2">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-green-100 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            className="flex-1 p-2 border rounded-l"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask your question..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>

      {/* Modal for updating history */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Update College Info
            </h3>
            <textarea
              rows={5}
              className="w-full border rounded p-2 text-sm mb-4"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="Enter new information to add to the bot history..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateHistory}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
