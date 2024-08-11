import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, deleteAccount } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            toast.success('Account deleted successfully', {
                position: 'top-right',
                autoClose: 3000
            });
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
        } catch (error) {
            console.error('Error during deleting account:', error);
            toast.error('Failed to delete account', {
                position: 'top-right',
                autoClose: 3000
            });
        }
    };

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>Profile</h2>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
    );
};

export default Profile;
