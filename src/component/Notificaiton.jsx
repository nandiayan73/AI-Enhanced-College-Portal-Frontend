

function Notificaiton() {
  const announcements = [
    {
      date: "20-05-2025",
      text: "Admit Card Notice for even sem 2025",
      file: "/files/ppr_notice.pdf",
      isNew: true, // <--- You can flag new items
    },
    {
      date: "15-05-2025",
      text: "Notice regarding Wastage of Electricity",
      file: "/files/ppr_notice.pdf",
    //   isNew: true, // <--- You can flag new items
    },
    {
      date: "08-05-2025",
      text: "Rabindra Jayanti Notice ",
      file: "/files/results_odd_sem.pdf",
    },
    {
      date: "08-05-2025",
      text: "Buddha Purnima Notice",
      file: "/files/results_odd_sem.pdf",
    },
    {
      date: "07-05-2025",
      text: "Clearance form for exam form verification",
      file: "/files/results_odd_sem.pdf",
    },
    {
      date: "30-04-2025",
      text: "Wall Magazine Notice",
      file: "/files/results_odd_sem.pdf",
    },
    {
      date: "30-04-2025",
      text: "May Day Notice",
      file: "/files/results_odd_sem.pdf",
    },
  ];

  const scrollStyle = {
    maxHeight: '300px',
    overflowY: 'auto',
    paddingRight: '70px',
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
        <h5 className="card-title fw-bold text-primary border-bottom pb-2">LATEST ANNOUNCEMENT</h5>
        <h6 className="text-muted">Notice</h6>
        <div style={scrollStyle}>
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
                <a href={item.file} download className="btn btn-sm btn-outline-primary mt-1">
                  Download PDF
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Notificaiton;
