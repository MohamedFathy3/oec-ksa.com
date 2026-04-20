import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Eye, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/assets/bb345f47cdf02dce46360110b1b8da70a1095261.png";
import section from "@/assets/3461becf5c06052d027e71455e68674100675753.png";
import { useTheme } from "@/contexts/ThemeContext";

const About = () => {
  const { t, dir } = useLanguage();  // t هو object وليس function
  const { isDark } = useTheme();
  const isRTL = dir === "rtl";

  return (
    <div className="min-h-screen">
      <Navbar />

     <section className="relative w-full h-screen">
        <img
          src={Hero}
          alt="About"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <h1
            className="text-[60px] md:text-[70px] font-bold text-white "
          
          >
            {t.projects?.page7}
          </h1>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={section}
                  alt="Engineering"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-[#c9a04d]/20"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-2xl">
                {t.projects.section7}  {/* استخدام ككائن */}
              </p>


      
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default About;