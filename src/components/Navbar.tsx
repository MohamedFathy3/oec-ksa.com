import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Mail, Phone, Globe, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/projects", label: t.nav.projects },
    { to: "/services", label: t.nav.services },
    { to: "/contact", label: t.nav.contact },
  ];

  const isRTL = lang === "ar";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md"
          : "bg-black/40 backdrop-blur-sm"
      } text-white`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* 🔹 الصف الأول */}
      <div className="hidden md:block bg-black/40 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 relative flex items-center h-[70px]">

          {/* 🔥 اللوجو ثابت شمال ومتوسط */}
          <div
  className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2"
  dir="ltr"
>
  <Link to="/" className="flex items-center gap-2">
    
    {/* logo */}
    <img
      src={logo}
      alt="logo"
      className="h-10 md:h-12 lg:h-14 object-contain"
    />

    {/* text */}
    <div className="flex flex-col leading-tight">
      <h2 className="text-sm ml-5 md:text-base font-semibold whitespace-nowrap">
        {t.nav.name}
      </h2>
     
    </div>

  </Link>
</div>

          {/* البيانات */}
          <div className="flex items-center gap-3 lg:gap-4 text-xs md:text-sm ml-auto">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>info@oec-ksa.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span dir="ltr">+966 50 032 5298</span>
            </div>

            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 hover:bg-[#c9a03d] hover:text-black transition text-xs"
            >
              <Globe size={12} />
              {lang === "ar" ? "EN" : "عربي"}
            </button>

            <button
              onClick={toggle}
              className="p-1.5 rounded-full bg-white/10 hover:bg-[#c9a03d] hover:text-black transition"
            >
              {isDark ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 الصف الثاني */}
      <div className="hidden md:block bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-center py-3 gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-medium transition ${
                location.pathname === l.to
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
              {location.pathname === l.to && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* 🔹 موبايل */}
      <div className="md:hidden">
        <div
          className={`px-4 h-[60px] relative flex items-center ${
            scrolled
              ? "bg-black/80 backdrop-blur-md"
              : "bg-black/40 backdrop-blur-sm"
          }`}
        >
          {/* اللوجو */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2" dir="ltr">
            <Link to="/">
              <img src={logo} alt="logo" className="h-8 object-contain" />
            </Link>
          </div>

          {/* أزرار */}
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
              <Globe size={16} />
            </button>

            <button onClick={toggle}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/90 backdrop-blur-md"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block py-2 text-white/80 hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;