import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Work from "../sections/Work";
import Process from "../sections/Process";
import TestimonialsSection from "../sections/Testimonials";
import About from "../sections/About";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Process />
      <TestimonialsSection />
      <About />
      <Contact />
    </>
  );
}
