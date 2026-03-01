import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Guías y Recursos | Global Roulette",
  description: "Aprende a usar la ruleta aleatoria para sorteos, decisiones y juegos con nuestras guías detalladas.",
  alternates: {
    canonical: "/blog",
    languages: {
      "es": "/blog?lang=es",
      "en": "/blog?lang=en",
      "ko": "/blog?lang=ko",
      "x-default": "/blog",
    },
  },
};

export default function Page() {
  return <BlogClient />;
}
