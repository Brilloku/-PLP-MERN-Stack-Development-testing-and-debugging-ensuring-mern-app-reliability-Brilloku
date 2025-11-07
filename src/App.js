import React, { useState } from 'react';
import './App.css';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [bugs, setBugs] = useState([]);

  const handleBugAdded = (newBug) => {
    setBugs([...bugs, newBug]);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Bug Tracker</h1>
        <BugForm onBugAdded={handleBugAdded} />
        <BugList />
      </div>
    </ErrorBoundary>
  );
}

export default App;
