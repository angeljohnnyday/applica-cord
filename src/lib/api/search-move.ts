"use server"

import { SearchMovieType } from "@/types/search-type";
import api from "@/utils/axios-instance";

export default async function searchMovie(query: string, page = 1) {
    const res = await api.get<SearchMovieType>('/search/movie', { params: { query, page } });
    return res.data;
}