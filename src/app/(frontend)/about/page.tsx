import { notFound } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';
import SingletonPage from '@/components/templates/SingletonPage';
import { sanityFetch } from '@/lib/sanity/client/live';

// Query for About Page
const aboutPageQuery = `*[_type == "aboutPage"][0]{ title, content }`;

export default async function AboutPage() {
  const { data: page } = await sanityFetch({
    query: aboutPageQuery,
  });

  if (!page) {
    notFound();
  }

  return (
    <SingletonPage
      title={page.title}
      content={page.content as PortableTextBlock[]}
    />
  );
}

export const metadata = {
  title: 'About Us',
  description: 'Learn more about us and our mission.',
};
