import type { Metadata } from "next";
import AboutHeader from "@/components/about/AboutHeader";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About — AURUM",
  description:
    "Learn the story behind AURUM — a curated lifestyle house crafting modern luxury for everyday life.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <AboutStory />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
