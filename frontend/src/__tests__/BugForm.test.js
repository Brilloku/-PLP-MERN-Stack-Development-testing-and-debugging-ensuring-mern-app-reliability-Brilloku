import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugForm from '../components/BugForm';

describe('BugForm', () => {
  const mockOnAddBug = jest.fn();

  beforeEach(() => {
    mockOnAddBug.mockClear();
  });

  test('renders form elements', () => {
    render(<BugForm onAddBug={mockOnAddBug} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add bug/i })).toBeInTheDocument();
  });

  test('submits form with valid data', () => {
    render(<BugForm onAddBug={mockOnAddBug} />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add bug/i });

    fireEvent.change(titleInput, { target: { value: 'Test Bug' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.click(submitButton);

    expect(mockOnAddBug).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'Test Description'
    });
  });

  test('does not submit form with empty fields', () => {
    render(<BugForm onAddBug={mockOnAddBug} />);
    const submitButton = screen.getByRole('button', { name: /add bug/i });

    fireEvent.click(submitButton);

    expect(mockOnAddBug).not.toHaveBeenCalled();
  });

  test('trims whitespace from inputs', () => {
    render(<BugForm onAddBug={mockOnAddBug} />);
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add bug/i });

    fireEvent.change(titleInput, { target: { value: '  Test Bug  ' } });
    fireEvent.change(descriptionInput, { target: { value: '  Test Description  ' } });
    fireEvent.click(submitButton);

    expect(mockOnAddBug).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'Test Description'
    });
  });
});
