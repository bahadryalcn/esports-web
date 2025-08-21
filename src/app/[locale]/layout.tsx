import { notFound } from 'next/navigation';
import { getNavigation, getSettings } from '@/lib/tina-client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const locales = ['tr', 'en'];

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    const [navigationData, settingsData] = await Promise.all([
      getNavigation(locale),
      getSettings(locale),
    ]);

    return (
      <div lang={locale}>
        <ScrollProgress />
        <Header navigation={navigationData.data.navigation} />
        <main className="pt-16">{children}</main>
        <Footer
          navigation={navigationData.data.navigation}
          settings={settingsData.data.settings}
        />
      </div>
    );
  } catch (error) {
    console.error('Error loading locale layout:', error);
    return (
      <div lang={locale}>
        <ScrollProgress />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
    );
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
