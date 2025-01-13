'use client'
import { usePathname } from 'next/navigation'
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => {
  const pathname = usePathname();

  const hideSidebarNavbar = pathname === '/auth/login' || pathname === '/login' ;

  return (
    <div className="layout">
      {!hideSidebarNavbar && <Header />}
      {!hideSidebarNavbar && <Sidebar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
