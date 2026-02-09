import { notFound } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';
import SingletonPage from '@/components/templates/SingletonPage';
import { sanityFetch } from '@/lib/sanity/client/live';

const privacyPolicyQuery = `*[_type == "privacyPolicy"][0]{ title, content }`;

export default async function PrivacyPolicyPage() {
  const { data: page } = await sanityFetch({
    query: privacyPolicyQuery,
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
  title: 'Privacy Policy',
  description: 'Our privacy policy and data protection practices.',
};
