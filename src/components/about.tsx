import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Eye, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/assets/about/5f8b30634e240c6da90c1cfe5f537d962865dc19.png";
import section from "@/assets/about/e2f9bad7e3d21af8906f8741cafa70f86c77cdfd.png";
import { useTheme } from "@/contexts/ThemeContext";

const About = () => {
  const { t, dir } = useLanguage();  // t هو object وليس function
  const { isDark } = useTheme();
  const isRTL = dir === "rtl";    

  return (
    <div className="min-h-screen">
      {/* Hero Section - صورة كاملة الشاشة */}
  

      <section className="py-20 px-4">
          <h1 className="text-center font-bold mb-12 text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-white">
        {t.about.pageTitle}  {/* استخدام ككائن */}
    </h1>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={section}
                  alt="Engineering"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-[#c9a03d]/20"></div>
              </div>
            </motion.div>

            {/* النصف الأيسر - المحتوى النصي */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                {t.about.title}  {/* استخدام ككائن */}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {t.about.desc}  {/* استخدام ككائن */}
              </p>

            

             <Link to="/about" className="inline-block">
  <button className="bg-[#c9a03d] hover:bg-[#b58a2e] text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
    {t.hero.cta}
  </button>
</Link> 
            </motion.div>
          </div>
        </div>
      </section>
  <section className="relative w-full h-[600px]">
        <img
          src={Hero}
          alt="About"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative h-full flex items-center justify-center text-center px-4">
        </div>
      </section>
      <FloatingButtons />
    </div>
  );
};

export default About;