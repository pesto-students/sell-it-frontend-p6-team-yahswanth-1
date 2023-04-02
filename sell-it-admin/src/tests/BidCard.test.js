import React from 'react';
import { render, screen } from '@testing-library/react';
import BidCard from '../components/reusable/BidCard';

describe('BidCard', () => {
  const props = {
    image: 'https://cdn.shopify.com/s/files/1/0085/5513/5039/products/01_2f252fa4-d6e1-4e43-8dd8-54af32d2581d_800x.jpg?v=1581528005',
    name: 'Test Bid',
    description: 'This is a test bid description',
    category: 'Test Category',
    createdBy: 'Test User',
    userId: 1,
    bidId: 1,
  };

  it('renders bid card with correct details', () => {
    render(<BidCard {...props} />);

    expect(screen.getByRole('img', { name: 'Test Bid' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test Bid' })).toBeInTheDocument();
    expect(screen.getByText('This is a test bid description')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View details' })).toBeInTheDocument();
  });

  it('renders user avatar with correct tooltip', () => {
    render(<BidCard {...props} />);

    expect(screen.getByRole('img', { name: 'Test Bid' })).toBeInTheDocument();
    expect(screen.getByTitle('Test User')).toBeInTheDocument();
  });

  it('links to user details page', () => {
    render(<BidCard {...props} />);

    expect(screen.getByTitle('Test User')).toHaveAttribute('href', '/user-details/1');
  });

  it('links to bid details page', () => {
    render(<BidCard {...props} />);

    expect(screen.getByRole('button', { name: 'View details' })).toHaveAttribute('href', '/bid-details/1');
  });
});
