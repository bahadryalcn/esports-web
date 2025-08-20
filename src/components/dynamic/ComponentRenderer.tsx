import React from 'react';
import type { PageComponent } from '@/types';

// Import section components
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';
import SponsorsSection from '@/components/sections/SponsorsSection';

interface ComponentRendererProps {
  component: PageComponent;
  index?: number;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component, index = 0 }) => {
  const renderComponent = () => {
    switch (component._template) {
      case 'hero':
        return (
          <HeroSection
            title={component.headline}
            subtitle={component.subtext}
            ctaText={component.buttonText}
            ctaLink={component.buttonLink}
            backgroundImage={component.backgroundImage}
            overlay={component.overlay}
          />
        );

      case 'about':
        return (
          <AboutSection
            title={component.title}
            content={component.content}
            image={component.image}
            stats={component.stats}
          />
        );

      case 'services':
        return (
          <ServicesSection
            title={component.title}
            subtitle={component.subtitle}
          />
        );

      case 'news':
        return (
          <NewsSection
            title={component.title}
            subtitle={component.subtitle}
            limit={component.limit}
            showReadMore={component.showReadMore}
          />
        );

      case 'players':
        return (
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {component.title}
                </h2>
                {component.subtitle && (
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {component.subtitle}
                  </p>
                )}
              </div>
              {/* Players list would be rendered here */}
              <div className="text-center text-gray-500">
                Players section - {component.limit} players to show
              </div>
            </div>
          </div>
        );

      case 'sponsors':
        return (
          <SponsorsSection
            title={component.title}
            subtitle={component.subtitle}
          />
        );

      case 'contact':
        return (
          <ContactSection
            title={component.title}
            subtitle={component.subtitle}
            showForm={component.showForm}
          />
        );

      default:
        console.warn(`Unknown component template: ${(component as any)._template}`);
        return null;
    }
  };

  return (
    <section key={index} className="component-section">
      {renderComponent()}
    </section>
  );
};

export default ComponentRenderer;