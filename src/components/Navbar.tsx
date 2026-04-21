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
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
  const bgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const textMuted = isDark ? "text-white/70" : "text-gray-600";
  const borderColor = isDark ? "border-white/10" : "border-gray-200";
  const hoverBg = "hover:bg-[#c9a03d] hover:text-black transition-colors duration-300";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgColor}/50 backdrop-blur-sm shadow-lg`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* الصف الأول - ديسكتوب */}
      <div className={`hidden md:block border-b ${borderColor}`}>
        <div className="container mx-auto px-4 sm:px-6 h-[70px] relative">
          
          {/* اللوجو - ثابت في أقصى الشمال دائمًا */}
          <Link to="/" className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex items-center gap-2" dir="ltr">
            <img src={logo} alt="logo" className="h-10 md:h-12 object-contain" />
            <h2 className={`text-sm md:text-base font-semibold ${textColor}`}>{t.nav.name}</h2>
          </Link>

          {/* البيانات - جهة اليمين في LTR والشمال في RTL */}
          <div className={`flex items-center h-full gap-3 text-xs md:text-sm ${textMuted} ${isRTL ? "justify-start pr-28" : "justify-end pl-28"}`}>
            <div className="hidden lg:flex items-center gap-2"><Mail size={14} /><span>info@oec-ksa.com</span></div>
            <div className="hidden sm:flex items-center gap-2"><Phone size={14} /><span dir="ltr">+966 50 032 5298</span></div>
            
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className={`flex items-center gap-1 px-2 py-1 rounded-full transition text-xs ${isDark ? "bg-white/10" : "bg-gray-100"} ${hoverBg}`}>
              <Globe size={12} />{lang === "ar" ? "EN" : "عربي"}
            </button>
            
            <button onClick={toggle} className={`p-1.5 rounded-full transition ${isDark ? "bg-white/10" : "bg-gray-100"} ${hoverBg}`}>
              {isDark ? <Sun size={12} /> : <Moon size={12} />}
            </button>
          </div>
        </div>
      </div>

      {/* الصف الثاني - الروابط متوزعة بالتساوي تحت - ديسكتوب */}
      <div className={`hidden md:block ${bgColor}/50`}>
        <div className="container mx-auto px-4 sm:px-6">
<div className="flex items-center justify-center gap-x-16 md:gap-x-20 lg:gap-x-24 py-3">
    {links.map((l) => (
    <Link
      key={l.to}
      to={l.to}
      className={`relative text-sm md:text-base font-medium transition duration-300 ${
        location.pathname === l.to
          ? "text-[#c9a03d]"
          : isDark
          ? "text-white/80 hover:text-white"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {l.label}
      {location.pathname === l.to && (
        <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-[#c9a03d] rounded-full" />
      )}
    </Link>
  ))}
</div>
        </div>
      </div>

      {/* 🔹 الموبايل */}
      <div className="md:hidden">
        {/* الصف الأول في الموبايل */}
        <div className={`px-3 py-2 flex items-center justify-between ${bgColor}/${scrolled ? "95" : "90"} backdrop-blur-sm border-b ${borderColor}`}>
          {/* اللوجو */}
          <Link to="/" className="flex items-center gap-1.5" dir="ltr">
            <img src={logo} alt="logo" className="h-7 object-contain" />
            <h2 className={`text-[9px] font-semibold ${textColor}`}>{t.nav.name}</h2>
          </Link>
          
          {/* الأزرار */}
          <div className={`flex items-center gap-2 ${textMuted}`}>
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} className="p-1">
              <Globe size={15} />
            </button>
            <button onClick={toggle} className="p-1">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للموبايل */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`${bgColor}/95 backdrop-blur-md border-t ${borderColor}`}
            >
              <div className="px-3 py-2 space-y-0.5">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`block py-2.5 text-sm font-medium transition duration-300 ${
                      location.pathname === l.to
                        ? "text-[#c9a03d]"
                        : isDark
                        ? "text-white/80 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
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