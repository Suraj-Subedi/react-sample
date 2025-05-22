import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './NoticesUpload.css';
import { Button } from 'antd';
import DeleteModal from '../../Components/DeleteModal';


const NoticesSchema = Yup.object().shape({
  noticeTitle: Yup.string().required('Notice title is required'),
  noticeDescription: Yup.string().required('Notice description is required'),
  uploadDate: Yup.date()
    .required('Upload date is required')
    .max(new Date(), 'Upload date cannot be in the future'),
});

const NoticesUpload = ({
  noticesList = [],
  isLoading,
  isSubmitting,
  fetchNotices,
  postNotices,
  updateNotices,
  deleteNotices,
}) => {

  const [show, isShow] = useState(undefined);
  const [initialValues, setInitialValues] = useState({
    noticeTitle: '',
    noticeDescription: '',
    uploadDate: '',
  });
  const [editNoticeId, setEditNoticeId] = useState(null);

  const handleEdit = (notice) => {
    setEditNoticeId(notice._id);
    const datePart = notice.uploadDate.split('T')[0];
    setInitialValues({
      noticeTitle: notice.noticeTitle,
      noticeDescription: notice.noticeDescription,
      uploadDate: datePart,
    });
  };

  const handleDelete = (id) => {

  };

  useEffect(() => {

  }, [noticesList]);

  return (
    <div className="notices-upload-container">
      <h2>{editNoticeId ? 'Edit Notice' : 'Upload Notices'}</h2>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={NoticesSchema}
        onSubmit={(values, { resetForm }) => {
          if (editNoticeId) {
            dispatch(updateNotices({ values, id: editNoticeId }));
            setEditNoticeId(null);
          } else {
            dispatch(postNotices({ values }));
          }
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="notices-upload-form">
            <div className="field-container">
              <label htmlFor="noticeTitle">Notice Title</label>
              <Field
                name="noticeTitle"
                placeholder="Enter notice title"
                value={values.noticeTitle}
              />
              <ErrorMessage
                name="noticeTitle"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="noticeDescription">Notice Description</label>
              <Field
                as="textarea"
                name="noticeDescription"
                placeholder="Enter notice description"
                value={values.noticeDescription}
              />
              <ErrorMessage
                name="noticeDescription"
                component="div"
                className="error-div"
              />
            </div>

            <div className="field-container">
              <label htmlFor="uploadDate">Upload Date</label>
              <Field type="date" name="uploadDate" value={values.uploadDate} />
              <ErrorMessage
                name="uploadDate"
                component="div"
                className="error-div"
              />
            </div>

            <button type="submit" className="submit-btn">
              {editNoticeId ? 'Update Notice' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
      <div className="breaking-line2"></div>
      <div className="notices-list-container">
        <h2>Notices</h2>
        {noticesList.length > 0 ? (
          <ul className="notices-list">
            {noticesList.map((notice) => (
              <li key={notice.id} className="notices-list-item">
                <div className="notice-details">
                  <h4>{notice.noticeTitle}</h4>
                  <p>{notice.noticeDescription}</p>
                  <span>
                    {new Date(notice.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="notice-actions">
                  <Button
                    type="primary"
                    onClick={() => handleEdit(notice)}
                    className="edit-btn"
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    variant="filled"
                    onClick={() => isShow(true)}
                    className="delete-btn"
                  >
                    Delete
                  </Button>
                </div>
                <DeleteModal
                  isOpen={show}
                  onClose={() => isShow(false)}
                  onDelete={() => handleDelete(notice._id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No notices available</p>
        )}
      </div>
    </div>
  );
};

export default NoticesUpload;
