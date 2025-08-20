import { notFound } from 'next/navigation';
import { getAbout } from '@/lib/tina-client';
import { AboutPage } from '@/components/pages/AboutPage';
import { Metadata } from 'next';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPageRoute({ params }: AboutPageProps) {
  const { locale } = await params;
  
  // Only allow Turkish locale for this route
  if (locale !== 'tr') {
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

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
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
      title: 'Hakkımızda - AIM Agency',
      description: 'AIM Agency olarak e-spor dünyasında profesyonel takım yönetimi, oyuncu gelişimi ve danışmanlık hizmetleri sunuyoruz.',
    };
  }
} 