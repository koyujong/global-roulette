import BlogPost from "@/components/BlogPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruleta de Decisiones Aleatorias Online Gratis | Global Roulette",
  description: "Descubre nuestra ruleta de decisiones aleatorias online gratis. La herramienta perfecta para elegir nombres, opciones o sorteos rápidamente.",
  keywords: ["ruleta de decisiones", "gratis online", "azar", "decisiones rápidas"],
  alternates: {
    canonical: "/blog/ruleta-decisiones-aleatorias-gratis",
    languages: {
      "es": "/blog/ruleta-decisiones-aleatorias-gratis?lang=es",
      "en": "/blog/ruleta-decisiones-aleatorias-gratis?lang=en",
      "ko": "/blog/ruleta-decisiones-aleatorias-gratis?lang=ko",
      "x-default": "/blog/ruleta-decisiones-aleatorias-gratis",
    },
  },
};

export default function Page() {
  return <BlogPost slug="ruleta-decisiones-aleatorias-gratis" />;
}
