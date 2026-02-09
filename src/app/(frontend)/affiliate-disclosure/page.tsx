import { notFound } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';
import SingletonPage from '@/components/templates/SingletonPage';
import { sanityFetch } from '@/lib/sanity/client/live';

const affiliateDisclosureQuery = `*[_type == "affiliateDisclosure"][0]{ title, content }`;

export default async function AffiliateDisclosurePage() {
  const { data: page } = await sanityFetch({
    query: affiliateDisclosureQuery,
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
  title: 'Affiliate Disclosure',
  description: 'Information about our affiliate partnerships and advertising.',
};
