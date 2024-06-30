import React from 'react'

import { Box, Rating, Typography } from '@mui/material'
import { formattedDate, getImg } from '@/utils/functions';

interface CardProps {
  path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
}

export default function Card({ path, title, release_date, vote_average }: CardProps) {
  return (
    <Box
      borderRadius="24px"
      p="1.2rem"
      position="relative"
      height="600px"
      overflow="hidden"
      sx={{ 
        '&:hover .background-image': {
          transform: 'scale(1.2)',
        }
      }}
    >
      <Box 
        className="background-image"
        sx={{
          backgroundImage: getImg(path),
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "transform 0.5s ease",
        }}
      />
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center"
        height="100vh"
        alignItems="center"
        rowGap="1.2rem"
        sx={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography
          color="white" 
          textAlign="center"
          fontSize="2rem"
        >
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          color="white"
        >
          {formattedDate(release_date)}
        </Typography>
        <Rating
          readOnly 
          value={vote_average} 
          max={10} 
          precision={0.5}
          sx={{ 
            '.MuiRating-iconEmpty': {
              color: 'white !important',
            }
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          borderRadius: "24px",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        }}
      />
    </Box>
  )
}
