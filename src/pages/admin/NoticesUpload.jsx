import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './NoticesUpload.css';
import { Button } from 'antd';
import DeleteModal from '../../Components/DeleteModal';
import { baseUrl } from '../../utils/constant';
import toast from 'react-hot-toast';

const NoticesUpload = ({ notice, onSuccess }) => {
  const handleDelete = (id) => {};

  const NoticesSchema = Yup.object().shape({
    noticeTitle: Yup.string().required('Notice title is required'),
    noticeDescription: Yup.string().required('Notice description is required'),
    // noticeFile: Yup.mixed().required('File is required'),
    noticeFile: notice
      ? Yup.mixed().optional()
      : Yup.mixed().required('File is required'),
  });

  const addNotice = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.noticeTitle);
      formData.append('description', values.noticeDescription);
      formData.append('notice_file', values.noticeFile);
      formData.append('token', localStorage.getItem('accessToken'));

      var result = await fetch(baseUrl + 'addNotice.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      var data = await result.json();

      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while uploading the notice.');
    }
  };

  const updateNotice = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.noticeTitle);
      formData.append('description', values.noticeDescription);
      formData.append('token', localStorage.getItem('accessToken'));
      formData.append('notice_id', notice.notice_id);

      if (values.noticeFile) {
        formData.append('notice_file', values.noticeFile);
      }

      var result = await fetch(baseUrl + 'updateNotice.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      var data = await result.json();

      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while uploading the notice.');
    }
  };

  return (
    <div className="notices-upload-container">
      <h2>{notice ? 'Edit Notice' : 'Upload Notices'}</h2>
      <Formik
        initialValues={{
          noticeTitle: notice?.title || '',
          noticeDescription: notice?.description || '',
          noticeFile: undefined,
        }}
        enableReinitialize={true}
        validateOnMount={true}
        validationSchema={NoticesSchema}
        onSubmit={async (values, { resetForm }) => {
          if (notice) {
            await updateNotice(values);
          } else {
            await addNotice(values);
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

            {
              //upload file
            }
            <div className="field-container">
              <label htmlFor="noticeFile">Notice File (Image/Pdf)</label>
              <Field
                name="noticeFile"
                type="file"
                accept="image/*,application/pdf"
                placeholder="Upload file"
                value={undefined}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue('noticeFile', file);
                }}
              />
              <ErrorMessage
                name="noticeFile"
                component="div"
                className="error-div"
              />
            </div>

            <button type="submit" className="submit-btn">
              {notice ? 'Update Notice' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoticesUpload;
