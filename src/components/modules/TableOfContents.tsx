/**
 * Table of Contents Component
 * Auto-generated TOC from headings with smooth scroll
 */

'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export const TableOfContents: FC<TableOfContentsProps> = ({
  className = '',
}) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the page
    const headings = Array.from(document.querySelectorAll('h2, h3')).map(
      (heading) => ({
        id: heading.id,
        text: heading.textContent || '',
        level: Number.parseInt(heading.tagName.substring(1)),
      })
    );

    setTocItems(headings);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (tocItems.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li key={item.id} className={`${item.level === 3 ? 'ml-4' : ''}`}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-1 text-sm hover:text-orange-600 transition-colors ${
                activeId === item.id
                  ? 'text-orange-600 font-semibold'
                  : 'text-gray-600'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
