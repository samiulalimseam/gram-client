import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  createOrGetChat,
  getMessageContent,
  sendMessage,
} from "../services/chatService";

const ChatBox = ({ chatId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageIds, setMessageIds] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshChat, setRefreshChat] = useState(false);

  // Reference to the messages container
  const messagesEndRef = useRef(null);

  // Fetch messages on initial load or when chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await createOrGetChat(chatId, [user?._id, chatId]);
        setMessageIds(data?.messages || []);
      } catch (error) {
        setError('Failed to fetch chat.');
        console.error('Fetch Messages Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (chatId && user?._id) {
      fetchMessages();
    }
  }, [chatId, user?._id, refreshChat]);

  // Fetch message content whenever message IDs change
  useEffect(() => {
    const fetchMessageContent = async () => {
      if (messageIds.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getMessageContent(messageIds);
        setMessages(data?.messages || []);
      } catch (error) {
        setError('Failed to fetch message content.');
        console.error('Fetch Message Content Error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessageContent();
  }, [messageIds]);

  // Scroll to the bottom of the messages container
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshChat((prev) => !prev);
    }, 600000);

    return () => clearInterval(interval);
  },[])

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      setError(null);

      try {
        const message = await sendMessage(chatId, user?._id, newMessage);
        if (message) {
          console.log('Message sent:', message?.content);
          setMessages((prevMessages) => [...prevMessages, message]);
          setNewMessage("");
        }
      } catch (error) {
        setError('Failed to send message.');
        console.error('Send Message Error:', error.message);
      }
    }
  }, [newMessage, chatId, user?._id]);

  return (
    <div onMouseEnter={() => setRefreshChat(!refreshChat)} className="chat-box">
      {false ? <div>Loading...</div> : <div onClick={() => setRefreshChat(prev => !prev)} style={{
        cursor: "pointer",
      }} >Messages</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="messages">
        {messages?.map((message) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent:
                message.sender === user._id ? "flex-end" : "flex-start",
            }}
            key={message._id}
            className="message"
          >
            {message.content}
          </div>
        ))}
        {/* Scroll-to-bottom reference */}
        <div ref={messagesEndRef} />
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
