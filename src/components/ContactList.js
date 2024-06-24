// src/components/ContactList.js
import React, { useState, useEffect } from 'react';
import { getUserFriends } from '../services/userService';
import { createOrGetChat } from '../services/chatService';

const ContactList = ({ userId, onSelectChat, setSelectedFriendId, setUsers }) => {
    const [friends, setFriends] = useState([]);


    
const handleCreateOrGetChat = async (userId, users) => {
    setUsers(users);
    const chat = await createOrGetChat(userId, users);
    onSelectChat(chat?._id);
}
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
                    onClick={() => handleCreateOrGetChat(userId, [userId,friend._id])}
                >
                    {friend.username}
                </div>
            ))}
        </div>
    );
};

export default ContactList;
