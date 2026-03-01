import BlogPost from "@/components/BlogPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo Hacer un Sorteo con Ruleta Personalizada | Guía Paso a Paso",
  description: "Aprende cómo hacer un sorteo con ruleta personalizada para tus redes sociales o eventos utilizando nuestra plataforma gratuita.",
  keywords: ["sorteo personalizado", "hacer rifas online", "ruleta de nombres", "sorteo gratis"],
  alternates: {
    canonical: "/blog/como-hacer-sorteo-ruleta-personalizada",
    languages: {
      "es": "/blog/como-hacer-sorteo-ruleta-personalizada?lang=es",
      "en": "/blog/como-hacer-sorteo-ruleta-personalizada?lang=en",
      "ko": "/blog/como-hacer-sorteo-ruleta-personalizada?lang=ko",
      "x-default": "/blog/como-hacer-sorteo-ruleta-personalizada",
    },
  },
};

export default function Page() {
  return <BlogPost slug="como-hacer-sorteo-ruleta-personalizada" />;
}
