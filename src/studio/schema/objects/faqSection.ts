import { HelpCircleIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * FAQ Section schema - container for multiple FAQ items
 * Groups related FAQs together with an optional title
 */
export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions',
      description: 'Title for this FAQ section',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faqItem' }],
      validation: (rule) => rule.required().min(1),
      description: 'List of frequently asked questions',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqCount: 'faqs.length',
    },
    prepare({ title, faqCount }) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${faqCount || 0} question${faqCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
