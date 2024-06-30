// import { type GridProps } from '@mui/material';
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';

export interface ColProps extends Omit<Grid2Props, 'item' | 'container'> {}

export default function Col({ children, sx, ...rest }: ColProps) {
  return (
    <Grid {...rest}>
      {children}
    </Grid>
  );
}
