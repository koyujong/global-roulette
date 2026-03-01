import BlogPost from "@/components/BlogPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruleta de Nombres Aleatorios para Sorteos en Vivo | Eventos Dinámicos",
  description: "Usa nuestra ruleta de nombres aleatorios para sorteos en vivo. Ideal para streamers, profesores y presentadores de eventos.",
  keywords: ["ruleta en vivo", "sorteos streamers", "nombres aleatorios", "engagement eventos"],
  alternates: {
    canonical: "/blog/ruleta-nombres-sorteos-en-vivo",
    languages: {
      "es": "/blog/ruleta-nombres-sorteos-en-vivo?lang=es",
      "en": "/blog/ruleta-nombres-sorteos-en-vivo?lang=en",
      "ko": "/blog/ruleta-nombres-sorteos-en-vivo?lang=ko",
      "x-default": "/blog/ruleta-nombres-sorteos-en-vivo",
    },
  },
};

export default function Page() {
  return <BlogPost slug="ruleta-nombres-sorteos-en-vivo" />;
}
