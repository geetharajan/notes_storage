'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import './globals.css';
import Breadcrumbs from '@/components/Breadcrumbs';



export default function RootLayout({ children }) {
  // const pathname = usePathname();
  // const authPages = ['/login', '/signup'];
  // const isAuthPage = authPages.includes(pathname);

  return (
    <html lang="en">
      <body>
        <Header />
        <Breadcrumbs/>
        <main>{children}</main>
      </body>
    </html>
  );
}