/**
 * Comparison Table Component
 * Side-by-side comparison of multiple products
 */

import Image from 'next/image';
import type { FC } from 'react';
import { StarRating } from '@/components/ui/StarRating';
import { urlForImage } from '@/lib/sanity/client/utils';
import { generateAmazonLink } from '@/utils/amazonLinks';

interface ImageAsset {
  _ref: string;
  _type: string;
}

interface ComparisonProduct {
  name: string;
  image?: {
    asset: ImageAsset;
    alt?: string;
  };
  asin: string;
  price?: string;
  rating?: number;
  features?: string[];
  amazonRegion?: string;
}

interface ComparisonTableProps {
  title?: string;
  products: ComparisonProduct[];
}

export const ComparisonTable: FC<ComparisonTableProps> = ({
  title = 'Product Comparison',
  products,
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-4 text-left font-bold text-gray-900">
                Product
              </th>
              {products.map((product) => (
                <th
                  key={product.asin}
                  className="px-6 py-4 text-center font-bold text-gray-900 min-w-[200px]"
                >
                  {product.image && (
                    <div className="flex justify-center mb-2">
                      <Image
                        src={
                          urlForImage(product.image)
                            ?.width(150)
                            .height(150)
                            .url() as string
                        }
                        alt={product.image.alt || product.name}
                        width={150}
                        height={150}
                        className="object-contain rounded-lg"
                      />
                    </div>
                  )}
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price Row */}
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-gray-700">Price</td>
              {products.map((product) => (
                <td
                  key={product.asin}
                  className="px-6 py-4 text-center text-green-600 font-bold text-xl"
                >
                  {product.price || 'Check Amazon'}
                </td>
              ))}
            </tr>

            {/* Rating Row */}
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-700">Rating</td>
              {products.map((product) => (
                <td key={product.asin} className="px-6 py-4 text-center">
                  {product.rating ? (
                    <div className="flex justify-center">
                      <StarRating rating={product.rating} showNumber={false} />
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Features Row */}
            {products.some((p) => p.features && p.features.length > 0) && (
              <tr className="border-t border-gray-200">
                <td className="px-6 py-4 font-semibold text-gray-700 align-top">
                  Key Features
                </td>
                {products.map((product) => (
                  <td key={product.asin} className="px-6 py-4 text-sm">
                    {product.features && product.features.length > 0 ? (
                      <ul className="space-y-2 text-left">
                        {product.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                ))}
              </tr>
            )}

            {/* Buy Button Row */}
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-gray-700">Buy Now</td>
              {products.map((product) => (
                <td key={product.asin} className="px-6 py-4 text-center">
                  <a
                    href={generateAmazonLink(
                      product.asin,
                      product.amazonRegion || 'com'
                    )}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    View on Amazon
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-6">
        {products.map((product) => (
          <div
            key={product.asin}
            className="border-2 border-gray-200 rounded-lg p-4 bg-white shadow-md"
          >
            {product.image && (
              <div className="flex justify-center mb-4">
                <Image
                  src={
                    urlForImage(product.image)
                      ?.width(200)
                      .height(200)
                      .url() as string
                  }
                  alt={product.image.alt || product.name}
                  width={200}
                  height={200}
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              {product.name}
            </h4>

            {product.price && (
              <div className="text-2xl font-bold text-green-600 mb-2">
                {product.price}
              </div>
            )}

            {product.rating && (
              <div className="mb-3">
                <StarRating rating={product.rating} />
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">
                  Key Features:
                </h5>
                <ul className="space-y-1 text-sm">
                  {product.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={generateAmazonLink(
                product.asin,
                product.amazonRegion || 'com'
              )}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="block text-center px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
