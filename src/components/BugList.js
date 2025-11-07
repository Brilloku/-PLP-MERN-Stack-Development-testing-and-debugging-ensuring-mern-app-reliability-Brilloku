import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bugs');
      setBugs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bugs');
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bugs/${id}`, { status: newStatus });
      fetchBugs(); // Refresh the list
    } catch (err) {
      setError('Failed to update bug status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      fetchBugs(); // Refresh the list
    } catch (err) {
      setError('Failed to delete bug');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Bug List</h2>
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id}>
              <h3>{bug.title}</h3>
              <p>{bug.description}</p>
              <p>Status: {bug.status}</p>
              <p>Created: {new Date(bug.createdAt).toLocaleDateString()}</p>
              <select
                value={bug.status}
                onChange={(e) => handleStatusChange(bug._id, e.target.value)}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button onClick={() => handleDelete(bug._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BugList;
