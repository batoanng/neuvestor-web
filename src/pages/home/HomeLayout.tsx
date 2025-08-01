import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { HomeDrawer } from './HomeDrawer';

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box display="flex">
      <HomeDrawer />
      {children}
    </Box>
  );
};
