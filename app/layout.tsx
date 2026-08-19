import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnquiryModal } from '@/components/ui/EnquiryModal';
import { FloatingWidgets } from '@/components/layout/FloatingWidgets';

export const metadata: Metadata = {
  title: 'Comtech Information Services & Comtech Infosys | Premier IT Sales & Chip-Level Lab Suri, Birbhum',
  description: 'Suri\'s leading technology provider for CCTV ColorVu surveillance, certified Tally Prime ERP, chip-level laptop & motherboard repairs, corporate IT AMC, antivirus, and custom web development.',
  keywords: [
    'Comtech Suri',
    'Comtech Information Services',
    'Comtech Infosys',
    'CCTV Installation Suri Birbhum',
    'Tally Prime Partner Suri',
    'Laptop Motherboard Repair Suri',
    'IT AMC Birbhum',
    'Website Development Suri'
  ],
  authors: [{ name: 'Comtech Technology Group' }],
  openGraph: {
    title: 'Comtech Information Services & Comtech Infosys',
    description: 'Empowering Suri & Birbhum with Cutting-Edge IT Sales, Advanced Chip-Level Lab, CCTV & Cloud Solutions.',
    url: 'https://comtechis.in',
    siteName: 'Comtech Information Services',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#0e0309] text-slate-900 dark:text-slate-100 antialiased selection:bg-[#7B1B5A]/30 selection:text-[#E9A51A]">
        <AppProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <EnquiryModal />
          <FloatingWidgets />
        </AppProviders>
      </body>
    </html>
  );
}
