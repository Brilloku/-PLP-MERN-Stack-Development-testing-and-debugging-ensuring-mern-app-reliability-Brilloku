import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

// Mock axios at the module level
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mock components
jest.mock('../components/BugForm', () => {
  return function MockBugForm({ onAddBug }) {
    return <div data-testid="bug-form">BugForm</div>;
  };
});

jest.mock('../components/BugList', () => {
  return function MockBugList({ bugs }) {
    return <div data-testid="bug-list">BugList with {bugs.length} bugs</div>;
  };
});

jest.mock('../components/ErrorBoundary', () => {
  return function MockErrorBoundary({ children }) {
    return <div data-testid="error-boundary">{children}</div>;
  };
});

describe('App', () => {
  const mockedAxios = require('axios');

  beforeEach(() => {
    mockedAxios.get.mockClear();
    mockedAxios.post.mockClear();
    mockedAxios.put.mockClear();
    mockedAxios.delete.mockClear();
  });

  test('renders loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<App />);
    expect(screen.getByText('Loading bugs...')).toBeInTheDocument();
  });

  test('renders bugs after successful fetch', async () => {
    const mockBugs = [
      { _id: '1', title: 'Bug 1', description: 'Desc 1', status: 'open' }
    ];
    mockedAxios.get.mockResolvedValue({ data: mockBugs });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('bug-list')).toHaveTextContent('BugList with 1 bugs');
    });
  });

  test('renders error message on fetch failure', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch bugs')).toBeInTheDocument();
    });
  });

  test('renders header with title', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<App />);
    expect(screen.getByText('Bug Tracker')).toBeInTheDocument();
  });

  test('renders BugForm component', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {}));
    render(<App />);
    expect(screen.getByTestId('bug-form')).toBeInTheDocument();
  });
});
