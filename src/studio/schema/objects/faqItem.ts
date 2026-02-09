import { HelpCircleIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * FAQ Item schema - for creating SEO-optimized FAQ sections
 * Will render with proper FAQ schema markup for Google rich snippets
 */
export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The question being asked',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
      description: 'The answer to the question',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Question',
        subtitle: subtitle ? `${subtitle.substring(0, 60)}...` : 'No answer',
      };
    },
  },
});
