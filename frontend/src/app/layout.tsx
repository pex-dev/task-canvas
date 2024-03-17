import Auth from '@/_components/organisms/AppAuth';
import AppHeader from '@/_components/organisms/AppHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
