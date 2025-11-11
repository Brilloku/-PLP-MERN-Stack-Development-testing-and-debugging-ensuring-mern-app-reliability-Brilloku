import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bugs');
      setBugs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bugs');
      console.error('Error fetching bugs:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBug = async (bugData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/bugs', bugData);
      setBugs([...bugs, response.data]);
    } catch (err) {
      setError('Failed to add bug');
      console.error('Error adding bug:', err);
    }
  };

  const updateBug = async (id, bugData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bugs/${id}`, bugData);
      setBugs(bugs.map(bug => bug._id === id ? response.data : bug));
    } catch (err) {
      setError('Failed to update bug');
      console.error('Error updating bug:', err);
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      setBugs(bugs.filter(bug => bug._id !== id));
    } catch (err) {
      setError('Failed to delete bug');
      console.error('Error deleting bug:', err);
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <h1>Bug Tracker</h1>
          {error && <p className="error">{error}</p>}
        </header>
        <main>
          <BugForm onAddBug={addBug} />
          {loading ? (
            <p>Loading bugs...</p>
          ) : (
            <BugList bugs={bugs} onUpdateBug={updateBug} onDeleteBug={deleteBug} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
