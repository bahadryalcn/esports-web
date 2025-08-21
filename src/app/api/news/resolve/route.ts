import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'Path parameter is required' }, { status: 400 });
    }

    // Clean the path and construct full file path
    const cleanPath = filePath.replace(/^content\//, '');
    const fullPath = path.join(process.cwd(), 'content', cleanPath);

    console.log('News resolve API called with path:', filePath);
    console.log('Full path:', fullPath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log('File not found:', fullPath);
      return NextResponse.json({ error: 'News file not found' }, { status: 404 });
    }

    // Read the MDX file
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter
    const { data: frontmatter } = matter(fileContent);

    console.log('News data loaded for:', filePath, 'Title:', frontmatter.title);

    return NextResponse.json(frontmatter);
  } catch (error) {
    console.error('Error in news resolve API:', error);
    return NextResponse.json(
      { error: 'Failed to resolve news data' },
      { status: 500 }
    );
  }
}
