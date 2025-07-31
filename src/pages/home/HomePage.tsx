import { HomeLayout } from './HomeLayout';
import { HomeContextProvider } from './HomeContext';
import { Box } from '@mui/material';

export const HomePage = () => {
  return (
    <HomeContextProvider>
      <HomeLayout>
        <Box>This is Home page</Box>
        <Box>This is Home page</Box>
        <Box>This is Home page</Box>
        <Box>This is Home page</Box>
        <Box>This is Home page</Box>
      </HomeLayout>
    </HomeContextProvider>
  );
};
