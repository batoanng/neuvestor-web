import { HomeLayout } from './HomeLayout';
import { HomeContextProvider } from './HomeContext';
import { HomePlayground } from './HomePlayground';
import { Box } from '@mui/material';

export const HomePage = () => {
  return (
    <HomeContextProvider>
      <HomeLayout>
        <Box width="100%" height="100%" flexGrow={1} p={2}>
          <HomePlayground />
        </Box>
      </HomeLayout>
    </HomeContextProvider>
  );
};
