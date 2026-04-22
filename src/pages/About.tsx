import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Eye, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "@/assets/about/786fe57278ee720cb9af80167589da53fc13a88f.jpg";
import endsection from "@/assets/about/2014462707ca0d69b666961110edad069887fba0.png";
import section from "@/assets/about/e2f9bad7e3d21af8906f8741cafa70f86c77cdfd.png";
import vision from "@/assets/about/d01802c78a09e37ddcb2b8e2426001b8c29640d4.jpg";
import visioniconon from "@/assets/about/4909d867cc6ec3660ca48a1a43923888d64883df.png";
import missionicon from "@/assets/about/77897c6403f8bcabf8b78fec6ae4b06133687b99.png";
import mission from "@/assets/about/b8732469c237a5eba2bbbd71884efe823dd3aa58.jpg";
import goal from "@/assets/about/138833321e64994048bfe9626e12891162ba4e56.png";
import { useTheme } from "@/contexts/ThemeContext";
import ValuesSection from "@/components/ValuesSection";
import { cn } from "@/lib/utils";

const About = () => {
  const { t, lang, dir } = useLanguage(); 
  const { isDark } = useTheme();
  const isRTL = dir === "rtl";

  // Animation variants
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${isDark ? 'dark bg-black' : 'bg-white'}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen">
        <img
          src={Hero}
          alt="About"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[140px] font-bold text-transparent text-center"
            style={{ WebkitTextStroke: "2px white" }}
          >
            {t.about?.pageTitle || "من نحن"}
          </motion.h1>
        </div>
      </section>

      {/* القسم الأول: الصورة على الشمال والكلام على اليمين */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* الصورة - على الشمال */}
          <motion.div 
  variants={fadeInLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className={cn(
    "order-2 md:order-1",  // موبايل: order-2 (تحت)، ديسكتوب: order-1 (فوق)
    "w-full"
  )}
>
  <div className="relative overflow-hidden rounded-[60px] sm:rounded-[80px] md:rounded-[100px] lg:rounded-[120px]">
    <div className="overflow-hidden rounded-[70px] sm:rounded-[90px] md:rounded-[110px] lg:rounded-[150px]">
      <img
        src={section}
        alt="about"
        className="w-full h-[250px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 hover:scale-110"
        loading="lazy"
      />
    </div>
  </div>
</motion.div>

{/* النص - على اليمين */}
<motion.div 
  variants={fadeInRight}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className={cn(
    `${isDark ? 'text-gray-200' : 'text-gray-800'} ${isRTL ? 'text-right' : 'text-left'}`,
    "order-1 md:order-2",  // موبايل: order-1 (فوق)، ديسكتوب: order-2 (تحت)
    "w-full"
  )}
>
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-relaxed">
    {t.about.title}
  </h2>
  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg`}>
    {t.about.desc}
  </p>
</motion.div>
          </div>
        </div>
      </section>

      {/* القسم الثاني: الكلام على الشمال والصورة على اليمين (عكس الأول) */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* النص - على الشمال */}
            <motion.div 
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                <img
                  src={visioniconon}
                  alt="vision icon"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-full"
                  loading="lazy"
                />
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-relaxed ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {t.about.vision}
                </h2>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-full`}>
                {t.about.visionDesc}
              </p>
            </motion.div>

            {/* الصورة - على اليمين */}
            <motion.div 
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-[60px] sm:rounded-[80px] md:rounded-[100px] lg:rounded-[120px]">
                <div className="overflow-hidden rounded-[70px] sm:rounded-[90px] md:rounded-[110px] lg:rounded-[150px]">
                  <img
                    src={vision}
                    alt="vision"
                    className="w-full h-[250px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* القسم الثالث: الصورة على الشمال والكلام على اليمين (زي الأول) */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* الصورة - على الشمال */}
            <motion.div 
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
               className={cn(
    "order-2 md:order-1",  // موبايل: order-2 (تحت)، ديسكتوب: order-1 (فوق)
    "w-full"
  )}
            >
              <div className="relative overflow-hidden rounded-[60px] sm:rounded-[80px] md:rounded-[100px] lg:rounded-[120px]">
                <div className="overflow-hidden rounded-[70px] sm:rounded-[90px] md:rounded-[110px] lg:rounded-[150px]">
                  <img
                    src={mission}
                    alt="mission"
                    className="w-full h-[250px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* النص - على اليمين */}
            <motion.div 
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
    `${isDark ? 'text-gray-200' : 'text-gray-800'} ${isRTL ? 'text-right' : 'text-left'}`,
    "order-1 md:order-2",  // موبايل: order-1 (فوق)، ديسكتوب: order-2 (تحت)
    "w-full"
  )}
              
            >
              <div className="flex items-center justify-center lg:justify-end gap-2 sm:gap-3 mb-4 sm:mb-6">
                <img
                  src={missionicon}
                  alt="mission icon"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-full"
                  loading="lazy"
                />
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-relaxed ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {t.about.mission}
                </h2>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-full lg:ml-auto`}>
                {t.about.missionDesc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* القسم الرابع: الكلام على الشمال والصورة على اليمين (عكس الأول) */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* النص - على الشمال */}
            <motion.div 
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                <img
                  src={missionicon}
                  alt="goals icon"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover rounded-full"
                  loading="lazy"
                />
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-relaxed ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {t.about.goals}
                </h2>
              </div>
              <ul className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed sm:leading-loose text-sm sm:text-base md:text-lg space-y-2 sm:space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                {t.about.goalsList?.map((goal, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-[#c9a03d] mt-1 text-sm sm:text-base">✓</span>
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* الصورة - على اليمين */}
            <motion.div 
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-[60px] sm:rounded-[80px] md:rounded-[100px] lg:rounded-[120px]">
                <div className="overflow-hidden rounded-[70px] sm:rounded-[90px] md:rounded-[110px] lg:rounded-[150px]">
                  <img
                    src={goal}
                    alt="goals"
                    className="w-full h-[250px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section Header */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[700px]">
        <img
          src={endsection}
          alt="Values"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex items-center justify-start h-full px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[120px] font-bold text-white"
          >
            {t.about?.values || "قيمنا"}
          </motion.h1>
        </div>
      </section>

      <ValuesSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default About;