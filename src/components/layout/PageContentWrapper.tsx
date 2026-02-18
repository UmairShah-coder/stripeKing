// src/components/layout/PageContentWrapper.tsx
import React, { useEffect, useState } from "react";

interface PageContentWrapperProps {
  children: React.ReactNode;
  delay?: number; // loader duration in ms
}

const PageContentWrapper: React.FC<PageContentWrapperProps> = ({ children, delay = 700 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (loading) return <></>; // Show nothing, PageLoader handles UI

  return <>{children}</>;
};

export default PageContentWrapper;
