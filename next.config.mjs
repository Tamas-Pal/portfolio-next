import withPlaiceholder from '@plaiceholder/next';
/** @type {import('next').NextConfig} */
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';
//const path = require('path');
1;

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    /*  config.resolve.alias = {
      ...config.resolve.alias,
      // your aliases
      three$: path.resolve('./_utils/Three.js'),
    };*/
    //config.resolve.alias['three'] = path.resolve('./src/_utils/threeExports.js');
    //config.resolve.alias['@react-three/drei'] = path.resolve('./src/_utils/dreiExports.js');
    //config.resolve.alias['three-stdlib'] = path.resolve('./src/_utils/three-stdlibExports.js');
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

// to use analayzer run: ANALYZE=true npm run build
/*const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});*/

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer(withPlaiceholder(nextConfig));
/*
webpack(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    // your aliases
  }
}
*/
