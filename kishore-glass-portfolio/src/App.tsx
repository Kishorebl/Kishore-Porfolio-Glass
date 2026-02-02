import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  Brush,
  Cloud,
  Code2,
  Figma,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Network,
  Shield,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import profileImage from './assets/profile-placeholder.svg';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const skills = [
  {
    title: 'UI/UX Design',
    items: ['Design Systems', 'Wireframing', 'Prototyping', 'UX Research'],
  },
  {
    title: 'Web Development',
    items: ['React + TypeScript', 'Responsive UI', 'Performance', 'Accessibility'],
  },
  {
    title: 'Tools & Platforms',
    items: ['Figma', 'Framer', 'Notion', 'Vercel', 'GitHub'],
  },
  {
    title: 'Networking Basics',
    items: ['Firewall Concepts', 'Cloud Networking', 'Routing', 'Support Ops'],
  },
];

const projects = [
  {
    title: 'Glass Commerce UI',
    description:
      'A sleek e-commerce concept with glassmorphism cards and intuitive product discovery.',
    tags: ['UI/UX', 'Prototype', 'Design System'],
  },
  {
    title: 'Creator Studio Dashboard',
    description:
      'Analytics and content planning workspace built for creators with modular panels.',
    tags: ['React', 'Dashboard', 'SaaS'],
  },
  {
    title: 'Network Ops Portal',
    description:
      'Modern portal for monitoring firewall and cloud-network health with clear status cues.',
    tags: ['Networking', 'Support', 'Monitoring'],
  },
];

const timeline = [
  {
    title: 'Apprentice Support Engineer (Networking)',
    company: 'Learning Track',
    period: '2024 - Present',
    detail:
      'Building foundational knowledge in firewall, cloud-networking, and support workflows.',
  },
  {
    title: 'UI/UX Designer & Web Developer',
    company: 'Freelance / Personal Projects',
    period: '2022 - Present',
    detail:
      'Delivering premium interfaces, interactive prototypes, and responsive web experiences.',
  },
  {
    title: 'Content Creator',
    company: 'Personal Brand',
    period: '2021 - Present',
    detail:
      'Sharing design and tech insights through visual storytelling and tutorials.',
  },
];

const socialLinks = [
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
  { label: 'GitHub', icon: Github, href: '#' },
  { label: 'Behance', icon: Layers, href: '#' },
  { label: 'Instagram', icon: Brush, href: '#' },
];

const orbitIcons = [Figma, Code2, Cloud, Shield, Network, Globe, Layers, Brush];

