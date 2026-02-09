/**
 * Product Box Component
 * Renders an Amazon product with image, rating, pros/cons, and affiliate link
 */

import Image from 'next/image';
import type { FC } from 'react';
import { StarRating } from '@/components/ui/StarRating';
import { urlForImage } from '@/lib/sanity/client/utils';
import { generateAmazonLink } from '@/utils/amazonLinks';

interface ProductBoxProps {
  productName: string;
  productImage?: {
    // biome-ignore lint/suspicious/noExplicitAny: Sanity asset type
    asset: any;
    alt?: string;
  };
  asin: string;
  price?: string;
  rating?: number;
  pros?: string[];
  cons?: string[];
  buttonText?: string;
  amazonRegion?: string;
}

export const ProductBox: FC<ProductBoxProps> = ({
  productName,
  productImage,
  asin,
  price,
  rating,
  pros = [],
  cons = [],
  buttonText = 'Check Price on Amazon',
  amazonRegion = 'com',
}) => {
  const amazonUrl = generateAmazonLink(asin, amazonRegion);
  const imageUrl = productImage
    ? urlForImage(productImage)?.width(400).height(400).url()
    : null;

  return (
    <div className="my-8 border-2 border-gray-200 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
      <div className="grid md:grid-cols-[200px_1fr] gap-6">
        {/* Product Image */}
        {imageUrl && (
          <div className="flex items-start justify-center">
            <Image
              src={imageUrl}
              alt={productImage?.alt || productName}
              width={200}
              height={200}
              className="rounded-lg object-contain"
            />
          </div>
        )}

        {/* Product Details */}
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {productName}
          </h3>

          {/* Rating */}
          {rating !== undefined && rating > 0 && (
            <div className="mb-3">
              <StarRating rating={rating} />
            </div>
          )}

          {/* Price */}
          {price && (
            <div className="text-3xl font-bold text-green-600 mb-4">
              {price}
            </div>
          )}

          {/* Pros & Cons */}
          {(pros.length > 0 || cons.length > 0) && (
            <div className="grid md:grid-cols-2 gap-4 my-4">
              {/* Pros */}
              {pros.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Pros
                  </h4>
                  <ul className="space-y-1">
                    {pros.map((pro, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: Static list
                      <li
                        key={index}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {cons.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cons
                  </h4>
                  <ul className="space-y-1">
                    {cons.map((con, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: Static list
                      <li
                        key={index}
                        className="text-sm text-gray-700 flex items-start gap-2"
                      >
                        <span className="text-red-500 mt-1">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Affiliate Button */}
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="mt-4 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            {buttonText}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
