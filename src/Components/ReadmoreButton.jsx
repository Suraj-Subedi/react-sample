import React from 'react';
import { Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

const ReadmoreButton = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Flex gap="small" wrap>
      <Button
        style={{ margin: '1rem' }}
        type="primary"
        onClick={() => navigate(`/post/${post._id}`)}
      >
        Read more
      </Button>
    </Flex>
  );
};

export default ReadmoreButton;
