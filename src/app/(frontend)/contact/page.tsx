import { notFound } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';
import SingletonPage from '@/components/templates/SingletonPage';
import { sanityFetch } from '@/lib/sanity/client/live';
import ContactForm from '@/components/modules/ContactForm';

const contactPageQuery = `*[_type == "contactPage"][0]{ title, content, email }`;

export default async function ContactPage() {
  const { data: page } = await sanityFetch({
    query: contactPageQuery,
  });

  if (!page) {
    notFound();
  }

  return (
    <SingletonPage
      title={page.title}
      content={page.content as PortableTextBlock[]}
    >
      {page.email && (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-600 mb-2">Or email us directly at:</p>
          <a
            href={`mailto:${page.email}`}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            {page.email}
          </a>
        </div>
      )}
      <ContactForm />
    </SingletonPage>
  );
}

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us.',
};
