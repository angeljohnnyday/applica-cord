import React, { useMemo } from 'react'
import { Skeleton as MuiSkeleton } from '@mui/material'
import { Col } from '@/components'

interface SkeletonProps {
  columns: number;
}

export default function Skeleton({ columns }: SkeletonProps) {
  const array = useMemo(() => Array.from({ length: columns }, (_, index) => index + 1), [columns])

  return (
    <>
      {array.map((value) => (
        <Col xs={12} md={4} key={value}>
          <MuiSkeleton 
            variant="rectangular" 
            width='100%' 
            height="600px" 
            sx={{ borderRadius: '24px' }} 
          />
        </Col>
      ))}
    </>
  )
}
