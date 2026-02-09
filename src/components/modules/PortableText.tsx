/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import Image from 'next/image';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity';
import type { PropsWithChildren, ReactNode } from 'react';
import Link from 'next/link';
import { urlForImage } from '@/lib/sanity/client/utils';
import { cn } from '@/lib/utils';
import { parseChildrenToSlug } from '@/utils/strings';

type HeadingProps = PropsWithChildren<{
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id: string;
  className?: string;
}>;

function Heading({ as, id, children, className = '' }: HeadingProps) {
  const Element = as;
  return (
    <Element className={cn('relative group', className)}>
      {children}
      <a
        href={`#${id}`}
        className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <title>Anchor</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </a>
    </Element>
  );
}

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-gray-700 mb-6">{children}</p>
      ),
      h1: ({ children, value }) => (
        <Heading
          as="h1"
          id={parseChildrenToSlug(value.children)}
          className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      h2: ({ children, value }) => (
        <Heading
          as="h2"
          id={parseChildrenToSlug(value.children)}
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      h3: ({ children, value }) => (
        <Heading
          as="h3"
          id={parseChildrenToSlug(value.children)}
          className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      h4: ({ children, value }) => (
        <Heading
          as="h4"
          id={parseChildrenToSlug(value.children)}
          className="text-xl md:text-2xl font-bold mb-4 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      h5: ({ children, value }) => (
        <Heading
          as="h5"
          id={parseChildrenToSlug(value.children)}
          className="text-lg md:text-xl font-bold mb-4 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      h6: ({ children, value }) => (
        <Heading
          as="h6"
          id={parseChildrenToSlug(value.children)}
          className="text-base md:text-lg font-bold mb-4 text-gray-900 scroll-mt-20"
        >
          {children}
        </Heading>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-600">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2">{children}</li>,
      number: ({ children }) => <li className="pl-2">{children}</li>,
    },
    marks: {
      code: ({ children }) => (
        <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
          {children}
        </code>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({
        children,
        value,
      }: {
        children: ReactNode;
        value?: { href?: string; blank?: boolean; rel?: string };
      }) => {
        let href = value?.href || '';
        
        // Correct internal links that should be under /blog
        if (href.startsWith('/') && !href.startsWith('/blog/')) {
           const knownRootPages = ['/about', '/contact', '/privacy-policy', '/terms-of-service', '/affiliate-disclosure', '/search'];
           const isRootPage = knownRootPages.some(page => href === page || href.startsWith(`${page}/`));
           
           if (!isRootPage && href !== '/') {
             href = `/blog${href}`;
           }
        }

        const target = value?.blank ? '_blank' : undefined;
        // Default rel for new tabs if not specified
        const rel = value?.rel || (value?.blank ? 'noopener noreferrer' : undefined);

        return (
          <Link
            href={href}
            target={target}
            rel={rel}
            className="text-primary hover:no-underline underline"
          >
            {children}
          </Link>
        );
      },
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      'strike-through': ({ children }) => (
        <del className="line-through">{children}</del>
      ),
      underline: ({ children }) => <u className="underline">{children}</u>,
      sup: ({ children }) => <sup className="text-xs">{children}</sup>,
      sub: ({ children }) => <sub className="text-xs">{children}</sub>,
    },
    types: {
      image: (props) => {
        const { value } = props;
        if (!value) {
          return null;
        }

        return (
          <div className="my-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              width="1000"
              height="667"
              src={urlForImage(value)?.width(1000).height(667).url() as string}
              alt={value?.alt || ''}
              className="w-full h-auto"
            />
          </div>
        );
      },
      // Affiliate content types
      // Affiliate content types
      // biome-ignore lint/suspicious/noExplicitAny: Sanity Portable Text types are complex
      productBox: (props: any) => {
        const { value } = props;
        if (!value) return null;

        // Import dynamically to avoid circular dependencies
        const { ProductBox } = require('@/components/modules/ProductBox');
        return <ProductBox {...value} />;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Sanity Portable Text types are complex
      faqSection: (props: any) => {
        const { value } = props;
        if (!value || !value.faqs) return null;

        const { FAQ } = require('@/components/modules/FAQ');
        return <FAQ title={value.title} faqs={value.faqs} />;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Sanity Portable Text types are complex
      prosConsList: (props: any) => {
        const { value } = props;
        if (!value) return null;

        const { ProsConsList } = require('@/components/modules/ProsConsList');
        return (
          <ProsConsList
            title={value.title}
            pros={value.pros}
            cons={value.cons}
          />
        );
      },
      // biome-ignore lint/suspicious/noExplicitAny: Sanity Portable Text types are complex
      comparisonTable: (props: any) => {
        const { value } = props;
        if (!value || !value.products) return null;

        const {
          ComparisonTable,
        } = require('@/components/modules/ComparisonTable');
        return (
          <ComparisonTable title={value.title} products={value.products} />
        );
      },
      videoEmbed: (props: any) => {
        const { value } = props;
        if (!value || !value.url) return null;

        const {
          default: VideoEmbed,
        } = require('@/components/modules/VideoEmbed');
        return <VideoEmbed value={value} />;
      },
      // biome-ignore lint/suspicious/noExplicitAny: Sanity Portable Text types are complex
      table: (props: any) => {
        const { value } = props;
        const { Table } = require('@/components/modules/Table');
        return <Table value={value} />;
      },
    },
  };

  return (
    <div className={className}>
      <PortableText components={components} value={value} />
    </div>
  );
}
