import withPlaiceholder from '@plaiceholder/next';
/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';
1;

const nextConfig = {
  output: 'export',
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qhuqbfrdrmnurimzchfb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/strapi-bucket/**',
      },
    ],
  },
};

// to use analyzer run: ANALYZE=true npm run build
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withPlaiceholder(nextConfig));
