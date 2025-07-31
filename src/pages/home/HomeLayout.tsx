import { PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { HomeDrawer } from './HomeDrawer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <HomeDrawer />

      <Box>{children}</Box>
    </Box>
  );
};
