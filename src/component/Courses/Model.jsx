import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import ReactMarkdown from "react-markdown";

function TrainModel() {
  const { subjectid } = useParams();
  const [syllabusUrl, setSyllabusUrl] = useState("");
  const [questionPaperUrl, setQuestionPaperUrl] = useState("");
  const [loadingSyllabus, setLoadingSyllabus] = useState(false);
  const [loadingPaper, setLoadingPaper] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [syllabus, setSyllabus] = useState(null);
  const [questionPapers, setQuestionPapers] = useState([]);

  const fetchSubjectResources = async () => {
    try {
      const res = await fetch(`http://localhost:3000/subjects/${subjectid}/resources`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSyllabus(data.syllabus);
      setQuestionPapers(data.questionPapers || []);
    } catch (err) {
      console.error("Error fetching resources:", err);
      toast.error("❌ Failed to fetch subject resources.");
    }
  };

  useEffect(() => {
    fetchSubjectResources();
  }, [subjectid]);

  const uploadSyllabus = async () => {
    if (!syllabusUrl) return toast.error("Please enter a syllabus image URL.");
    setLoadingSyllabus(true);
    try {
      const res = await fetch("http://localhost:3000/paper/addsyllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId: subjectid, syllabusUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("✅ Syllabus uploaded successfully!");
      setSyllabus({ url: syllabusUrl, text: "Uploaded syllabus" });
      setSyllabusUrl("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload syllabus.");
    } finally {
      setLoadingSyllabus(false);
    }
  };

  const uploadQuestionPaper = async () => {
    if (!questionPaperUrl) return toast.error("Please enter a question paper image URL.");
    setLoadingPaper(true);
    try {
      const res = await fetch("http://localhost:3000/paper/addquestionpapers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectId: subjectid, questionPaperUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("✅ Question paper uploaded successfully!");
      setQuestionPapers((prev) => [...prev, { url: questionPaperUrl, text: "Uploaded paper" }]);
      setQuestionPaperUrl("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to upload question paper.");
    } finally {
      setLoadingPaper(false);
    }
  };

  const handleDeletePaper = async (paperUrl) => {
    const confirm = window.confirm("Are you sure you want to delete this paper?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/paper/deletequestionpaper?subjectId=${subjectid}&url=${encodeURIComponent(paperUrl)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("🗑️ Question paper deleted");
      setQuestionPapers((prev) => prev.filter((paper) => paper.url !== paperUrl));
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete question paper.");
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">📘 Train Subject Model</h1>

      {/* Syllabus Upload */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📂 Upload Syllabus</h2>
        <input
          type="text"
          placeholder="Enter syllabus image URL"
          className="w-full px-4 py-2 border rounded mb-4"
          value={syllabusUrl}
          onChange={(e) => setSyllabusUrl(e.target.value)}
        />
        <button
          onClick={uploadSyllabus}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto"
          disabled={loadingSyllabus}
        >
          {loadingSyllabus ? <ImSpinner2 className="animate-spin" /> : <FaCamera />}
          Upload Syllabus
        </button>

        {syllabus?.url && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">📘 Uploaded Syllabus:</h3>
            <img src={syllabus.url} alt="Syllabus" className="mt-2 mx-auto max-w-sm rounded shadow" />
            {syllabus.text && <p className="mt-2 text-sm text-gray-600">{syllabus.text}</p>}
          </div>
        )}
      </div>

      {/* Question Paper Upload */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📂 Upload Question Paper</h2>
        <input
          type="text"
          placeholder="Enter question paper image URL"
          className="w-full px-4 py-2 border rounded mb-4"
          value={questionPaperUrl}
          onChange={(e) => setQuestionPaperUrl(e.target.value)}
        />
        <button
          onClick={uploadQuestionPaper}
          className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 flex items-center justify-center gap-2 mx-auto"
          disabled={loadingPaper}
        >
          {loadingPaper ? <ImSpinner2 className="animate-spin" /> : <FaCamera />}
          Upload Question Paper
        </button>

        {questionPapers.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">📄 Uploaded Question Papers:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {questionPapers.map((paper, idx) => (
                <div key={idx} className="relative p-2 border rounded bg-gray-100 shadow-sm">
                  <button
                    onClick={() => handleDeletePaper(paper.url)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
                  >
                    ❌
                  </button>
                  <img src={paper.url} alt={`Question Paper ${idx + 1}`} className="w-full rounded" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Paper Analysis */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl mx-auto mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          📊 Generate Paper Analysis & Predictions
        </h2>
        <button
          onClick={generateAnalysis}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 flex items-center gap-2 mx-auto"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <ImSpinner2 className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              📑 Generate Analysis
            </>
          )}
        </button>

        {analysis && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4 max-h-[400px] overflow-y-auto text-left prose">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainModel;
