import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';


const ProfileIcon = ({ logOut }) => {

  const isAuthenticated = sessionStorage.getItem('accessToken');

  const handleMenuClick = (e) => {
    if (e.key == '1') {
      navigate('/admin/login');
    }
    if (e.key == '2') {

    }
  };
  const items = [
    {
      label: 'Admin login',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Logout',
      key: '2',
      icon: <UserOutlined />,
      disabled: false,
      danger: true,
    },
  ];

  const item2 = items.slice(1);

  const menuProps1 = {
    items,
    onClick: handleMenuClick,
  };
  const menuProps2 = {
    items: item2,
    onClick: handleMenuClick,
  };

  const navigate = useNavigate();

  return (
    <Space>
      <Dropdown.Button menu={!isAuthenticated ? menuProps1 : menuProps2}>
        <UserOutlined />
      </Dropdown.Button>
    </Space>
  );
};
export default ProfileIcon;
