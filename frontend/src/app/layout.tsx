'use client';

import { SnackbarProvider } from '@/_components/contexts/SnackbarContext';
import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material';

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
