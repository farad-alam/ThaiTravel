import { ThListIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Comparison Table schema
 * Side-by-side comparison of multiple products
 */
export default defineType({
  name: 'comparisonTable',
  title: 'Product Comparison Table',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Table Title',
      type: 'string',
      initialValue: 'Product Comparison',
      description: 'Title for the comparison table',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Product Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Product Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt text',
                },
              ],
            }),
            defineField({
              name: 'asin',
              title: 'Amazon ASIN',
              type: 'string',
              validation: (rule) =>
                rule.required().regex(/^[A-Z0-9]{10}$/, {
                  name: 'ASIN',
                }),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'Display price (e.g., "$99.99")',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (rule) => rule.min(0).max(5).precision(1),
            }),
            defineField({
              name: 'features',
              title: 'Key Features',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'List of key features for comparison',
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
              },
              initialValue: 'com',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
              media: 'image',
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(2).max(5),
      description: 'Add 2-5 products to compare',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      productCount: 'products.length',
    },
    prepare({ title, productCount }) {
      return {
        title: title || 'Product Comparison',
        subtitle: `Comparing ${productCount || 0} products`,
      };
    },
  },
});
