import React, { useState } from 'react';
import axios from 'axios';

const BugForm = ({ onBugAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/bugs', {
        title,
        description,
      });
      onBugAdded(response.data);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to create bug');
    }
  };

  return (
    <div>
      <h2>Report a Bug</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Report Bug</button>
      </form>
    </div>
  );
};

export default BugForm;
