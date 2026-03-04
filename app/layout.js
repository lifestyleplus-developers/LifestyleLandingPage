import { Inter } from 'next/font/google';
import './globals.css';
import SiteFrame from '../components/SiteFrame';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Lifestyle + AI',
  description: 'Lifestyle + AI builds modern web products with speed, clarity, and quality engineering.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
