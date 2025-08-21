import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    console.log('Player resolve API called with path:', filePath);

    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      );
    }

    // Remove "content/" prefix and get actual file path
    const cleanPath = filePath.replace('content/', '');
    const fullPath = path.join(process.cwd(), 'content', cleanPath);

    if (!fs.existsSync(fullPath)) {
      console.error(`Player file not found: ${fullPath}`);
      return NextResponse.json(
        { error: 'Player file not found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContent);

    console.log('Player data loaded for:', filePath, 'Name:', data.name);

    const playerData = {
      name: data.name || '',
      nickname: data.nickname || '',
      position: data.position || '',
      avatar: data.avatar || '',
      age: data.age || 0,
      nationality: data.nationality || '',
      joinDate: data.joinDate || '',
      featured: data.featured || false,
      active: data.active || true,
      status: data.status || 'active',
      games: data.games || [],
      stats: data.stats || undefined,
      social: data.social || undefined,
    };

    return NextResponse.json(playerData);
  } catch (error) {
    console.error('Error in player resolve API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
