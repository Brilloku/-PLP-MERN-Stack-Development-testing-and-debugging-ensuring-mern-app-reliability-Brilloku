import React, { useState } from 'react';

function BugItem({ bug, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(bug.title);
  const [editDescription, setEditDescription] = useState(bug.description);
  const [editStatus, setEditStatus] = useState(bug.status);

  const handleUpdate = () => {
    onUpdate(bug._id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      status: editStatus
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(bug.title);
    setEditDescription(bug.description);
    setEditStatus(bug.status);
    setIsEditing(false);
  };

  return (
    <div className={`bug-item ${bug.status}`}>
      {isEditing ? (
        <div className="bug-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            maxLength="100"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            maxLength="500"
          />
          <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="bug-display">
          <h3>{bug.title}</h3>
          <p>{bug.description}</p>
          <p>Status: <span className={`status ${bug.status}`}>{bug.status}</span></p>
          <p>Created: {new Date(bug.createdAt).toLocaleDateString()}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(bug._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default BugItem;
