import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/constant';
import { useLocation, useSearchParams } from 'react-router-dom';
import NoticesUpload from '../../pages/admin/NoticesUpload';
import { Modal, Popconfirm } from 'antd';
import toast from 'react-hot-toast';
import AppPagination from '../Pagination/Pagination';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEditNotice, setSelectedEditNotice] = useState(null);
  const [deleteNoticeId, setDeleteNoticeId] = useState(null);
  const location = useLocation();

  console.log(location.key);

  useEffect(() => {
    fetchNotices();
  }, [location.key]);

  const fetchNotices = async () => {
    try {
      const formData = new FormData();
      formData.append('token', localStorage.getItem('accessToken'));

      var result = await fetch(baseUrl + 'getNotice.php', {
        method: 'POST',
        body: formData,
      });

      var data = await result.json();

      if (data.success) {
        setNotices(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotice = async () => {
    try {
      const formData = new FormData();
      formData.append('token', localStorage.getItem('accessToken'));
      formData.append('notice_id', deleteNoticeId);

      var result = await fetch(baseUrl + 'deleteNotice.php', {
        method: 'POST',
        body: formData,
      });

      var data = await result.json();

      if (data.success) {
        toast.success(data.message);
        fetchNotices();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteNoticeId(null);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h1>Notices</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Notice
        </button>
      </div>
      <p
        style={{
          fontSize: '16px',
          color: '#666',
          fontWeight: '400',
          lineHeight: '1.5',
        }}
      >
        All the notices posted by the admin will be shown here.
      </p>
      {
        <>
          <AppPagination
            onPageChange={() => {}}
            currentPage={1}
            totalPages={10}
          />
          <table>
            <thead>
              <tr>
                <th>Notice ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Upload Date</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notices?.map((notice) => (
                <tr key={notice.notice_id}>
                  <td>{notice.notice_id}</td>
                  <td>{notice.title}</td>
                  <td
                    style={{
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}
                  >
                    {notice.description}
                  </td>
                  <td>
                    {new Date(notice.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </td>
                  <td>
                    {
                      //view and download option
                      notice.file_url ? (
                        <div
                          style={{
                            display: 'flex',

                            gap: '10px',

                            padding: '10px',
                          }}
                        >
                          <a
                            href={baseUrl + notice.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        </div>
                      ) : (
                        'No file available'
                      )
                    }
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <button
                        onClick={() => {
                          setSelectedEditNotice(notice);
                        }}
                        style={{
                          backgroundColor: '#2196F3',
                          color: 'white',
                          padding: '5px 10px',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <Popconfirm
                        okType="danger"
                        title="Are you sure you want to delete this notice?"
                        description="This action cannot be undone."
                        open={deleteNoticeId === notice.notice_id}
                        onCancel={() => setDeleteNoticeId(null)}
                        onConfirm={deleteNotice}
                        okText="Delete"
                        placement="bottomRight"
                      >
                        <button
                          onClick={() => {
                            setDeleteNoticeId(notice.notice_id);
                          }}
                          style={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </Popconfirm>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
      <Modal
        open={isAddModalOpen || selectedEditNotice}
        onCancel={() => {
          setIsAddModalOpen(false);
          setSelectedEditNotice(null);
        }}
        footer={null}
        width={600}
      >
        <NoticesUpload
          notice={selectedEditNotice}
          onSuccess={() => {
            setIsAddModalOpen(false);
            setSelectedEditNotice(null);
            fetchNotices();
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminNotices;
