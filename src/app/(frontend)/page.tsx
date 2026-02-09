import Image from 'next/image';
import Link from 'next/link';
import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/lib/sanity/client/live';
import { settingsQuery } from '@/lib/sanity/queries/queries';

// Query for recent posts
// Query for recent posts
const recentPostsQuery =
  defineQuery(`*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) [0...18] {
  title,
  slug,
  excerpt,
  "publishedAt": coalesce(publishedAt, _createdAt),
  "categories": categories[]->title,
  mainImage {
    asset-> {
      url
    },
    alt
  }
}`);

interface RecentPost {
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  categories: string[];
  mainImage: {
    asset: {
      url: string;
    };
    alt: string;
  };
}

export default async function HomePage() {
  const { data: posts } = (await sanityFetch({
    query: recentPostsQuery,
  })) as { data: RecentPost[] };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block py-1.5 px-4 rounded-full bg-teal-100 text-teal-700 text-sm font-bold tracking-wide mb-6 uppercase">
                Discover the Land of Smiles
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Experience the Magic of <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                  Thailand
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Your ultimate guide to Thailand's best beaches, temples, street food, and hidden gems. Plan your perfect trip with our expert tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-teal-200/50 transition-all transform hover:-translate-y-1"
                >
                  Start Exploring
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-bold rounded-xl shadow-sm border border-slate-200 hover:border-teal-200 hover:text-teal-600 transition-colors"
                >
                  Our Process
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=2670&auto=format&fit=crop"
                  alt="Beautiful Thailand beach landscape"
                  className="object-cover"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow max-w-xs">
                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Verified
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    Local Expert Guides
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Local Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <span>Verified Stays</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Authentic Experiences</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Explore Thailand's Best
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From pristine islands to ancient temples, discover everything Thailand has to offer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group border border-slate-100">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-600 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Top Destinations
              </h3>
              <p className="text-slate-600">
                Explore popular islands, bustling cities, and serene mountain retreats.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group border border-slate-100">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Cultural Guide
              </h3>
              <p className="text-slate-600">
                Navigate local customs, festivals, and etiquette with confidence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group border border-slate-100">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Food & Shopping
              </h3>
              <p className="text-slate-600">
                Discover best street food spots and shopping markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reviews Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Latest Reviews
            </h2>
            <Link
              href="/blog"
              className="text-teal-600 hover:text-teal-700 font-bold flex items-center gap-2 group"
            >
              All Articles
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {post.mainImage?.asset?.url && (
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                      <Image
                        src={post.mainImage.asset.url}
                        alt={post.mainImage.alt || post.title}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {post.categories.slice(0, 1).map((category) => (
                          <span
                            key={category}
                            className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-sm text-slate-400 font-medium">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          { month: 'long', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No reviews yet
              </h3>
              <p className="text-slate-500 mb-6">
                We are curating the best Thailand travel guides for you!
              </p>
              <Link
                href="/blog"
                className="text-teal-600 font-bold hover:underline"
              >
                Check all posts
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-teal-900 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Travel Community
          </h2>
          <p className="text-teal-100 mb-8">
            Get the latest Thailand travel tips and hidden gem alerts delivered to your inbox.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 font-bold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return {
    title: settings?.title || 'ThaiTravel',
    description:
      settings?.description ||
      'Your ultimate guide to Thailand travel. Discover best destinations, food, and culture.',
  };
}
