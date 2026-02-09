import { CubeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Product Box schema - for embedding Amazon products in content
 * Displays product image, name, rating, price, pros/cons, and affiliate link
 */
export default defineType({
  name: 'productBox',
  title: 'Product Box',
  type: 'object',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The name of the product',
    }),
    defineField({
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'asin',
      title: 'Amazon ASIN',
      type: 'string',
      description: 'Amazon Standard Identification Number (e.g., B08N5WRWNW)',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[A-Z0-9]{10}$/, {
            name: 'ASIN',
            invert: false,
          })
          .error('ASIN must be exactly 10 alphanumeric characters'),
    }),
    defineField({
      name: 'price',
      title: 'Price (optional)',
      type: 'string',
      description: 'Display price (e.g., "$99.99" or "Check Amazon")',
    }),
    defineField({
      name: 'rating',
      title: 'Product Rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5).precision(1),
      description: 'Rating out of 5 stars (e.g., 4.5)',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of product advantages',
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of product disadvantages',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Check Price on Amazon',
      description: 'Text for the affiliate button',
    }),
    defineField({
      name: 'amazonRegion',
      title: 'Amazon Region',
      type: 'string',
      options: {
        list: [
          { title: 'Amazon.com (US)', value: 'com' },
          { title: 'Amazon.co.uk (UK)', value: 'co.uk' },
          { title: 'Amazon.ca (Canada)', value: 'ca' },
          { title: 'Amazon.de (Germany)', value: 'de' },
          { title: 'Amazon.fr (France)', value: 'fr' },
          { title: 'Amazon.in (India)', value: 'in' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'com',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      subtitle: 'asin',
      media: 'productImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Product',
        subtitle: subtitle ? `ASIN: ${subtitle}` : 'No ASIN',
        media,
      };
    },
  },
});
