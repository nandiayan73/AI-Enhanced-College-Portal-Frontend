import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { FaFilePdf, FaLightbulb } from 'react-icons/fa';

function QuestionSuggestion() {
  const [questionPdfs, setQuestionPdfs] = useState([]);
  const [syllabusPdf, setSyllabusPdf] = useState(null);
  const [questionSuggestions, setQuestionSuggestions] = useState([]);
  const [syllabusSuggestions, setSyllabusSuggestions] = useState([]);

  const handleQuestionPdfs = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === 'application/pdf');

    if (validFiles.length > 5) {
      alert('You can upload a maximum of 5 question paper PDFs.');
      return;
    }

    setQuestionPdfs(validFiles);
  };

  const handleSyllabusPdf = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      alert('Please upload a valid syllabus PDF file.');
      return;
    }
    setSyllabusPdf(file);
  };

  const handleGenerateSuggestions = () => {
    if (questionPdfs.length === 0 || !syllabusPdf) {
      alert('Please upload both question paper PDFs and a syllabus PDF.');
      return;
    }

    // Mock logic for demo
    const mockQuestionSuggestions = [
      "📌 Unit 2: Repeated questions on stack & queue.",
      "📌 Unit 3: Theory questions from Software Engineering are frequent.",
      "📌 Short questions from Unit 5 (Networking) appear almost every year."
    ];

    const mockSyllabusSuggestions = [
      "📘 Focus on Unit 1: Basics - definitions and fundamentals.",
      "📘 Pay attention to Unit 4: Database design is important.",
      "📘 Unit 6: Algorithms like Dijkstra are often skipped in papers but vital for exams."
    ];

    setQuestionSuggestions(mockQuestionSuggestions);
    setSyllabusSuggestions(mockSyllabusSuggestions);
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">📘 Exam Suggestion Generator</h1>
        <p className="text-muted">Upload question papers and syllabus (PDFs) to get smart, focused suggestions.</p>
      </div>

      {/* Upload Question Papers */}
      <div className="card shadow p-4 mb-4">
        <h5 className="mb-3">📂 Upload Question Papers (Max 5 PDFs)</h5>
        <input
          type="file"
          accept="application/pdf"
          multiple
          className="form-control"
          onChange={handleQuestionPdfs}
        />
        {questionPdfs.length > 0 && (
          <ul className="list-group mt-3">
            {questionPdfs.map((file, index) => (
              <li className="list-group-item d-flex align-items-center" key={index}>
                {/* <FaFilePdf className="text-danger me-2" /> */}
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Upload Syllabus */}
      <div className="card shadow p-4 mb-4">
        <h5 className="mb-3">📜 Upload Syllabus PDF</h5>
        <input
          type="file"
          accept="application/pdf"
          className="form-control"
          onChange={handleSyllabusPdf}
        />
        {syllabusPdf && (
          <div className="mt-3 d-flex align-items-center">
            {/* <FaFilePdf className="text-danger me-2" /> */}
            <span>{syllabusPdf.name}</span>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button className="btn btn-success w-100 fw-bold" onClick={handleGenerateSuggestions}>
        🚀 Generate Suggestions
      </button>

      {/* Suggestion Sections */}
      {(questionSuggestions.length > 0 || syllabusSuggestions.length > 0) && (
        <div className="mt-5">
          {/* Question Paper Suggestions */}
          <div className="card shadow p-4 mb-4">
            <h4 className="text-warning mb-3">
              {/* <FaLightbulb className="me-2" /> */}
              Suggestions from Question Papers
            </h4>
            <ul className="list-group">
              {questionSuggestions.map((item, idx) => (
                <li className="list-group-item" key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Syllabus Suggestions */}
          <div className="card shadow p-4">
            <h4 className="text-info mb-3">
              {/* <FaLightbulb className="me-2" /> */}
              Suggestions from Syllabus
            </h4>
            <ul className="list-group">
              {syllabusSuggestions.map((item, idx) => (
                <li className="list-group-item" key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionSuggestion;
