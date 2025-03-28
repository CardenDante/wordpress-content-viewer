'use client';
import React, { useEffect, useState } from 'react';
import FullPageLoading from './ui/LoadingStates';

// This component is for use in loading.tsx files
export default function PageLoading() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Only show loading indicator after a short delay
  // This prevents flashing on fast connections
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return <FullPageLoading />;
}