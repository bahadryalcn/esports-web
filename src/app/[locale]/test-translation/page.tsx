import { Metadata } from 'next';
import { TranslationExample } from '@/components/examples/TranslationExample';

interface TestTranslationPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TestTranslationPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === 'tr'
        ? 'Çeviri Testi - AIM Agency'
        : 'Translation Test - AIM Agency',
    description:
      locale === 'tr'
        ? 'Next-translate çeviri sistemi test sayfası'
        : 'Next-translate translation system test page',
  };
}

export default async function TestTranslationPage({
  params,
}: TestTranslationPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gaming-dark">
      <div className="container-custom py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-6 font-gaming text-4xl font-bold md:text-6xl">
            <span className="neon-text">
              {locale === 'tr' ? 'Çeviri Testi' : 'Translation Test'}
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            {locale === 'tr'
              ? 'Next-translate çeviri sistemi test sayfası'
              : 'Next-translate translation system test page'}
          </p>
        </div>

        <TranslationExample />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }];
}
