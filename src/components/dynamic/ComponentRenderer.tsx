import React from 'react';
import type { PageComponent } from '@/types';

// Import section components
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import PlayersSection from '@/components/sections/PlayersSection';

interface ComponentRendererProps {
  component: PageComponent & { _template: string };
  index?: number;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component, index = 0 }) => {
  const renderComponent = () => {
    switch (component._template) {
      case 'hero':
        // Support both old format (single slide) and new format (multi-slide)
        const heroProps = component.slides ? {
          // New multi-slide format - slides array'i direkt geçir
          slides: component.slides,
          autoplay: component.autoplay,
          autoplaySpeed: component.autoplaySpeed,
          showDots: component.showDots,
          showArrows: component.showArrows,
        } : {
          // Old single-slide format (backwards compatibility)
          title: component.headline,
          subtitle: component.subtext,
          ctaText: component.buttonText,
          ctaLink: component.buttonLink,
          backgroundImage: component.backgroundImage,
          overlay: component.overlay,
          stats: component.stats,
        };
        
        return <HeroSection {...heroProps} />;

      case 'about':
        return (
          <AboutSection
            title={component.title}
            content={component.content}
            image={component.image}
            logo={component.logo}
            overlay={component.overlay}
            stats={component.stats}
            values={component.values}
            backgroundVariant={component.backgroundVariant}
            contentAlignment={component.contentAlignment}
            showStats={component.showStats}
            showValues={component.showValues}
          />
        );

      case 'services':
        return (
          <ServicesSection
            title={component.title}
            subtitle={component.subtitle}
            selectedServices={component.selectedServices}
            background={component.background}
            showBottomCTA={component.showBottomCTA}
            bottomCTAText={component.bottomCTAText}
            bottomCTALink={component.bottomCTALink}
          />
        );

              case 'news':
          return (
            <NewsSection
              title={component.title}
              subtitle={component.subtitle}
              selectedNews={component.selectedNews}
              showFeaturedOnly={component.showFeaturedOnly}
              maxArticles={component.maxArticles}
              layout={component.layout}
              showCategories={component.showCategories}
              showReadMore={component.showReadMore}
              cardStyle={component.cardStyle}
              background={component.background}
              showViewAllButton={component.showViewAllButton}
              viewAllButtonText={component.viewAllButtonText}
              viewAllButtonLink={component.viewAllButtonLink}
            />
          );

      case 'players':
        return (
          <PlayersSection
            title={component.title}
            subtitle={component.subtitle}
            selectedPlayers={component.selectedPlayers || []}
            showFeaturedOnly={component.showFeaturedOnly}
            background={component.background}
            showViewAllButton={component.showViewAllButton}
            viewAllButtonText={component.viewAllButtonText}
            viewAllButtonLink={component.viewAllButtonLink}
            socialMediaText={component.socialMediaText}
          />
        );

      case 'sponsors':
        return (
          <SponsorsSection
            title={component.title}
            subtitle={component.subtitle}
            selectedSponsors={component.selectedSponsors}
            background={component.background}
            showAutoScroll={component.showAutoScroll}
            autoScrollSpeed={component.autoScrollSpeed}
            viewAllButtonText={component.viewAllButtonText}
            viewAllButtonLink={component.viewAllButtonLink}
          />
        );

      case 'contact':
        return (
          <ContactSection
            title={component.title}
            subtitle={component.subtitle}
            showForm={component.showForm}
            backgroundImage={component.backgroundImage}
            overlay={component.overlay}
            backgroundVariant={component.backgroundVariant}
            contentAlignment={component.contentAlignment}
            contactInfo={component.contactInfo}
            formTitle={component.formTitle}
            formSubtitle={component.formSubtitle}
            infoTitle={component.infoTitle}
            infoSubtitle={component.infoSubtitle}
            mapTitle={component.mapTitle}
            showMap={component.showMap}
          />
        );

      default:
        return (
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center text-gray-500">
                Unknown component type: {(component as any)._template}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="component-wrapper" data-component-type={component._template} data-index={index}>
      {renderComponent()}
    </div>
  );
};

export default ComponentRenderer;