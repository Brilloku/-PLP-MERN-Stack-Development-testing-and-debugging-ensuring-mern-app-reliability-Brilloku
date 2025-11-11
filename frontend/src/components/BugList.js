import React from 'react';
import BugItem from './BugItem';

function BugList({ bugs, onUpdateBug, onDeleteBug }) {
  return (
    <div className="bug-list">
      <h2>Bug List</h2>
      {bugs.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        bugs.map(bug => (
          <BugItem
            key={bug._id}
            bug={bug}
            onUpdate={onUpdateBug}
            onDelete={onDeleteBug}
          />
        ))
      )}
    </div>
  );
}

export default BugList;
