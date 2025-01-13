'use client';
import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';


const PreviousUrlContext = createContext();


export const PreviousUrlProvider = ({ children }) => {
  const [previousUrl, setPreviousUrl] = useState(null);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    
     setPreviousUrl(prevPathnameRef.current);
    prevPathnameRef.current = pathname;
   
  }, [pathname]); 
  return (
    <PreviousUrlContext.Provider value={{ previousUrl }}>
      {children}
    </PreviousUrlContext.Provider>
  );
};


export const usePreviousUrl = () => {
  return useContext(PreviousUrlContext); 
};
