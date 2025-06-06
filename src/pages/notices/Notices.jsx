import React, { useState, useEffect } from 'react';
import './Notices.css';
import { baseUrl } from '../../utils/constant';
import toast from 'react-hot-toast';
import { Pagination } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Notices = () => {
  const [notices, setNotices] = useState(undefined);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const page = searchParams[0].get('page') || '1';
  const pageSize = searchParams[0].get('page_size') || '10';
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, [page, pageSize]);

  const fetchNotices = async () => {
    try {
      const formData = new FormData();
      formData.append('token', localStorage.getItem('accessToken'));

      var result = await fetch(
        baseUrl + 'getNotice.php' + `?page=${page}&page_size=${pageSize}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      var data = await result.json();

      if (data.success) {
        setNotices(data.data);
        setTotal(data.total);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-notice-container">
      <div className="page-container">
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>School Notices</h1>
        </header>

        {/* Notices Section */}
        <main className="notices-container">
          {notices?.map((notice) => {
            const isTypePdf =
              notice.file_url && notice.file_url.endsWith('.pdf');
            const fullFileUrl = baseUrl + notice.file_url;
            //if not pdf then it is image
            return (
              <div
                key={notice.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* <h2>{notice.title}</h2>
              }
                {/* <h2>{notice.title}</h2>
              <p className="notice-date">Date: {notice.created_at}</p>
              <p>{notice.description}</p> */}
                <h2>{notice.title}</h2>
                <p
                  style={{
                    color: '#555',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    margin: '5px 0',
                  }}
                >
                  Posted on: {new Date(notice.created_at).toLocaleDateString()}
                </p>
                <p>{notice.description}</p>
                {isTypePdf ? (
                  // <a
                  //   href={fullFileUrl}
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  //   className="notice-link"
                  // >
                  //   Read PDF File
                  // </a>

                  <div>
                    <p className="notice-link">
                      <a
                        href={fullFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Full Screen
                      </a>
                    </p>
                    <br />
                    <iframe
                      src={fullFileUrl}
                      title={notice.title}
                      style={{
                        width: '100%',
                        height: '800px',
                        border: 'none',
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={fullFileUrl}
                    alt={notice.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </div>
            );
          })}
          <Pagination
            current={parseInt(page)}
            pageSize={parseInt(pageSize)}
            total={Math.ceil(total / parseInt(pageSize)) * parseInt(pageSize)}
            onChange={(page, pageSize) => {
              const params = new URLSearchParams(searchParams[0]);
              params.set('page', page);
              params.set('page_size', pageSize);
              navigate(`/notices?${params.toString()}`, {
                replace: true,
              });
            }}
            style={{
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'end',
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Notices;
