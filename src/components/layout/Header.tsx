import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity/client/live';
import { settingsQuery } from '@/lib/sanity/queries/queries';
import Logo from '../icons/Logo';
import NavBar from './NavBar';

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  if (!settings) {
    return null;
  }

  // Get logo URL directly from the query (it already includes asset->url)
  const logoUrl = settings.logo?.asset?.url || undefined;

  return (
    <header className="bg-white text-gray-800 py-4 relative">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {typeof settings.title !== 'undefined' && (
            <Link className="flex items-center space-x-4" href="/">
              <Logo
                logoUrl={logoUrl}
                alt={settings.logo?.alt || settings.title || undefined}
              />
              <span className="text-lg md:text-2xl font-bold">
                {settings.headerTitle || settings.title}
              </span>
            </Link>
          )}
        </div>
        <NavBar menuItems={settings.menu || []} />
      </div>
    </header>
  );
}
