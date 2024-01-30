/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
		domains: ['media.graphassets.com', 'localhost'],
		dangerouslyAllowSVG: true,
	},
}

module.exports = nextConfig
