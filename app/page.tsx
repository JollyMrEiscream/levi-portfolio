import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Credential } from "@/components/sections/credential";
import { Contact } from "@/components/sections/contact";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Marquee } from "@/components/marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Journey />
      <Credential />
      <Featured />
      <Work />
      <Skills />
      <Contact />
    </>
  );
}
