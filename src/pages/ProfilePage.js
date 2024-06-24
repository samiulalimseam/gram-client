// src/pages/ProfilePage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from '../components/UserProfile';
import SearchForm from '../components/SearchForm';
import { sendFriendRequest } from '../services/userService';

const ProfilePage = () => {
    const { user } = useAuth();
    const [searchResults, setSearchResults] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const handleUserSelect = async (users) => {
        setSearchResults(users);
    };

    const handleSendFriendRequest = async (userId) => {
        try {
            await sendFriendRequest(userId, user._id);
            // Optionally update UI or show notification
            alert('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
            alert('Failed to send friend request');
        } finally {
            setRefetch(!refetch);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <h2>Your Profile</h2>
            <UserProfile userId={user._id} />
            <SearchForm onSelectUser={handleUserSelect} />
            <div className="search-results">
                {searchResults.map((result) => (
                    <div key={result._id} className="search-result">
                        <span>{result.username}</span>
                        <button disabled={user?.friends?.includes(result?._id)} onClick={() => handleSendFriendRequest(result._id)}>
                          {user?.friends?.includes(result?._id) ? "Already in friend list" : "Send Friend Request" }  
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
