import React, { useEffect } from 'react';

const Example = () => {
  useEffect(() => {
    setInterval(() => {
      alert('I am a alert box');
    }, [3000]);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        border: '2px solid black',
        padding: '25px',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            height: '200px',
            width: '400px',
            backgroundColor: 'green',
          }}
        >
          {' '}
          Example1
        </div>
        <div
          style={{ height: '200px', width: '400px', backgroundColor: 'red' }}
        >
          Example2
        </div>
        <div
          style={{ height: '200px', width: '400px', backgroundColor: 'blue' }}
        >
          Example2
        </div>
      </div>

      <div>
        <div
          style={{ height: '200px', width: '600px', backgroundColor: 'purple' }}
        >
          Notice1
        </div>
        <div
          style={{ height: '200px', width: '600px', backgroundColor: 'cyan' }}
        >
          Notice2
        </div>
        <div
          style={{ height: '200px', width: '600px', backgroundColor: 'gray' }}
        >
          Notice3
        </div>
      </div>
    </div>
  );
};

export default Example;
