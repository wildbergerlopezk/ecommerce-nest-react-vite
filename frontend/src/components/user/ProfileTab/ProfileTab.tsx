import { useState } from 'react';
import { Edit2, Save, X, User as UserIcon, Mail, Phone, MapPin } from 'lucide-react';
import ProfileItem from '../ProfileItem/ProfileItem';
import { type User } from '../../../types/User';
import './ProfileTab.css'
interface ProfileTabProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        ...editForm
      };
    });
    setIsEditing(false);
  };


  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Información Personal</h2>
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            <Edit2 size={20} />
            Editar
          </button>
        )}
      </div>
      
      <div className="profile-grid">
        <div className="profile-card">
          <ProfileItem 
            icon={<UserIcon className="profile-icon" size={24} />}
            label="Nombre completo"
            value={editForm.name}
            editing={isEditing}
            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
          />
          <ProfileItem 
            icon={<Mail className="profile-icon" size={24} />}
            label="Email"
            value={editForm.email}
            editing={isEditing}
            onChange={(e) => setEditForm({...editForm, email: e.target.value})}
          />
          <ProfileItem 
            icon={<Phone className="profile-icon" size={24} />}
            label="Teléfono"
            value={editForm.phone}
            editing={isEditing}
            onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
          />
          <ProfileItem 
            icon={<MapPin className="profile-icon" size={24} />}
            label="Dirección"
            value={editForm.address}
            editing={isEditing}
            onChange={(e) => setEditForm({...editForm, address: e.target.value})}
          />
        </div>
      </div>
      
      {isEditing && (
        <div className="edit-actions">
          <button className="save-btn" onClick={handleSave}>
            <Save size={20} />
            Guardar
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            <X size={20} />
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
