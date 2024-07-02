import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AppProvider } from '@/lib/providers';
import Page from '@/app/page';
import searchMovie from '@/lib/api/search-move';
import { movieMock1, movieMock2 } from '@/__mocks__/movie-mock';
import { formattedDate } from '@/utils/functions';
import { SearchMovieType } from '@/types/search-type';

jest.mock('@/lib/api/search-move');

const mockedSearchMovie = searchMovie as jest.MockedFunction<typeof searchMovie>;

const welcomeText = 'Movies, Series & Cinema with TMDB';
const inputValue = 'test movie';

const renderPage = () => render(
  <AppProvider>
    <Page />
  </AppProvider>
);

const assertCard = async (objecData: SearchMovieType, page: number) => {
  await waitFor(() => {
    expect(mockedSearchMovie).toHaveBeenCalledWith('test movie', page);
    expect(screen.queryByTestId('welcome-text')).not.toBeInTheDocument();
  });

   // Wait for the movies to be displayed
  await waitFor(() => {
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards.length).toBe(movieMock1.results.length);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  objecData.results.forEach(movie => {
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(formattedDate(movie.release_date))).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();

    const rating = screen.getByTestId(`rating-${movie.id}`);
    expect(rating).toHaveAttribute('aria-label', `${movie.vote_average} Stars`);
  });
}

describe('index - page', () => {
  it('welcome', async () => {
    renderPage();

    const search = await screen.findByTestId('search-input');
 
    expect(search).toBeVisible();
    expect(screen.getByTestId('welcome-text').textContent).toBe(welcomeText);
  });


  it('calls searchMovie on search input change', async () => {
    renderPage();

    mockedSearchMovie.mockResolvedValue(movieMock1);

    const searchInput = await screen.findByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: inputValue } });

    await assertCard(movieMock1, 1);
  });

  it('calls searchMovie on search input change - page 2', async () => {
    renderPage();

    const movieMock = { ...movieMock1, total_pages: 2 };
    mockedSearchMovie.mockResolvedValue(movieMock);

    const searchInput = await screen.findByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: inputValue } });

    await assertCard(movieMock, 1);

    const button1 = screen.getByRole('button', { name: /page 1/i });
    expect(button1.textContent).toBe('1');

    const button2 = screen.getByRole('button', { name: /go to page 2/i });
    expect(button2.textContent).toBe('2');

    mockedSearchMovie.mockResolvedValue(movieMock2);

    // Simulate a click on the button
    fireEvent.click(button2);

    // Render page 2
    await assertCard(movieMock2, 2);

    // going back to page 1
    fireEvent.click(screen.getByRole('button', { name: /go to page 1/i }));

    // Render page 1 again
    assertCard(movieMock, 2);
  });
})