/**
 * FAQ Section Component
 * Renders FAQ with accordion UI and JSON-LD schema markup for SEO
 */

'use client';

import type { FC } from 'react';
import { useState } from 'react';

interface FAQItemType {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  faqs: FAQItemType[];
}

export const FAQ: FC<FAQProps> = ({
  title = 'Frequently Asked Questions',
  faqs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD schema for Google rich snippets
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="my-8">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD for SEO requires this
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900">{title}</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Static list, index is stable
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              type="button"
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-lg text-gray-900 pr-8">
                {faq.question}
              </span>
              <svg
                aria-hidden="true"
                className={`w-6 h-6 text-gray-500 transform transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 pt-2 text-gray-700 leading-relaxed border-t border-gray-100">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
