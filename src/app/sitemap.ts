import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Using a placeholder domain. User can update this in Vercel Env vars if needed, 
  // but for now we'll use the canonical link logic.
  const baseUrl = 'https://global-roulette.vercel.app'; 
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/?lang=es`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?lang=en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/?lang=ko`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
