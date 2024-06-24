// src/components/ContactList.js
import React, { useState, useEffect } from 'react';
import { getUserFriends } from '../services/userService';

const ContactList = ({ userId, onSelectChat, setSelectedFriendId }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            const data = await getUserFriends(userId);
            setFriends(data);
        };
        fetchFriends();
    }, [userId]);

    return (
        <div className="contact-list">
            {friends.map((friend) => (
                <div
                    key={friend._id}
                    className="contact"
                    onClick={() => onSelectChat(friend._id)}
                >
                    {friend.username}
                </div>
            ))}
        </div>
    );
};

export default ContactList;
