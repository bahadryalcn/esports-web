import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getHomepage } from '@/lib/tina-client';
import DynamicPage from '@/components/dynamic/DynamicPage';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const locales = ['tr', 'en'];

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    return {};
  }

  try {
    const homepageData = await getHomepage(locale);
    const { seo } = homepageData.data.homepage;
    
    return {
      title: seo?.title || 'AIM Agency - Professional E-sport Team Management',
      description: seo?.description || 'Professional team management, player development and consulting services in the e-sports world.',
              openGraph: {
          title: seo?.title || 'AIM Agency',
          description: seo?.description || 'Professional E-sport Team Management',
          images: seo?.image ? [{ url: seo.image }] : [],
          locale: locale,
        },
      twitter: {
        card: 'summary_large_image',
        title: seo?.title || 'AIM Agency',
        description: seo?.description || 'Professional E-sport Team Management',
        images: seo?.image ? [seo.image] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'AIM Agency - Professional E-sport Team Management',
      description: 'Professional team management, player development and consulting services in the e-sports world.',
    };
  }
}

export default async function LocaleHomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    const homepageData = await getHomepage(locale);
    const pageData = homepageData.data.homepage;

    return (
      <div className="min-h-screen -mt-16">
        <DynamicPage pageData={pageData} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering homepage:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center -mt-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">AIM Agency</h1>
          <p className="text-xl text-gray-300">
            {locale === 'tr' 
              ? 'Profesyonel E-spor Takım Yönetimi' 
              : 'Professional E-sport Team Management'
            }
          </p>
          <p className="text-gray-500">
            {locale === 'tr' ? 'Sayfa yükleniyor...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}