import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Using a placeholder domain. User can update this in Vercel Env vars if needed, 
  // but for now we'll use the canonical link logic.
  const baseUrl = 'https://roulette.4kdrivewalk.com'; 
  
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
    // Blog Posts (Spanish focus)
    {
      url: `${baseUrl}/blog/ruleta-decisiones-aleatorias-gratis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/como-hacer-sorteo-ruleta-personalizada`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/ruleta-nombres-sorteos-en-vivo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/juego-ruleta-videollamadas-amigos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/generador-opciones-girar-rueda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
