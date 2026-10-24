import Services from "../sections/Services";
import Work from "../sections/Work";
import Process from "../sections/Process";
import TestimonialsSection from "../sections/Testimonials";
import About from "../sections/About";
import Contact from "../sections/Contact";

export const ServicesPage = () => <Services />;
export const WorkPage = () => (
  <>
    <Work />
    <TestimonialsSection />
  </>
);
export const ProcessPage = () => <Process />;
export const AboutPage = () => <About />;
export const ContactPage = () => <Contact />;
