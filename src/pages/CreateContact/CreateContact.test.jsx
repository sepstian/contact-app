import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateContact from './CreateContact';

describe('CreateContact Component', () => {
  it('renders form and validates input fields', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateContact />);

    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Birthday'), { target: { value: '1990-01-01' } });
    fireEvent.change(getByPlaceholderText('Example: https://photo or http://photo'), { target: { value: 'https://example.com/photo.jpg' } });

    fireEvent.click(getByText('Create'));

    await waitFor(() => {
      expect(getByText('Succes Create Contact.')).toBeInTheDocument();
    });
  });

  it('handles input validation and displays error messages', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateContact />);

    fireEvent.click(getByText('Create'));

    await waitFor(() => {
      expect(getByText('Please ensure all fields are filled.')).toBeInTheDocument();
    });

    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });

    fireEvent.click(getByText('Create'));

    await waitFor(() => {
      expect(getByText('Error')).toBeInTheDocument(); 
    });
  });
});
