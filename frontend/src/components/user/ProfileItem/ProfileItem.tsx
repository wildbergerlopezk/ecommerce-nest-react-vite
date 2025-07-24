import React from 'react';

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ 
  icon, 
  label, 
  value, 
  editing, 
  onChange 
}) => (
  <div className="profile-item">
    {icon}
    <div className="profile-details">
      <label>{label}</label>
      {editing ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="edit-input"
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  </div>
);

export default ProfileItem;