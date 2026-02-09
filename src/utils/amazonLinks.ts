/**
 * Amazon affiliate link utilities
 * Generates Amazon affiliate links from ASIN codes with your affiliate tag
 */

/**
 * Get Amazon affiliate ID from environment variable
 * Returns undefined if not set (will log warning in development)
 */
export function getAmazonAffiliateId(): string | undefined {
  const affiliateId = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID;

  if (!affiliateId && process.env.NODE_ENV === 'development') {
    console.warn(
      '⚠️ NEXT_PUBLIC_AMAZON_AFFILIATE_ID is not set in .env.local. Amazon affiliate links will not include your tracking ID.'
    );
  }

  return affiliateId;
}

/**
 * Generate Amazon affiliate link from ASIN
 * @param asin - Amazon Standard Identification Number (10 characters)
 * @param region - Amazon region code (e.g., 'com', 'co.uk', 'ca')
 * @returns Full Amazon affiliate URL
 */
export function generateAmazonLink(
  asin: string,
  region: string = 'com'
): string {
  const affiliateId = getAmazonAffiliateId();
  const baseUrl = `https://www.amazon.${region}/dp/${asin}`;

  // If no affiliate ID is set, return plain Amazon link
  if (!affiliateId) {
    return baseUrl;
  }

  // Add affiliate tag as query parameter
  return `${baseUrl}?tag=${affiliateId}`;
}

/**
 * Check if Amazon affiliate ID is configured
 */
export function hasAmazonAffiliateId(): boolean {
  return !!process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID;
}

/**
 * Supported Amazon regions
 */
export const AMAZON_REGIONS = {
  com: 'United States',
  'co.uk': 'United Kingdom',
  ca: 'Canada',
  de: 'Germany',
  fr: 'France',
  in: 'India',
  'co.jp': 'Japan',
  'com.au': 'Australia',
} as const;

export type AmazonRegion = keyof typeof AMAZON_REGIONS;
