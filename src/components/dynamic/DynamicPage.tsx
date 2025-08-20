import React from 'react';
import type { HomepageData } from '@/types';
import ComponentRenderer from './ComponentRenderer';

interface DynamicPageProps {
  pageData: HomepageData;
  className?: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ pageData, className = '' }) => {
  return (
    <div className={`dynamic-page ${className}`}>
      {pageData.components?.map((component, index) => (
        <ComponentRenderer
          key={index}
          component={component}
          index={index}
        />
      ))}
    </div>
  );
};

export default DynamicPage;