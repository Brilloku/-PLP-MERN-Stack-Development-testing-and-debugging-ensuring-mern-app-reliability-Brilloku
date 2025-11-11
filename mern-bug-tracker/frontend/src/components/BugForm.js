import React, { useState } from 'react';

function BugForm({ onAddBug }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting bug:', { title, description }); // Intentional console log for debugging
    if (title.trim() && description.trim()) {
      onAddBug({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    } else {
      console.error('Validation failed: Title and description are required'); // Intentional console log for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <h2>Add New Bug</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="100"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="500"
          required
        />
      </div>
      <button type="submit">Add Bug</button>
    </form>
  );
}

export default BugForm;
