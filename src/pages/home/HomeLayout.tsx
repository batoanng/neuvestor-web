import { PropsWithChildren } from 'react';
import Box from '@mui/material/Box';
import { HomeDrawer } from './HomeDrawer';

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box width="100vw" height="100vh" display="flex">
      <HomeDrawer />
      {children}
    </Box>
  );
};
