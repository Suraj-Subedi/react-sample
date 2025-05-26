import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/constant';
import { useSearchParams } from 'react-router-dom';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const formData = new FormData();
      formData.append('token', localStorage.getItem('accessToken'));

      var result = await fetch(baseUrl + 'getInquiry.php', {
        method: 'POST',
        body: formData,
      });

      var data = await result.json();

      if (data.success) {
        setInquiries(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
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
      <h1>Inquiries</h1>
      <p
        style={{
          fontSize: '16px',
          color: '#666',
          fontWeight: '400',
          lineHeight: '1.5',
        }}
      >
        All the inquiries made by the users will be shown here.
      </p>
      {
        <table>
          <thead>
            <tr>
              <th>Inquiry ID</th>
              <th>First Name </th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Message</th>
              <th>Inquiry Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.inquiry_id}>
                <td>{inquiry.inquiry_id}</td>
                <td>{inquiry.first_name}</td>
                <td>{inquiry.last_name}</td>
                <td>{inquiry.email}</td>
                <td>{inquiry.phone_number}</td>
                <td>{inquiry.message}</td>
                <td>
                  {new Date(inquiry.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default AdminInquiries;
