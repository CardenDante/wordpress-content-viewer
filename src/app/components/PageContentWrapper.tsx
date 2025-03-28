// app/components/PageContentWrapper.tsx
'use client';
import React from 'react';

type PageContentWrapperProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function PageContentWrapper({ children, onClick }: PageContentWrapperProps) {
  return (
    <div onClick={onClick} className="prose max-w-none">
      {children}
    </div>
  );
}