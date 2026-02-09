import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Post from '@/components/templates/Post';
import { serverEnv } from '@/env/serverEnv';
import { getDocumentLink } from '@/lib/links';
import { client } from '@/lib/sanity/client/client';
import { sanityFetch } from '@/lib/sanity/client/live';
import { postPagesSlugs, postQuery } from '@/lib/sanity/queries/queries';
import type { PostQueryResult } from '@/sanity.types';

type Props = {
  params: Promise<{ slug: string }>;
};

const loadData = async (props: Props): Promise<PostQueryResult> => {
  const { slug } = await props.params;

  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { slug },
  });

  return post;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const post = await loadData(props);

  if (!post) {
    return {};
  }

  // Fallback chain for meta title: seo.metaTitle → post.title
  const title = post.seo?.metaTitle || post.title;

  // Fallback chain for meta description: seo.metaDescription → metadata.description (AutoTent) → excerpt → generated
  const description =
    post.seo?.metaDescription ||
    post.metadata?.description ||
    post.excerpt ||
    `Read ${post.title} on our blog`;

  // Open Graph image fallback: seo.metaImage → mainImage
  // Note: asset is expanded in the GROQ query with asset->{...}
  const ogImage =
    // biome-ignore lint/suspicious/noExplicitAny: Schema type mismatch
    (post.seo?.metaImage?.asset as any)?.url ||
    // biome-ignore lint/suspicious/noExplicitAny: Schema type mismatch
    (post.mainImage?.asset as any)?.url;

  return {
    title,
    description,
    alternates: {
      canonical: getDocumentLink(post, true),
    },
    openGraph: {
      title: post.seo?.openGraph?.title || title,
      description: post.seo?.openGraph?.description || description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const slugs = await client.fetch<(string | null)[]>(postPagesSlugs, {
    limit: serverEnv.MAX_STATIC_PARAMS,
  });

  const staticParams = slugs
    ? slugs
        .filter((slug): slug is string => slug !== null)
        .map((slug) => ({ slug: slug }))
    : [];

  return [...staticParams];
}

export default async function PostPage(props: Props) {
  const post = await loadData(props);

  if (!post) {
    notFound();
  }

  return <Post post={post} />;
}
