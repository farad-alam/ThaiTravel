/**
 * Star Rating Component
 * Displays a visual star rating (filled/half/empty stars)
 */

import type { FC } from 'react';

interface StarRatingProps {
  rating: number; // 0-5
  maxStars?: number;
  className?: string;
  showNumber?: boolean;
}

export const StarRating: FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  className = '',
  showNumber = true,
}) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // Full star
      stars.push(
        <svg
          aria-hidden="true"
          key={i}
          className="w-5 h-5 fill-current text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    } else if (rating > i - 1 && rating < i) {
      // Half star
      stars.push(
        <svg
          aria-hidden="true"
          key={i}
          className="w-5 h-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-${i})`}
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg
          aria-hidden="true"
          key={i}
          className="w-5 h-5 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      );
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars}
      {showNumber && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating.toFixed(1)} / {maxStars}
        </span>
      )}
    </div>
  );
};
