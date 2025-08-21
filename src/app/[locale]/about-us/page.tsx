import { notFound } from 'next/navigation';
import { getAbout } from '@/lib/tina-client';
import { AboutPage } from '@/components/pages/AboutPage';
import { Metadata } from 'next';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPageRoute({ params }: AboutPageProps) {
  const { locale } = await params;

  // Only allow English locale for this route
  if (locale !== 'en') {
    notFound();
  }

  try {
    const aboutData = await getAbout(locale);

    return <AboutPage data={aboutData.data.about} />;
  } catch (error) {
    console.error('Error loading about page:', error);
    notFound();
  }
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;

  try {
    const aboutData = await getAbout(locale);
    const { seo } = aboutData.data.about;

    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      openGraph: {
        title: seo.title,
        description: seo.description,
        images: [seo.image],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.title,
        description: seo.description,
        images: [seo.image],
      },
      alternates: {
        canonical: seo.canonical,
      },
    };
  } catch (error) {
    return {
      title: 'About Us - AIM Agency',
      description:
        'AIM Agency provides professional team management, player development, and consulting services in the esports world with years of experience.',
    };
  }
}
