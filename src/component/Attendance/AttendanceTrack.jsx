import React, { useState } from "react";
import { jsPDF } from "jspdf"; // For PDF generation

// Mock student data
const initialStudents = [
  { id: 1, name: "Ali", records: [{ date: "2025-06-10", present: true }, { date: "2025-06-11", present: false }] },
  { id: 2, name: "Fatima", records: [{ date: "2025-06-10", present: false }, { date: "2025-06-11", present: true }] },
  { id: 3, name: "Omar", records: [{ date: "2025-06-10", present: true }, { date: "2025-06-11", present: true }] },
];

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Calculate attendance percentage
  const AttendanceTrack = () => {
    return students.map(student => {
      const presentDays = student.records.filter(r => r.present).length;
      const percentage = (presentDays / student.records.length) * 100;
      return { ...student, percentage: percentage.toFixed(2) };
    });
  };

  const studentsWithAttendance = AttendanceTrack();

  // Generate PDF Report
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text("Attendance Report", 15, 15);
    
    // Table headers
    const headers = ["Name", "Total Days", "Present", "Attendance %"];
    let yPos = 30;
    
    // Header row
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, i) => {
      doc.text(header, 15 + (i * 45), yPos);
    });
    
    // Student rows
    doc.setFont("helvetica", "normal");
    studentsWithAttendance.forEach(student => {
      yPos += 10;
      doc.text(student.name, 15, yPos);
      doc.text(student.records.length.toString(), 60, yPos);
      doc.text(
        student.records.filter(r => r.present).length.toString(), 
        105, 
        yPos
      );
      doc.text(
        `${student.percentage}%`, 
        150, 
        yPos,
        { color: parseFloat(student.percentage) > 75 ? "green" : "red" }
      );
    });
    
    doc.save("Attendance_Report.pdf");
  };

  // Handle PDF upload
  const handleUpload = () => {
    alert(`Uploaded: ${selectedFile?.name || "No file"}`);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h1>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload PDF
          </button>
          <button 
            onClick={exportToPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Download PDF Report
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Total Days</th>
              <th className="py-3 px-6">Present</th>
              <th className="py-3 px-6">Attendance %</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {studentsWithAttendance.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{student.name}</td>
                <td className="py-3 px-6">{student.records.length}</td>
                <td className="py-3 px-6">
                  {student.records.filter(r => r.present).length}
                </td>
                <td className={`py-3 px-6 font-bold ${
                  parseFloat(student.percentage) > 75 ? "text-green-600" : "text-red-600"
                }`}>
                  {student.percentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Upload Attendance PDF</h2>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={(e) => setSelectedFile(e.target.files[0])} 
              className="mb-4 w-full p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`px-4 py-2 rounded ${
                  selectedFile ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed"
                } text-white`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}