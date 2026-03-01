import BlogPost from "@/components/BlogPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juego de Ruleta para Videollamadas con Amigos | Zoom, Meet, Teams",
  description: "Diviértete con el mejor juego de ruleta para videollamadas con amigos. Crea retos, elige quién paga la cena y más.",
  keywords: ["juegos videollamadas", "ruleta zoom", "diversión online", "juegos de grupos"],
  alternates: {
    canonical: "/blog/juego-ruleta-videollamadas-amigos",
    languages: {
      "es": "/blog/juego-ruleta-videollamadas-amigos?lang=es",
      "en": "/blog/juego-ruleta-videollamadas-amigos?lang=en",
      "ko": "/blog/juego-ruleta-videollamadas-amigos?lang=ko",
      "x-default": "/blog/juego-ruleta-videollamadas-amigos",
    },
  },
};

export default function Page() {
  return <BlogPost slug="juego-ruleta-videollamadas-amigos" />;
}
