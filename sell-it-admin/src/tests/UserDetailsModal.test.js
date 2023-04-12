import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserDetailsModal } from '../components/modal/UserDetailsModal';

describe('UserDetailsModal', () => {
  const mockData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 1,
    mobile: 1234567890,
    identityProofImageUri: 'https://example.com',
    addressLine1: '123 Main St',
    landmark: 'Nearby Park',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    bankAccountNumber: '1234567890',
    ifscCode: 'ABC1234567',
    customerId: '123',
    accountHolderName: 'John Doe',
    fundAccountId: '456',
    isReported: false,
    otp: '123456',
    otpExpiry: '2022-01-01T00:00:00Z',
    tempMobile: '9876543210',
    updateMobileOtp: '654321',
    updateMobileOtpExpiry: '2022-01-01T00:00:00Z',
    reasonForReporting: '',
    UPI: 'john.doe@upi',
  };
// With tab
  test('renders User Details modal with personal details', () => {
    const handleClose = jest.fn();
    render(<UserDetailsModal open={true} handleClose={handleClose} data={mockData} />);
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('Personal details')).toBeInTheDocument();
  });
// Personal details
  test('renders personal details', () => {
    const handleClose = jest.fn();
    render(<UserDetailsModal open={true} handleClose={handleClose} data={mockData} />);
    expect(screen.getByText('Name:')).toHaveTextContent('John Doe');
    expect(screen.getByText('Email:')).toHaveTextContent('john.doe@example.com');
    expect(screen.getByText('Role:')).toHaveTextContent('1');
    expect(screen.getByText('Mobile:')).toHaveTextContent('1234567890');
    expect(screen.getByText('Identity Proof Image:')).toHaveTextContent('https://example.com');
    expect(screen.getByText('Address Line 1:')).toHaveTextContent('123 Main St');
    expect(screen.getByText('Landmark:')).toHaveTextContent('Nearby Park');
    expect(screen.getByText('City:')).toHaveTextContent('New York');
    expect(screen.getByText('State:')).toHaveTextContent('NY');
    expect(screen.getByText('Zip Code:')).toHaveTextContent('10001');
    expect(screen.getByText('Country:')).toHaveTextContent('USA');
    expect(screen.getByText('Bank Account Number:')).toHaveTextContent('1234567890');
    expect(screen.getByText('IFSC Code:')).toHaveTextContent('ABC1234567');
    expect(screen.getByText('Customer ID:')).toHaveTextContent('123');
  });

  test('clicks on Bank details tab', () => {
    const handleClose = jest.fn();
    render(<UserDetailsModal open={true} handleClose={handleClose} data={mockData} />);
    expect(screen.getByText('Bank details')).toBeInTheDocument();
    screen.getByText('Bank details').click();
    expect(screen.getByText('Bank details content')).toBeInTheDocument();
  });
});
