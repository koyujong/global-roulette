import BlogPost from "@/components/BlogPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generador de Opciones Aleatorias para Girar la Rueda | Elige Fácil",
  description: "Crea tu propio generador de opciones aleatorias para girar la rueda. Ideal para tomar decisiones difíciles de forma rápida.",
  keywords: ["generador de opciones", "girar la rueda", "rueda de la fortuna", "decisiones al azar"],
  alternates: {
    canonical: "/blog/generador-opciones-girar-rueda",
    languages: {
      "es": "/blog/generador-opciones-girar-rueda?lang=es",
      "en": "/blog/generador-opciones-girar-rueda?lang=en",
      "ko": "/blog/generador-opciones-girar-rueda?lang=ko",
      "x-default": "/blog/generador-opciones-girar-rueda",
    },
  },
};

export default function Page() {
  return <BlogPost slug="generador-opciones-girar-rueda" />;
}
