import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PermissionManager = ({ navItems, backendUrl }) => {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`${backendUrl}/permissions`);
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [backendUrl]);

  const handleTogglePermission = (item) => {
    const updatedPermissions = {
      ...permissions,
      [item]: !permissions[item], // Toggle the permission
    };
    setPermissions(updatedPermissions);

    // Save the updated permissions to the backend
    savePermissions(item, updatedPermissions[item]);
  };

  const savePermissions = async (item, value) => {
    try {
      await axios.post(`${backendUrl}/permissions`, { item, value });
      console.log(`Permission for "${item}" updated successfully.`);
    } catch (error) {
      console.error(`Error updating permission for "${item}":`, error);
    }
  };

  return (
    <div className="permission-manager">
      <h2>Manage Permissions</h2>
      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item} className="nav-item">
            <span>{item}</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions[item] || false}
                onChange={() => handleTogglePermission(item)}
              />
              <span className="slider"></span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionManager;
