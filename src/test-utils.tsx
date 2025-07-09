import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '@batoanng/mui-components';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

const customRender: (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => RenderResult = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
