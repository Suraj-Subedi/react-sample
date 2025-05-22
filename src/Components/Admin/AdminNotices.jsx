import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/constant';
import { useSearchParams } from 'react-router-dom';


const AdminNotices = () => {


const [notices , setNotices] = useState([]);



  useEffect(() => {
    fetchNotices();
    }, []);


     const fetchNotices =async () => {
    try{

      const formData = new FormData();
        formData.append('token', localStorage.getItem('accessToken'))

    var result=  await fetch(baseUrl+"getNotice.php",{
        method:"POST",
        body:formData,
      })

      var data= await result.json();

      if(data.success){
        setNotices(data.data);
      }else{
        toast.error(data.message);
      }

    }catch (error) {
        console.error(error);
    }
  }




    return ( <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    }}>
        <h1>Notices</h1>
        <p style={{
            fontSize: '16px',
            color: '#666',
            fontWeight: '400',
            lineHeight: '1.5',

        }}>All the notices posted by the admin will be shown here.</p>
       {
        <table>
            <thead>
                <tr>
                    <th>Notice ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Upload Date</th>
                    <th>File</th>
                </tr>
            </thead>
            <tbody>
                {notices?.map((notice) => (
                    <tr key={notice.notice_id}>
                        <td>{notice.notice_id}</td>
                        <td>{notice.title}</td>
                        <td style={{
                            maxWidth: '200px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '14px',
                            lineHeight: '1.5',
                        }}>{notice.description}</td>
                        <td>{new Date(notice.created_at).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                          }
                        )}</td>
                        <td>
                          {
                           //view and download option
                            notice.file_url ? (
                              <div style={{
                                display: 'flex',

                                gap: '10px',

                                padding: '10px',


                              }}>
                                <a href={baseUrl+notice.file_url} download>
                                  Download
                                </a>
                                  <a href={baseUrl+notice.file_url} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                              </div>

                            ) : (
                              'No file available'
                            )
                          }
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>

       }
    </div> );
}

export default AdminNotices;
