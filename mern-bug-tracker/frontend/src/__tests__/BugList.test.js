import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugList from '../components/BugList';
import BugItem from '../components/BugItem';

// Mock BugItem component
jest.mock('../components/BugItem', () => {
  return function MockBugItem({ bug }) {
    return <div data-testid={`bug-item-${bug._id}`}>{bug.title}</div>;
  };
});

describe('BugList', () => {
  const mockBugs = [
    { _id: '1', title: 'Bug 1', description: 'Description 1', status: 'open' },
    { _id: '2', title: 'Bug 2', description: 'Description 2', status: 'resolved' }
  ];

  const mockOnUpdateBug = jest.fn();
  const mockOnDeleteBug = jest.fn();

  test('renders bug list with bugs', () => {
    render(<BugList bugs={mockBugs} onUpdateBug={mockOnUpdateBug} onDeleteBug={mockOnDeleteBug} />);
    expect(screen.getByText('Bug List')).toBeInTheDocument();
    expect(screen.getByTestId('bug-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('bug-item-2')).toBeInTheDocument();
  });

  test('renders message when no bugs', () => {
    render(<BugList bugs={[]} onUpdateBug={mockOnUpdateBug} onDeleteBug={mockOnDeleteBug} />);
    expect(screen.getByText('No bugs found.')).toBeInTheDocument();
  });

  test('passes props to BugItem components', () => {
    render(<BugList bugs={mockBugs} onUpdateBug={mockOnUpdateBug} onDeleteBug={mockOnDeleteBug} />);
    expect(screen.getByTestId('bug-item-1')).toHaveTextContent('Bug 1');
    expect(screen.getByTestId('bug-item-2')).toHaveTextContent('Bug 2');
  });
});
