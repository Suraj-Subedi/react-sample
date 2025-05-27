import React from 'react';

const AppPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
      <nav>
        <div style={{ display: 'flex', padding: 0, gap: 5, margin: 0 }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              style={{
                display: 'inline',

                cursor: 'pointer',
              }}
            >
              <button
                style={{
                  padding: '8px 12px',
                  border: '1px solid #007bff',
                  borderRadius: '4px',
                  backgroundColor:
                    currentPage === index + 1 ? '#007bff' : '#fff',
                  color: currentPage === index + 1 ? '#fff' : '#007bff',
                  cursor: 'pointer',
                }}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppPagination;
