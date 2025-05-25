'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import '../styles/breadcrumb.css';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(x => x);

  return (
    <div className="breadcrumb">
      <a href="/">Homepage</a>
      {pathnames.map((name, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        return (
          <span key={index}>
            {' / '}
            {isLast ? (
              <span className="breadcrumb-current">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            ) : (
              <a href={routeTo}>{name}</a>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;