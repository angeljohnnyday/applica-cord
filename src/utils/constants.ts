const constants =  {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? '',
  apiToken: process.env.NEXT_PUBLIC_API_TOKEN ?? '',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL ?? '',
  imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL ?? '',
  tmdbUrl: process.env.NEXT_PUBLIC_TMDB_URL ?? '',
}

export default constants;