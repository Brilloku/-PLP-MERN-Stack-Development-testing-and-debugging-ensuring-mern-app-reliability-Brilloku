import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugItem from '../components/BugItem';

describe('BugItem', () => {
  const mockBug = {
    _id: '1',
    title: 'Test Bug',
    description: 'Test Description',
    status: 'open',
    createdAt: '2023-01-01T00:00:00.000Z'
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders bug information', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('open')).toBeInTheDocument();
  });

  test('renders edit and delete buttons', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  test('enters edit mode when edit button is clicked', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue('Test Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('calls onUpdate with correct data when save is clicked', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByDisplayValue('Test Bug');
    const descriptionInput = screen.getByDisplayValue('Test Description');
    const statusSelect = screen.getByRole('combobox');
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(titleInput, { target: { value: 'Updated Bug' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.change(statusSelect, { target: { value: 'resolved' } });
    fireEvent.click(saveButton);

    expect(mockOnUpdate).toHaveBeenCalledWith('1', {
      title: 'Updated Bug',
      description: 'Updated Description',
      status: 'resolved'
    });
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('cancels edit mode when cancel is clicked', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByDisplayValue('Test Bug');
    fireEvent.change(titleInput, { target: { value: 'Changed' } });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
