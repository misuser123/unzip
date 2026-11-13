import './globals.css';

const SITE_URL = 'https://bharatsaini.vercel.app';
const TITLE = 'Bharat Saini — Full-stack developer';
const DESCRIPTION =
  'Full-stack developer with 3+ years of experience in TypeScript, Next.js, Node.js and PostgreSQL. Projects, experience and skills.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: SITE_URL, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION }
};

export const viewport = { themeColor: '#ffffff', colorScheme: 'light' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
