import { NextRequest, NextResponse } from 'next/server';
import { getTinaClient } from '@/lib/tina-client';

// TinaCMS'den site settings verisi çekme
const getSiteSettings = async (locale: string = 'tr') => {
  try {
    // TinaCMS client'ı kullan
    const client = getTinaClient();

    // Settings collection'ından veri çek
    const settingsResponse = await client.queries.settings(locale);

    if (settingsResponse?.data?.settings) {
      return settingsResponse.data.settings;
    }

    // Eğer settings bulunamazsa boş object döndür
    return {};
  } catch (error) {
    console.error('Error fetching site settings from TinaCMS:', error);
    throw error;
  }
};

export async function GET(request: NextRequest) {
  try {
    // URL'den locale parametresini al
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'tr'; // Default: Türkçe

    const settings = await getSiteSettings(locale);

    return NextResponse.json(settings, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch site settings from TinaCMS' },
      { status: 500 }
    );
  }
}
