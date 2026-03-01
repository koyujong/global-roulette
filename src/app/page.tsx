import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "es": "/?lang=es",
      "en": "/?lang=en",
      "ko": "/?lang=ko",
      "x-default": "/",
    },
  },
};

export default function Home() {
  return <HomeClient />;
}
