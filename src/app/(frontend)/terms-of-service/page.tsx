import { notFound } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';
import SingletonPage from '@/components/templates/SingletonPage';
import { sanityFetch } from '@/lib/sanity/client/live';

const termsQuery = `*[_type == "termsOfService"][0]{ title, content }`;

export default async function TermsPage() {
  const { data: page } = await sanityFetch({
    query: termsQuery,
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
  title: 'Terms of Service',
  description: 'Terms and conditions for using our website.',
};
