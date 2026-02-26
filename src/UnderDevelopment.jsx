import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Facebook,
  Linkedin,
  Code,
  Globe,
  TrendingUp,
  Menu,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Scene3D from "./Scene3D";
import Logo from "./assets/Samoa in vibrant gradient typography.png";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-3">
        {/* Logo */}
        <img
          src={Logo}
          alt="Sanmora Logo"
          className="h-[80px] w-auto object-contain"
        />
      </div>

      <button className="md:hidden text-white">
     
      </button>
    </motion.nav>
  );
};

const UnderDevelopment = () => {
  const [mounted, setMounted] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "6dfadd5d-67d1-4dcb-b99f-d96db23438f2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Message Sent Successfully");
        event.target.reset();
      } else {
        setResult("❌ " + data.message);
      }
    } catch (error) {
      setResult("❌ Network Error");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: Code,
      label: "Web Development",
      desc: "Crafting high-performance digital experiences.",
    },
    {
      icon: Globe,
      label: "IT Solutions",
      desc: "Robust infrastructure for modern enterprises.",
    },
    {
      icon: TrendingUp,
      label: "Digital Marketing",
      desc: "Strategic growth and brand positioning.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white font-sans flex flex-col">
      <Navbar />
      <Scene3D />

      <div className="fixed inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 pointer-events-none z-0" />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center max-w-7xl mx-auto w-full"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-slate-300 uppercase">
              Platform Upgrade in Progress
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-secondary">
              Next Generation
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            Sanmora is redefining digital excellence. We are currently refining
            our platform to deliver an exceptional experience.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {service.label}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div variants={itemVariants} className="w-full">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Contact Us
          </h3>

          <form
            onSubmit={onSubmit}
            className="mt-4 w-full max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full mb-3 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-primary outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full mb-3 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-primary outline-none"
            />

            <div className="relative mb-3">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-left focus:border-primary outline-none transition-all duration-300"
              >
                <span className={selectedService ? "text-white" : "text-slate-400"}>
                  {selectedService || "Select a Service"}
                </span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} className="text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 top-full left-0 right-0 mt-2 py-2 rounded-xl bg-[#0f0f0f] border border-white/10 shadow-2xl backdrop-blur-xl"
                  >
                    {["Web Development", "Digital Marketing", "Mobile Application"].map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          setSelectedService(service);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                      >
                        {service}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <input type="hidden" name="service" value={selectedService} required />
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              id="message"
              required
              rows="4"
              className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:border-primary outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary font-semibold"
            >
              {loading ? "Sending..." : "Send Message ✨"}
            </motion.button>

            {result && (
              <p className="text-sm text-slate-400 mt-3 text-center">
                {result}
              </p>
            )}
          </form>
        </motion.div>
      </motion.main>

      <footer className="relative z-10 w-full border-t border-white/5 bg-black/40 backdrop-blur-xl pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Brand Section */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="Sanmora Logo"
                  className="h-16 w-auto object-contain brightness-110"
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Redefining digital excellence through high-performance web experiences, 
                strategic marketing, and robust IT solutions.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, href: "https://www.instagram.com/_sanmora?igsh=MWN2bXhpY3NkaDRqcg==" },
                  { Icon: Facebook, href: "https://www.facebook.com/share/17efUjYg7f/" },
                  { Icon: Linkedin, href: "https://www.linkedin.com/company/sanmora/" }
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/50 transition-all shadow-lg"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" />
                Our Services
              </h4>
              <ul className="space-y-4">
                {["Web Development", "Digital Marketing", "Mobile Application", "IT Solutions"].map((item) => (
                  <li key={item}>
                    <button className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-all" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-4 bg-secondary rounded-full" />
                Connect With Us
              </h4>
              <div className="space-y-5">
                <a href="mailto:sanmora.techno@gmail.com" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Email Us</p>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">sanmora.techno@gmail.com</p>
                  </div>
                </a>

                <a href="tel:8780005326" className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Call Us</p>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors">87800 05326</p>
                  </div>
                </a>

                <a 
                  href="https://www.google.com/maps/dir//Sanmora,+Sattadhar+char-rasta,+BRTS+stop,+13+virat+complex,+near+satadhar,+Ghatlodiya,+Ahmedabad,+Gujarat+380051/@23.0690054,72.5298643,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x395e83b5141d82cd:0x6e7147490e2dfb16!2m2!1d72.532802!2d23.0631272?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/10 transition-all">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Visit Us</p>
                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors  decoration-slate-600  ">Ahmedabad, Gujarat</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-light">
              © {new Date().getFullYear()}{" "}
              <span className="text-slate-300 font-medium">Sanmora.in</span> All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">Privacy Policy</button>
              <button className="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UnderDevelopment;
