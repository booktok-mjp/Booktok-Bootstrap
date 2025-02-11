import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import HomeView from './HomeView';
import useAllBooks from '../../hooks/book/useAllBooks';
import { getLoggedInUsersBookcase } from '../../services/bookcaseService';

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn(),
}));

vi.mock('../../hooks/book/useAllBooks', () => ({
  default: vi.fn(),
  __esModule: true,
}));

vi.mock('../../services/bookcaseService', () => ({
  getLoggedInUsersBookcase: vi.fn(),
}));

describe('HomeView', () => {
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

    getLoggedInUsersBookcase.mockResolvedValue({
      books: [
        {
          id: 2,
          title: 'My Book',
          author_name: 'Jane Doe',
          description: 'heres a description...',
          imgUrl: '/url',
        },
      ],
    });
  });

  it('renders HomeView without crashing', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeView />
        </MemoryRouter>
      );
    });
  });

  it('displays the search bar', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeView />
        </MemoryRouter>
      );
    });

    expect(
      screen.getByPlaceholderText('Search books and authors...')
    ).toBeInTheDocument();
  });

  it('renders the bookcase section', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeView />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('My Book')).toBeInTheDocument();
    });
  });

  it('renders a book from the API', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeView />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });
  });

  it('renders the RecommendationCard component', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomeView />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Recommendations for You')).toBeInTheDocument();
  });

  it('renders a loading spinner when loading', async () => {
    useAllBooks.mockReturnValue({ allBooks: [], loading: true });

    await act(async () => {
      render(
        <MemoryRouter>
          <HomeView />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
