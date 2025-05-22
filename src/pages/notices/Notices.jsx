import React, { useState, useEffect } from 'react';
import './Notices.css';

// const notices = [
//     {
//         id: 1,
//         title: "Annual Sports Day",
//         date: "2024-12-22",
//         description: "Join us for the Annual Sports Day on December 22nd. All students are encouraged to participate!",
//     },
//     {
//         id: 2,
//         title: "Winter Vacation Notice",
//         date: "2024-12-25",
//         description: "School will remain closed for winter vacation from December 25th to January 5th.",
//     },
//     {
//         id: 3,
//         title: "New Year Celebration",
//         date: "2025-01-01",
//         description: "Celebrate the New Year with us! Join us for a cultural program on January 1st at the auditorium.",
//     },
// ];

const Notices = () => {
  const [notices, setNotices] = useState(undefined);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:5001/api/notices');
        const json = await response.json();
        setNotices(json?.data || undefined);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div className="main-notice-container">
      <div className="page-container">
        {/* Header */}
        <header className="header">
          <h1>School Notices</h1>
        </header>

        {/* Notices Section */}
        <main className="notices-container">
          {notices?.map((notice) => (
            <div key={notice.id} className="notice-item">
              <h2>{notice.title}</h2>
              <p className="notice-date">Date: {notice.date}</p>
              <p>{notice.description}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Notices;
