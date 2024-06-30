import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';

export interface RowProps extends Omit<Grid2Props, 'container'> {}

export default function Row({ children, ...rest }: RowProps) {
  return (
    <Grid
      container
      columnSpacing='2.4rem'
      rowGap={{
        xs: '2.4rem',
      }}
      {...rest}
    >
      {children}
    </Grid>
  );
}
