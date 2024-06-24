import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { sendMessage } from '../services/chatService';

const socket = io('http://localhost:5000', {transports: ['websocket']}); // Replace with your server URL

const ChatBox = ({ chatId, users }) => {
  console.log("chat at chatbox", chatId);
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sender = users.find(usr => usr._id !== user._id);

  useEffect(() => {
    // Join the chat room upon component mount
    socket.emit('join', chatId);

    // Listen for new messages
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
      sendMessage(chatId, sender?._id, message.content);
    });

    return () => {
      socket.off('message');
    };
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    try {
      if (newMessage.trim() !== '') {
        const messageData = {
          chatId,
          sender: user?._id, // Replace with your sender ID logic
          content: newMessage.trim()
        };
        // Emit sendMessage event to server
        socket.emit('sendMessage', messageData);

        // Optionally, update local state immediately for responsiveness
        // setMessages(prevMessages => [...prevMessages, {
        //   sender: messageData.sender,
        //   content: messageData.content,
        //   createdAt: new Date()
        // }]);
        setNewMessage(''); // Clear input field after sending
      }
    } catch (error) {
      console.error('Failed to send message:', error.message);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
