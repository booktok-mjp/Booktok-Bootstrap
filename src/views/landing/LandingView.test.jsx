import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import LandingView from './LandingView';

describe('LandingView', () => {
  it('renders the LandingView component', () => {
    render(<LandingView />);
    screen.debug();
  });
  it('renders the landing header', () => {
    render(<LandingView />);
    expect(screen.getByText('Welcome to Booktok...')).toBeInTheDocument();
  });
  it('renders the entry button', () => {
    render(<LandingView />);
    expect(screen.getByText('Enter')).toBeInTheDocument();
  });
  it('renders the tagline', () => {
    render(<LandingView />);
    expect(screen.getByText('Discover, share, connect.')).toBeInTheDocument();
  });
});
