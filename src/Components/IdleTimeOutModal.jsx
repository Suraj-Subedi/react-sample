import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';

const IdleTimeOutModal = ({
  showModal,
  handleContinue,
  handleLogout,
  elapsedTime,
}) => {
  const [timeoutData, setTimeoutData] = useState(undefined);
  const [intervalData, setIntervalData] = useState(undefined);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (elapsedTime === 1000) {
      setIntervalData(
        setInterval(() => {
          setTime((prev) => prev + 1000);
        }, 1000)
      );
    }
    if (elapsedTime === -1) {
      clearInterval(intervalData);
      clearTimeout(timeoutData);
      setTime(0);
    }
  }, [elapsedTime]);

  useEffect(() => {
    if (time === 1000 && !timeoutData) {
      setTimeoutData(
        setTimeout(() => {
          window.localStorage.setItem('redirectTo', window.location.href);
          handleLogout();
        }, 15000)
      );
    }
  }, [time]);

  return (
    <Modal
      title="You Have Been Idle!"
      open={showModal}
      onCancel={handleContinue}
      footer={[
        <Button key="logout" type="primary" danger onClick={handleLogout}>
          Logout
        </Button>,
        <Button key="continue" type="default" onClick={handleContinue}>
          Continue Session
        </Button>,
      ]}
    >
      You have been idle for 15 minutes. Logging out in {(16000 - time) / 1000}{' '}
      seconds.
    </Modal>
  );
};

export default IdleTimeOutModal;
