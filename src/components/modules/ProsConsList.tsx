/**
 * Pros & Cons List Component
 * Visual two-column layout for product advantages and disadvantages
 */

import type { FC } from 'react';

interface ProsConsListProps {
  title?: string;
  pros?: string[];
  cons?: string[];
}

export const ProsConsList: FC<ProsConsListProps> = ({
  title,
  pros = [],
  cons = [],
}) => {
  if (pros.length === 0 && cons.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-gray-900">{title}</h3>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros Column */}
        {pros.length > 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Pros
            </h4>
            <ul className="space-y-3">
              {pros.map((pro, index) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: Static list
                  key={index}
                  className="flex items-start gap-3 text-gray-800"
                >
                  <span className="text-green-600 font-bold text-xl mt-0.5">
                    ✓
                  </span>
                  <span className="flex-1">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cons Column */}
        {cons.length > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <h4 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Cons
            </h4>
            <ul className="space-y-3">
              {cons.map((con, index) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: Static list
                  key={index}
                  className="flex items-start gap-3 text-gray-800"
                >
                  <span className="text-red-600 font-bold text-xl mt-0.5">
                    ✗
                  </span>
                  <span className="flex-1">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
