import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BugList from '../BugList';

jest.mock('axios');
const mockedAxios = axios;

describe('BugList', () => {
  const mockBugs = [
    { _id: '1', title: 'Bug 1', description: 'Description 1', status: 'open', createdAt: '2023-01-01' },
    { _id: '2', title: 'Bug 2', description: 'Description 2', status: 'resolved', createdAt: '2023-01-02' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    mockedAxios.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<BugList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders bug list when data is fetched', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBugs });
    render(<BugList />);

    await waitFor(() => {
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
      expect(screen.getByText('Bug 2')).toBeInTheDocument();
    });
  });

  test('renders empty state when no bugs', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    render(<BugList />);

    await waitFor(() => {
      expect(screen.getByText('No bugs reported yet.')).toBeInTheDocument();
    });
  });

  test('updates bug status', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBugs });
    mockedAxios.put.mockResolvedValueOnce({});
    mockedAxios.get.mockResolvedValueOnce({ data: [{ ...mockBugs[0], status: 'resolved' }, mockBugs[1]] });

    render(<BugList />);

    await waitFor(() => {
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
    });

    const select = screen.getAllByRole('combobox')[0];
    fireEvent.change(select, { target: { value: 'resolved' } });

    await waitFor(() => {
      expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:5000/api/bugs/1', { status: 'resolved' });
    });
  });

  test('deletes a bug', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBugs });
    mockedAxios.delete.mockResolvedValueOnce({});
    mockedAxios.get.mockResolvedValueOnce({ data: [mockBugs[1]] });

    render(<BugList />);

    await waitFor(() => {
      expect(screen.getByText('Bug 1')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:5000/api/bugs/1');
    });
  });

  test('shows error on fetch failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    render(<BugList />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch bugs')).toBeInTheDocument();
    });
  });
});
