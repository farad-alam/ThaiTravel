import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { defaultFieldGroups } from '../config/fieldGroups';

export default defineType({
  name: 'affiliateDisclosure',
  title: 'Affiliate Disclosure',
  type: 'document',
  icon: DocumentTextIcon,
  groups: defaultFieldGroups,
  fields: [
    defineField({
      name: 'name',
      hidden: true,
      readOnly: true,
      type: 'string',
      initialValue: 'Affiliate Disclosure',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Affiliate Disclosure',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description:
        'Affiliate disclosure - required by Amazon Associates and FTC guidelines',
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'This site is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. We are compensated for referring traffic and business to Amazon and other companies linked to on this site.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      group: 'content',
    }),
    defineField({
      title: 'SEO & Metadata',
      name: 'seo',
      type: 'seoMetaFields',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Affiliate Disclosure',
      };
    },
  },
});
