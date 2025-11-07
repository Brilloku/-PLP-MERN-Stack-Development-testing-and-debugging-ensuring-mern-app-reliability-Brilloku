import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BugForm from '../BugForm';

jest.mock('axios');
const mockedAxios = axios;

describe('BugForm', () => {
  const mockOnBugAdded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements', () => {
    render(<BugForm onBugAdded={mockOnBugAdded} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /report bug/i })).toBeInTheDocument();
  });

  test('shows error when submitting empty form', async () => {
    render(<BugForm onBugAdded={mockOnBugAdded} />);
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));
    await waitFor(() => {
      expect(screen.getByText('Title and description are required')).toBeInTheDocument();
    });
  });

  test('submits form successfully', async () => {
    const newBug = { _id: '1', title: 'Test Bug', description: 'Test Description', status: 'open' };
    mockedAxios.post.mockResolvedValueOnce({ data: newBug });

    render(<BugForm onBugAdded={mockOnBugAdded} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5000/api/bugs', {
        title: 'Test Bug',
        description: 'Test Description',
      });
      expect(mockOnBugAdded).toHaveBeenCalledWith(newBug);
    });
  });

  test('shows error on API failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));

    render(<BugForm onBugAdded={mockOnBugAdded} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to create bug')).toBeInTheDocument();
    });
  });
});
