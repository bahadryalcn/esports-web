'use client';

import { AboutData, AboutComponent } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Eye,
  Heart,
  Trophy,
  Users,
  Award,
  Calendar,
  Star,
} from 'lucide-react';
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
              <section
                key={index}
                className="relative bg-gaming-darker py-20 text-white"
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container relative z-10 mx-auto px-4">
                  <div className="mx-auto max-w-4xl text-center">
                    <h1 className="neon-text mb-6 text-5xl font-bold md:text-6xl">
                      {component.title}
                    </h1>
                    <h2 className="mb-6 text-2xl text-primary md:text-3xl">
                      {component.subtitle}
                    </h2>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
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
              <section key={index} className="bg-background py-20">
                <div className="container mx-auto px-4">
                  <div className="mx-auto max-w-4xl">
                    <h2 className="mb-8 text-center text-4xl font-bold text-foreground">
                      {component.mainTitle}
                    </h2>
                    <p className="mb-12 text-center text-lg leading-relaxed text-muted-foreground">
                      {component.mainContent}
                    </p>

                    {/* Content Sections */}
                    <div className="mt-16 grid gap-8 md:grid-cols-3">
                      {component.sections.map((section, sectionIndex) => {
                        const IconComponent =
                          iconMap[section.icon as keyof typeof iconMap];
                        return (
                          <Card
                            key={sectionIndex}
                            className="gaming-card border-primary/20 transition-all duration-300 hover:border-primary/40"
                          >
                            <CardContent className="p-6 text-center">
                              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <IconComponent className="h-8 w-8 text-primary" />
                              </div>
                              <h3 className="mb-3 text-xl font-semibold text-foreground">
                                {section.title}
                              </h3>
                              <p className="leading-relaxed text-muted-foreground">
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
              <section key={index} className="bg-gaming-dark py-20">
                <div className="container mx-auto px-4">
                  <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-foreground">
                      {component.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {component.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-center">
                        <div className="mb-2 animate-glow-pulse text-4xl font-bold text-primary md:text-5xl">
                          {item.number}
                        </div>
                        <div className="mb-2 text-lg font-semibold text-foreground">
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
              <section key={index} className="bg-background py-20">
                <div className="container mx-auto px-4">
                  <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-foreground">
                      {component.title}
                    </h2>
                    <h3 className="mb-6 text-2xl text-primary">
                      {component.subtitle}
                    </h3>
                    <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                      {component.description}
                    </p>
                  </div>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {component.members.map((member, memberIndex) => (
                      <Card
                        key={memberIndex}
                        className="gaming-card text-center transition-transform duration-300 hover:scale-105"
                      >
                        <CardContent className="p-6">
                          <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                            <Image
                              src={member.image || ''}
                              alt={member.name}
                              width={128}
                              height={128}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h3 className="mb-2 text-xl font-semibold text-foreground">
                            {member.name}
                          </h3>
                          <Badge variant="secondary" className="mb-3">
                            {member.position}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
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
              <section key={index} className="bg-gaming-dark py-20">
                <div className="container mx-auto px-4">
                  <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-foreground">
                      {component.title}
                    </h2>
                    <h3 className="mb-6 text-2xl text-primary">
                      {component.subtitle}
                    </h3>
                  </div>
                  <div className="grid gap-8 md:grid-cols-2">
                    {component.items.map((achievement, achievementIndex) => (
                      <Card
                        key={achievementIndex}
                        className="gaming-card transition-transform duration-300 hover:scale-105"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                              <Trophy className="h-10 w-10 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center space-x-2">
                                <Badge
                                  variant="outline"
                                  className="border-primary text-primary"
                                >
                                  {achievement.year}
                                </Badge>
                              </div>
                              <h3 className="mb-2 text-xl font-semibold text-foreground">
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
                                className="w-full rounded-lg"
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
              <section key={index} className="bg-background py-20">
                <div className="container mx-auto px-4">
                  <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 text-4xl font-bold text-foreground">
                      {component.title}
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
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
