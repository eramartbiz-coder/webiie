export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/our-work" },
  { label: "Process", to: "/process" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export type ServiceKey = "web" | "mobile" | "ai" | "strategy" | "support" | "custom";

export const SERVICES: {
  key: ServiceKey;
  title: string;
  text: string;
  tone: "blue" | "violet" | "teal" | "coral";
}[] = [
  { key: "web", title: "Website Development", text: "Fast, modern and scalable websites for your business.", tone: "blue" },
  { key: "mobile", title: "Mobile App Development", text: "Android & iOS apps with modern technology.", tone: "violet" },
  { key: "ai", title: "AI & Automation Solutions", text: "Automate workflows and unlock new possibilities.", tone: "teal" },
  { key: "strategy", title: "Digital Strategy & Consulting", text: "Data-driven strategy to grow your business.", tone: "coral" },
  { key: "support", title: "IT Support & Maintenance", text: "Reliable support to keep your business running.", tone: "blue" },
  { key: "custom", title: "Custom Digital Solutions", text: "Tailored solutions for your unique needs.", tone: "violet" },
];

export const TONES = {
  blue: { icon: "bg-gradient-to-br from-blue-500 to-blue-700", card: "from-blue-500/15", ring: "border-blue-400/40 text-blue-300" },
  violet: { icon: "bg-gradient-to-br from-violet-500 to-purple-700", card: "from-violet-500/15", ring: "border-violet-400/40 text-violet-300" },
  teal: { icon: "bg-gradient-to-br from-teal-400 to-emerald-700", card: "from-teal-400/15", ring: "border-teal-300/40 text-teal-300" },
  coral: { icon: "bg-gradient-to-br from-orange-500 to-red-600", card: "from-red-500/15", ring: "border-red-400/40 text-red-300" },
} as const;

export const SERVICE_STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

export const TRUSTED = ["stripe", "Google", "Microsoft", "aws", "React", "django", "Flutter", "PostgreSQL"];

export type WorkFilter = "All" | "Websites" | "Mobile Apps" | "AI Solutions" | "Automation";
export const WORK_FILTERS: WorkFilter[] = ["All", "Websites", "Mobile Apps", "AI Solutions", "Automation"];

export type Project = {
  name: string;
  kind: "Web Platform" | "Mobile App";
  filter: WorkFilter;
  text: string;
  image: string;
  stack: string[];
  highlights: string[];
  result: { value: string; label: string };
};

export const PROJECTS: Project[] = [
  {
    name: "EraMart",
    kind: "Web Platform",
    filter: "Websites",
    text: "Local eCommerce platform for Thakurganj with real-time delivery.",
    image: "/assets/work/eramart.webp",
    stack: ["React", "Django REST", "PostgreSQL"],
    highlights: ["Category and product catalog with search", "Real-time order and delivery tracking", "Admin panel for stores and inventory"],
    result: { value: "100%", label: "Local delivery coverage" },
  },
  {
    name: "NAE Coaching",
    kind: "Mobile App",
    filter: "Mobile Apps",
    text: "Learning app with live classes, tests, notes and progress tracking.",
    image: "/assets/work/nae.webp",
    stack: ["React Native", "Expo", "Django REST"],
    highlights: ["Live class schedule with upcoming and completed tabs", "Tests, notes and progress tracking", "Subject-wise learning dashboard"],
    result: { value: "4", label: "Learning modules in one app" },
  },
  {
    name: "TKG Business",
    kind: "Web Platform",
    filter: "Websites",
    text: "Local business discovery & advertising platform.",
    image: "/assets/work/tkg.webp",
    stack: ["React", "Tailwind CSS", "Django REST"],
    highlights: ["Business listings and campaigns", "Analytics dashboard with growth charts", "Messaging between businesses and customers"],
    result: { value: "+160%", label: "Business growth tracked" },
  },
];

export const WORK_STATS = [
  { value: "100+", label: "Happy Clients", text: "Startups and growing businesses", tone: "violet" },
  { value: "150+", label: "Projects Delivered", text: "Web, Mobile & AI solutions", tone: "blue" },
  { value: "5+", label: "Years of Experience", text: "Building digital products", tone: "teal" },
  { value: "98%", label: "Client Satisfaction", text: "Long-term partnerships", tone: "coral" },
] as const;

export const STEPS = [
  { title: "Discover", text: "We understand your goals, challenges and audience.", tags: ["Consultation", "Requirement Analysis"] },
  { title: "Plan", text: "We create a clear strategy, roadmap and solution design.", tags: ["Strategy", "UI/UX Planning"] },
  { title: "Build", text: "We design and develop your solution with modern technology.", tags: ["Development", "Quality Assurance"] },
  { title: "Launch", text: "We deploy, optimize and ensure a smooth release.", tags: ["Deployment", "Performance Optimization"] },
  { title: "Grow", text: "We provide ongoing support and help you scale further.", tags: ["Maintenance", "Growth & Automation"] },
];

export const TESTIMONIALS = [
  { quote: "Webiie built our website exactly the way we imagined. The team was professional, responsive and delivered on time.", name: "Rohit Sharma", role: "Founder, Retail Startup" },
  { quote: "Great experience working with Webiie. They understood our requirements quickly and built a high-quality mobile app.", name: "Priya Verma", role: "Co-founder, EdTech" },
  { quote: "Professional team with excellent technical knowledge. They helped us automate our business processes and improve efficiency.", name: "Amit Kumar", role: "Business Owner" },
];

export const FAQS = [
  { q: "What services does Webiie offer?", a: "Websites, Android & iOS apps, AI and automation, digital strategy, IT support and fully custom digital solutions." },
  { q: "How much does a project cost?", a: "It depends on scope and features. Share your idea with us and we will send a clear, no-obligation estimate." },
  { q: "How long does it take to complete a project?", a: "A typical website takes a few weeks and a mobile app a few months. We agree on a roadmap before we start." },
  { q: "Do you provide ongoing support?", a: "Yes. We offer maintenance, monitoring and improvements after launch so your product keeps growing." },
  { q: "Can you work with startups and small businesses?", a: "Absolutely. Most of our clients are startups and growing businesses, and we scale the plan to fit your stage." },
];

export const WHY = [
  { title: "Business-Focused Approach", text: "We build solutions that solve real business problems and drive measurable results.", tone: "blue" },
  { title: "Modern Technology", text: "Using the latest tools and best practices for scalable and secure solutions.", tone: "violet" },
  { title: "Experienced Team", text: "A dedicated team with expertise in web, mobile, AI and automation.", tone: "teal" },
  { title: "Long-Term Partnership", text: "We grow with you and provide ongoing support for long-term success.", tone: "coral" },
] as const;

export const IMPACT = [
  { value: "50+", label: "Projects Delivered", text: "Across web, mobile and AI solutions", tone: "violet" },
  { value: "30+", label: "Happy Clients", text: "Startups and growing businesses", tone: "blue" },
  { value: "5+", label: "Years of Experience", text: "Building digital products that create impact", tone: "teal" },
  { value: "100%", label: "Client Satisfaction", text: "Focused on quality, communication and results", tone: "coral" },
] as const;

export const FOOTER = {
  quick: [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Our Work", to: "/our-work" },
    { label: "Process", to: "/process" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  services: ["Website Development", "Mobile App Development", "AI & Automation Solutions", "Digital Strategy & Consulting", "IT Support & Maintenance", "Custom Digital Solutions"],
  resources: ["Case Studies", "Blog", "FAQs", "Privacy Policy", "Terms of Service", "Sitemap"],
};

export const PROJECT_TYPES = ["Website Development", "Mobile App Development", "AI & Automation Solutions", "Digital Strategy & Consulting", "IT Support & Maintenance", "Custom Digital Solutions"];

export const WHATSAPP_NUMBER = "919123483744";

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
