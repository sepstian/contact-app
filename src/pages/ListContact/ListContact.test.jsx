import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListContact from './ListContact';

describe('ListContact Component', () => {
  beforeEach(() => {
    render(<ListContact />);
  });

  it('renders list of contacts correctly', () => {
    const contactElement = screen.getByText(/List Contact/i);
    expect(contactElement).toBeInTheDocument();
  });

  it('handles search input correctly', () => {
    const searchInput = screen.getByPlaceholderText('Search Contact with Id/FirstName/LastName/Age');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');
  });
});
