"use client"

import { useContext } from "react";
import Link from "next/link";
import { Box, Pagination, TextField, Typography } from "@mui/material";
import { AppContext } from "@/lib/providers";
import { Card, Col, Row, Skeleton } from "@/components";
import constants from "@/utils/constants";

export default function Home() {
  const { search, page, movies, loading, handleSearch, handlePage } = useContext(AppContext);
  
  return (
    <Box display="flex" flexDirection="column" rowGap="1.5rem">
      <Row>
        <Col xs={12} md={6} mdOffset={3} >
          <TextField
            label="Search movie"
            value={search}
            onChange={({ target: { value } }) => handleSearch(value)} 
          />
        </Col>
      </Row>
      <Row columnSpacing="2.4rem">
        {movies && movies?.results.length !== 0 && (
          <Col xs={12}>
            <Pagination 
              count={movies.total_pages} 
              color="primary" 
              variant="outlined"
              page={page}
              onChange={(_, value) => handlePage(value)}
              sx={{
                '.MuiPagination-ul': {
                  justifyContent: 'center'
                }
              }} 
            />
          </Col>
        )}
        {!loading && movies?.results.map(({ id, title, poster_path, release_date, vote_average }) => (
          <Col key={id} xs={12} md={4}>
            <Card 
              title={title} 
              path={poster_path}
              release_date={release_date}
              vote_average={vote_average}  
            />
          </Col>
        ))}
        {!search && (
          <Col xs={12} display="flex" justifyContent="center">
            <Typography 
              fontSize="3rem" 
              fontWeight={600}
              sx={{ 
                color: '#2E4053',
              }} 
            >
              Movies, Series & Cinema with
              <Link 
                href={constants.tmdbUrl} 
                target="_blank" 
                style={{ marginLeft: '0.8rem' }}
              >
                TMDB
              </Link>
            </Typography>
          </Col>
        )}
        {loading && (
          <>
            <Skeleton columns={3} />
          </>
        )}
      </Row>
    </Box>
  );
}