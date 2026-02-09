/**
 * Affiliate Disclosure Component
 * Standard affiliate disclosure notice for transparency
 */

import type { FC } from 'react';

interface AffiliateDisclosureProps {
  className?: string;
}

export const AffiliateDisclosure: FC<AffiliateDisclosureProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`my-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg ${className}`}
    >
      <div className="flex items-start gap-3">
        <svg
          className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>Information</title>
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <h4 className="font-semibold text-blue-900 mb-1">
            Affiliate Disclosure
          </h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            This post contains affiliate links. If you click through and make a
            purchase, we may earn a commission at no additional cost to you. We
            only recommend products we genuinely believe in.
          </p>
        </div>
      </div>
    </div>
  );
};
