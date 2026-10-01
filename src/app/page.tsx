import { Bio } from "@/components/Bio/Bio";
import { Discography } from "@/components/Discography/Discography";
import { Hero } from "@/components/Hero/Hero";
import { Photography } from "@/components/Photography/Photography";
import { Recordings } from "@/components/Recordings/Recordings";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Bio />
      <Discography />
      <Recordings />
      <Photography />
    </>
  );
}
