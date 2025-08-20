'use client';

import { AboutData, AboutComponent } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Heart, Trophy, Users, Award, Calendar, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutPageProps {
  data: AboutData;
}

const iconMap = {
  target: Target,
  eye: Eye,
  heart: Heart,
  trophy: Trophy,
  users: Users,
  award: Award,
  calendar: Calendar,
  star: Star,
};

export function AboutPage({ data }: AboutPageProps) {
  const { seo, components } = data;

  return (
    <div className="min-h-screen">
      {components.map((component: AboutComponent, index) => {
        switch (component._template) {
          case 'about-hero':
            return (
              <section key={index} className="relative bg-gaming-darker text-white py-20">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-text">
                      {component.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-primary mb-6">
                      {component.subtitle}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                      {component.description}
                    </p>
                    {component.image && (
                      <div className="mt-12">
                        <Image
                          src={component.image}
                          alt={component.title}
                          width={800}
                          height={400}
                          className="rounded-lg shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );

          case 'about-content':
            return (
              <section key={index} className="py-20 bg-background">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
                      {component.mainTitle}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-12 text-center leading-relaxed">
                      {component.mainContent}
                    </p>

                    {/* Content Sections */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                      {component.sections.map((section, sectionIndex) => {
                        const IconComponent = iconMap[section.icon as keyof typeof iconMap];
                        return (
                          <Card key={sectionIndex} className="gaming-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                            <CardContent className="p-6 text-center">
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconComponent className="w-8 h-8 text-primary" />
                              </div>
                              <h3 className="text-xl font-semibold text-foreground mb-3">
                                {section.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed">
                                {section.content}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );

          case 'about-stats':
            return (
              <section key={index} className="py-20 bg-gaming-dark">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                      {component.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {component.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-glow-pulse">
                          {item.number}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          {item.label}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'about-team':
            return (
              <section key={index} className="py-20 bg-background">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                      {component.title}
                    </h2>
                    <h3 className="text-2xl text-primary mb-6">
                      {component.subtitle}
                    </h3>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      {component.description}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {component.members.map((member, memberIndex) => (
                      <Card key={memberIndex} className="gaming-card text-center hover:scale-105 transition-transform duration-300">
                        <CardContent className="p-6">
                          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                            <Image
                              src={member.image || '' }
                              alt={member.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {member.name}
                          </h3>
                          <Badge variant="secondary" className="mb-3">
                            {member.position}
                          </Badge>
                          <p className="text-muted-foreground text-sm">
                            {member.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'about-achievements':
            return (
              <section key={index} className="py-20 bg-gaming-dark">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                      {component.title}
                    </h2>
                    <h3 className="text-2xl text-primary mb-6">
                      {component.subtitle}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {component.items.map((achievement, achievementIndex) => (
                      <Card key={achievementIndex} className="gaming-card hover:scale-105 transition-transform duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Trophy className="w-10 h-10 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-primary border-primary">
                                  {achievement.year}
                                </Badge>
                              </div>
                              <h3 className="text-xl font-semibold text-foreground mb-2">
                                {achievement.title}
                              </h3>
                              <p className="text-muted-foreground">
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                          {achievement.image && (
                            <div className="mt-4">
                              <Image
                                src={achievement.image}
                                alt={achievement.title}
                                width={400}
                                height={200}
                                className="rounded-lg w-full"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            );

          case 'about-cta':
            return (
              <section key={index} className="py-20 bg-background">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-foreground mb-6">
                      {component.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                      {component.description}
                    </p>
                    <Button asChild size="lg" className="gaming-button">
                      <Link href={component.buttonLink}>
                        {component.buttonText}
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
} 