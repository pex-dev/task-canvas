'use client';
// import Auth from '@/_components/organisms/AppAuth';
// import AppHeader from '@/_components/organisms/AppHeader';

import theme from '@/styles/theme';
import { ThemeProvider } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning={true}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
