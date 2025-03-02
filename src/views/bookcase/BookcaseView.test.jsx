import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import useAllBooks from '../../hooks/book/useAllBooks';
import BookcaseView from './BookcaseView';
import useBookcase from '../../hooks/useBookcase';

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

vi.mock('../../hooks/book/useAllBooks', () => ({
  default: vi.fn(),
  __esModule: true,
}));

vi.mock('../../hooks/useBookcase', () => ({
  default: vi.fn(),
  __esModule: true,
}));

describe('Bookcase View', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: vi.fn().mockResolvedValue('mockAccessToken'),
    });

    useAllBooks.mockReturnValue({
      allBooks: [
        {
          id: 1,
          title: 'Test Book',
          author_name: 'John Doe',
          description: 'heres a description...',
          imgUrl: '/url',
        },
      ],
      loading: false,
    });

    useBookcase.mockReturnValue({
      books: [
        {
          id: 2,
          title: 'My Book From useBookcase',
          author_name: 'Jane Doe',
          description: 'heres a description...',
          imgUrl: '/url',
        },
      ],
      loading: false,
    });
  });

  it('renders BookcaseView without crashing', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <BookcaseView />
        </MemoryRouter>
      );
    });
  });

  it('renders the users bookcase', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <BookcaseView />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('My Book From useBookcase')).toBeInTheDocument();
    });
  });

  it('renders the book detail card for the current book', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <BookcaseView />
        </MemoryRouter>
      );
    });

    expect(screen.findByTestId('reading-now-container'));
  });

  it('renders a loading spinner when loading', async () => {
    useBookcase.mockReturnValue({ books: [], loading: true });

    await act(async () => {
      render(
        <MemoryRouter>
          <BookcaseView />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('loading-spinner'));
  });
});
