// src/components/SearchForm.js
import React, { useState } from 'react';
import { searchUsers } from '../services/userService';

const SearchForm = ({ onSelectUser }) => {
    const [username, setUsername] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const users = await searchUsers(username);
        onSelectUser(users);
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
