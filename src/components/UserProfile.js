// src/components/UserProfile.js
import React, { useState, useEffect } from "react";
import { acceptFriendRequest, getUserFriendRequests, getUserFriends, getUserProfile } from "../services/userService";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [viewFriendList, setViewFriendList] = useState(false);
  const [frienRequests, setFriendRequests] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserProfile(userId);
      const friendsData = await getUserFriends(userId)
      setUserFriends(friendsData)
      const friendRequests = await getUserFriendRequests(userId);
      setFriendRequests(friendRequests.requests);
      setUser(data);
    };
    fetchUser();
  }, [userId, refetch]);

  if(user?.friends?.length) {
    user.friends.map((friend) => {
        console.log(friend);
        })
  }

  async function handleAcceptRequest(senderId, friendId) {
    const confirm = window.confirm(
      "Are you sure you want to accept this friend request?"
    );
    console.log(senderId, friendId);
    if (confirm) {
       const response =  await acceptFriendRequest(senderId, friendId)
       setRefetch(!refetch)
    } else return
  }




  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{user.username}</h2>
      <p
        onClick={() => {
          setViewFriendList(!viewFriendList);
        }}
        style={{
          cursor: "pointer",
        }}
      >
        Friends: {userFriends?.length}
      </p>
      {viewFriendList && (
        <div>
          <h3>Friends List</h3>
          <ul>
            { userFriends?.length && userFriends.map((friend,i) => (
              <li key={i}>username: {friend.username}</li>
            ))}
          </ul>
          <h3>Friends Requests {frienRequests?.length}</h3>
          <ul>
            {frienRequests?.map((profile) => (
              <li key={profile._id}>
                {profile.username} -{" "}
                <button
                  onClick={() => handleAcceptRequest(userId,profile._id)}
                >
                  Accept
                </button>{" "}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Display additional user information here */}
    </div>
  );
};

export default UserProfile;
