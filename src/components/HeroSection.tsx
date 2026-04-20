import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// رابط الفيديو الجديد من API
const heroVideoUrl = "https://api.wsa-network.com/storage/media/files/0419-1-9ea94d74-1770-48f5-81ee-c8768d4ddbf8.mp4";

const HeroSection = () => {
  const { t } = useLanguage();
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-screen sm:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* فيديو الخلفية مع تحسين الأداء */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://via.placeholder.com/1920x1080?text=Loading..."
          onError={() => setVideoError(true)}
        >
          <source src={heroVideoUrl} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
      ) : (
        /* خلفية احتياطية في حالة فشل تحميل الفيديو */
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
      )}
      
      {/* طبقة التعتيم المحسنة */}
      <div className="absolute inset-0 bg-black/50 md:bg-[hsl(var(--hero-overlay)/0.55)]" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-0">
        {/* المحتوى الأساسي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* عنوان رئيسي متجاوب جداً */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
            {t.hero.title}
            <br className="hidden sm:block" />
          </h1>
          
          {/* وصف قصير (اختياري - أضفه في ملف اللغة) */}
         
          
          {/* زر CTA متجاوب */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/about"
              className="inline-block mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white text-white rounded-full text-sm sm:text-base font-semibold hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-105 transform"
            >
              {t.hero.cta}
            </Link>
          </motion.div>
        </motion.div>

        {/* بطاقات التواصل - محسنة ومتجاوبة جداً */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 mb-5 sm:mt-16 md:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
       
          
       
          
        
        </motion.div>

        {/* مؤشر التمرير للأسفل (اختياري - يظهر فقط على الشاشات الكبيرة) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden mt-10 md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs mt-10">مرر للأسفل</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;