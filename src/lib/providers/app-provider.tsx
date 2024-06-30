"use client"

import React, { ReactNode, createContext, useEffect, useState } from 'react'
import searchMovie from '@/lib/api/search-move';
import { SearchMovieType } from '@/types/search-type';

interface AppContextProps {
  search: string;
  page: number;
  movies: null | SearchMovieType;
  loading: boolean;
  error: boolean;
  handleSearch: (search: string) => void;
  handlePage: (page: number) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextProps>({
  search: '',
  page: 1,
  movies: null,
  loading: false,
  error: false,
  handleSearch: () => {},
  handlePage: () => {},
});

export default function AppProvider({ children }: AppProviderProps) {
  const [search, setSearch] = useState<string>('');
  const [movies, setMovies] = useState<null | SearchMovieType>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    setMovies(null);
    setError(false);
    setPage(1);
    if(!!value) setLoading(true);
  };

  const handlePage = (selectedPage: number) => {
    setLoading(true);
    setError(false);
    setPage(selectedPage);
  }

  useEffect(() => {
    if(!search) setMovies(null);

    const delayDebounceFn = setTimeout(async() => {
      if (!!search) {
        try {
          const data = await searchMovie(search, page);
          setMovies(data);
        } catch {
          setError(true);
        }
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [search, page])

  return (
    <AppContext.Provider
      value={{
        search,
        movies,
        loading,
        page,
        error,
        handleSearch,
        handlePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
