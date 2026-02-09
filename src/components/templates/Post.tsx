import type { PortableTextBlock } from 'next-sanity';

import { AffiliateDisclosure } from '@/components/modules/AffiliateDisclosure';
import Byline from '@/components/modules/Byline';
import CoverImage from '@/components/modules/CoverImage';
import CustomPortableText from '@/components/modules/PortableText';
import { TableOfContents } from '@/components/modules/TableOfContents';
import { StarRating } from '@/components/ui/StarRating';
import type { PostFragmentType } from '@/lib/sanity/queries/fragments/fragment.types';

type Props = {
  post: PostFragmentType;
};

const Post = ({ post }: Props) => {
  // Type assertion to access affiliate fields
  const affiliatePost = post as PostFragmentType & {
    productRating?: number;
    showAffiliateDisclosure?: boolean;
    showTableOfContents?: boolean;
  };

  return (
    <div className="container mx-auto max-w-5xl pt-5 md:pt-8 pb-12">
      {post.mainImage?.asset?._ref ? (
        <div className="mb-12">
          <CoverImage image={post.mainImage} priority />
        </div>
      ) : null}

      <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

      {/* Product Rating (if it's a review) */}
      {affiliatePost?.productRating && affiliatePost.productRating > 0 && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg inline-block">
          <div className="text-sm text-gray-600 mb-1">Overall Rating</div>
          <StarRating rating={affiliatePost.productRating} />
        </div>
      )}

      {post.author ? (
        <div className="mb-6">
          <Byline post={post} />
        </div>
      ) : null}

      {/* Affiliate Disclosure */}
      {affiliatePost?.showAffiliateDisclosure && <AffiliateDisclosure />}

      {/* Layout with TOC sidebar on desktop */}
      <div className="grid lg:grid-cols-[1fr_250px] gap-8">
        <div className="order-2 lg:order-1">
          <CustomPortableText value={post.body as PortableTextBlock[]} />
        </div>

        {/* Table of Contents (sticky on desktop) */}
        {affiliatePost?.showTableOfContents && (
          <aside className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <TableOfContents />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Post;
