import './globals.css';
import SiteFrame from '../components/SiteFrame';

export const metadata = {
  title: 'Lifestyle + AI',
  description: 'Lifestyle + AI builds modern web products with speed, clarity, and quality engineering.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
