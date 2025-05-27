import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AppPagination from '../Pagination/Pagination';
import toast from 'react-hot-toast';
import { Pagination } from 'antd';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [total, setTotalData] = useState(0);
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const page = searchParams[0].get('page') || 1;
  const pageSize = searchParams[0].get('page_size') || 10;

  useEffect(() => {
    fetchInquiries();
  }, [location.key]);

  const fetchInquiries = async () => {
    try {
      const formData = new FormData();
      formData.append('token', localStorage.getItem('accessToken'));

      var result = await fetch(
        baseUrl + 'getInquiry.php' + '?' + searchParams[0].toString(),
        {
          method: 'POST',
          body: formData,
        }
      );

      var data = await result.json();

      if (data.success) {
        setInquiries(data.data);
        setTotalData(data.total);
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
        <>
          {/* <AppPagination
            onPageChange={(page) => {
              const params = new URLSearchParams(searchParams[0]);
              params.set('page', page);
              navigate(`/admin?${params.toString()}`, {
                replace: true,
              });
            }}
            currentPage={parseInt(page)}
            totalPages={totalPages}
          /> */}
          <Pagination
            current={parseInt(page)}
            total={Math.ceil(total / parseInt(pageSize)) * parseInt(pageSize)}
            onChange={(page, pageSize) => {
              const params = new URLSearchParams(searchParams[0]);
              params.set('page', page);
              params.set('page_size', pageSize);
              navigate(`/admin?${params.toString()}`, {
                replace: true,
              });
            }}
            showSizeChanger={true}
            pageSizeOptions={['5', '10', '20', '30']}
            style={{ marginBottom: '20px' }}
          />
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
        </>
      }
    </div>
  );
};

export default AdminInquiries;
