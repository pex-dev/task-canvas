'use client';

import { ThemeProvider } from '@mui/material';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import theme from '@/styles/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <div>{children}</div>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
