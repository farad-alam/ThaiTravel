import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client/client';
import { getSitemapQuery } from '@/lib/sanity/queries/queries';
import { getBaseUrl } from '@/utils/getBaseUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(getSitemapQuery);

    if (!paths) return [];

    const baseUrl = getBaseUrl();

    return paths.map((path: any) => ({
      url: new URL(path.href!, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: 'weekly',
      priority: path.priority || 0.5,
    }));
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return [];
  }
}