const getActiveSection = () => {
  const sections = navLinks
    .map((link) => document.getElementById(link.id))
    .filter((section): section is HTMLElement => Boolean(section));

  const position = window.scrollY + 120;

  const active = sections
    .map((section) => ({
      id: section.id,
      offset: section.offsetTop,
    }))
    .sort((a, b) => a.offset - b.offset)
    .filter((section) => section.offset <= position)
    .pop();

  return active?.id ?? 'home';
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const reduceMotion = useReducedMotion();
  const [orbitRadius, setOrbitRadius] = useState(190);
  const [isCompactOrbit, setIsCompactOrbit] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setActiveSection(getActiveSection());
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 768) {
        setOrbitRadius(120);
        setIsCompactOrbit(true);
      } else if (window.innerWidth < 1024) {
        setOrbitRadius(150);
        setIsCompactOrbit(false);
      } else {
        setOrbitRadius(190);
        setIsCompactOrbit(false);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const orbitItems = useMemo(() => {
    const count = reduceMotion ? 4 : isCompactOrbit ? 5 : orbitIcons.length;
    const slice = orbitIcons.slice(0, count);
    return slice.map((Icon, index) => ({
      Icon,
      angle: (360 / slice.length) * index,
    }));
  }, [reduceMotion, isCompactOrbit]);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [formSuccess, setFormSuccess] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof formErrors = {};

    if (!formState.name.trim()) {
      nextErrors.name = 'Please share your name.';
    }
    if (!formState.email.includes('@')) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!formState.message.trim()) {
      nextErrors.message = 'Tell me about your project or idea.';
    }

    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setFormSuccess('Thanks! I will get back to you within 24-48 hours.');
      setFormState({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.5),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute left-10 top-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.45),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.45),transparent_70%)] blur-3xl" />
      <div className="noise-layer" />

      <header className="sticky top-6 z-40 mx-auto w-full max-w-6xl px-4">
        <nav className="glass-surface flex items-center justify-between gap-6 px-6 py-4 shadow-glass-ring">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-ink-400 shadow-glass-button" />
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Kishore
            </span>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition hover:text-white ${
                  activeSection === link.id ? 'text-white' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href="#contact" className="glass-button text-xs">
            Contact Me
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-16">
        <section id="home" className="scroll-mt-24">
          <div className="glass-surface grid gap-12 px-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center gap-6"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                Hi there,
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                I’m Kishore B L
              </h1>
              <p className="text-lg text-white/80">
                UI/UX Designer • Web Developer • Content Creator
              </p>
              <p className="text-base leading-relaxed text-white/70">
                I craft premium digital experiences, build clean and responsive web
                interfaces, and share creative knowledge. I’m also expanding into
                networking, firewall, and cloud-network support to deliver reliable
                systems end-to-end.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="glass-button bg-white/20">
                  Explore My Work
                </a>
                <button className="glass-button">Download Resume</button>
                <a href="#contact" className="glass-button">
                  Contact
                </a>
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="glass-button h-10 w-10 rounded-full p-0"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <div className="relative flex items-center justify-center">
              <div className="relative">
                <div
                  className={`absolute inset-0 rounded-full border border-white/15 bg-white/5 backdrop-blur-glass ${
                    reduceMotion ? '' : 'animate-spinSlow'
                  }`}
                  style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
                />
                <img
                  src={profileImage}
                  alt="Kishore profile"
                  className="relative z-10 h-64 w-64 rounded-full border border-white/20 object-cover shadow-glass-soft md:h-72 md:w-72"
                />
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    reduceMotion ? '' : 'animate-spinSlow'
                  }`}
                  style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
                >
                  {orbitItems.map(({ Icon, angle }, index) => (
                    <div
                      key={`${Icon.displayName ?? 'icon'}-${index}`}
                      className="absolute left-1/2 top-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(${orbitRadius}px) rotate(-${
                          angle
                        }deg)`,
                      }}
                    >
                      <div className="glass-button h-12 w-12 rounded-full p-0 hover:scale-105">
                        <Icon size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
            <div className="glass-card space-y-4">
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="text-white/70">
                Based in Tamil Nadu, India, I help brands and startups create immersive
                digital products. My work blends minimal visuals with bold glassmorphic
                layers, while keeping accessibility and usability at the core.
              </p>
              <p className="text-white/70">
                Alongside design and development, I’m actively learning networking and
                firewall fundamentals to support modern infrastructure and secure web
                experiences.
              </p>
            </div>
            <div className="glass-card space-y-4">
              <div className="flex items-center gap-3">
                <ArrowDown size={18} className="text-ink-200" />
                <h3 className="text-lg font-semibold">Quick Facts</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Location: Tamil Nadu, India</li>
                <li>Focus: UI/UX, Web Development, Content</li>
                <li>Track: Networking / Firewall / Cloud-Network</li>
                <li>Availability: Open to collaborations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <span className="text-sm text-white/60">
              Curated capabilities across design, dev, and networking.
            </span>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.title} className="glass-card space-y-3">
                <h3 className="text-lg font-semibold">{skill.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            <span className="text-sm text-white/60">
              A snapshot of premium glassmorphism-focused work.
            </span>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.title} className="glass-card flex h-full flex-col">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-3 text-sm text-white/70">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="glass-button text-xs">Live</button>
                  <button className="glass-button text-xs">GitHub</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">Experience & Education</h2>
          <div className="mt-6 space-y-6">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className="glass-card relative flex flex-col gap-2 md:flex-row md:items-center md:gap-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-ink-100">{item.company}</p>
                  <p className="mt-2 text-sm text-white/70">{item.detail}</p>
                </div>
                <span className="text-sm text-white/60 md:text-right">
                  {item.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
            <form onSubmit={handleSubmit} className="glass-card space-y-4">
              <h2 className="text-2xl font-semibold">Contact</h2>
              <p className="text-sm text-white/70">
                Let’s collaborate on premium digital experiences or networking-focused
                projects. Share your idea and I’ll respond soon.
              </p>
              <div className="space-y-2">
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="text-xs text-ink-100">{formErrors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <input
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="Email address"
                />
                {formErrors.email && (
                  <p className="text-xs text-ink-100">{formErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="glass-input min-h-[140px] resize-none"
                  placeholder="Tell me about your project"
                />
                {formErrors.message && (
                  <p className="text-xs text-ink-100">{formErrors.message}</p>
                )}
              </div>
              {formSuccess && <p className="text-sm text-ink-100">{formSuccess}</p>}
              <button type="submit" className="glass-button">
                <Mail size={16} />
                Send Message
              </button>
            </form>
            <div className="glass-card space-y-4">
              <h3 className="text-lg font-semibold">Let’s Connect</h3>
              <p className="text-sm text-white/70">
                Prefer direct outreach? Connect with me on social platforms for updates
                and collaborations.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="glass-button"
                    >
                      <Icon size={16} />
                      {social.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="glass-surface flex flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/60 md:flex-row">
          <p>© 2025 Kishore B L. All rights reserved.</p>
          <p className="text-white/50">
            Crafted with glassmorphism, Inter type, and smooth motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
