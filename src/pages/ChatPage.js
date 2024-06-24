import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ChatBox from "../components/ChatBox";
import ContactList from "../components/ContactList";
import "./ChatPage.css"; // Import the CSS file for styles

const ChatPage = () => {
  const { user, loading } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="chat-page">
      {/* Button to toggle sidebar visibility on mobile and tablet */}
      <button
        className="toggle-sidebar"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        ☰
      </button>

      {/* Sidebar for mobile and tablet */}
      <div
        id="mobile-sidebar"
        className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}
      >
        <ContactList
          userId={user?._id}
          setSelectedFriendId={selectedChatId}
          onSelectChat={(chatId) => {
            setSelectedChatId(chatId);
            setIsSidebarVisible(false); // Hide sidebar after selecting a chat
          }}
        />
      </div>

      {/* Sidebar for larger screens */}
      <div id="full-sidebar" className="sidebar">
        <ContactList
          userId={user?._id}
          setSelectedFriendId={selectedChatId}
          onSelectChat={setSelectedChatId}
        />
      </div>

      {/* Main chat area */}
      <div className="chat-content">
        {selectedChatId && <ChatBox chatId={selectedChatId} />}
      </div>
    </div>
  );
};

export default ChatPage;
