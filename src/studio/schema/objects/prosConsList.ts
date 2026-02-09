import { ActivityIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Pros & Cons List schema
 * Visual component for displaying product advantages and disadvantages
 */
export default defineType({
  name: 'prosConsList',
  title: 'Pros & Cons List',
  type: 'object',
  icon: ActivityIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title (optional)',
      type: 'string',
      description: 'Optional heading for this pros/cons section',
    }),
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of positive aspects',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of negative aspects',
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      prosCount: 'pros.length',
      consCount: 'cons.length',
    },
    prepare({ title, prosCount, consCount }) {
      return {
        title: title || 'Pros & Cons',
        subtitle: `${prosCount || 0} pros, ${consCount || 0} cons`,
      };
    },
  },
});
