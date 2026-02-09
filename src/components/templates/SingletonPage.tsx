/**
 * Generic Singleton Page Component
 * Reusable template for singleton content pages
 */

import type { PortableTextBlock } from 'next-sanity';
import type React from 'react';
import CustomPortableText from '@/components/modules/PortableText';

type Props = {
  title: string;
  content?: PortableTextBlock[];
  children?: React.ReactNode;
};

const SingletonPage = ({ title, content, children }: Props) => {
  return (
    <div className="container mx-auto max-w-4xl pt-5 md:pt-8 pb-12 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">{title}</h1>

      {content && content.length > 0 && <CustomPortableText value={content} />}

      {children}
    </div>
  );
};

export default SingletonPage;
