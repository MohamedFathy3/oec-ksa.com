import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Ruler, FileCheck, Map, Palette, HardHat, Shield, Lightbulb, MapPin } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import service1 from "@/assets/service/service1.png";
import service2 from "@/assets/service/service2.jpg";
import service3 from "@/assets/service/service3.png";
import service4 from "@/assets/service/service4.jpg";
import service5 from "@/assets/service/service5.png";
import service6 from "@/assets/service/service6.png";
import service7 from "@/assets/service/service7.png";
import service8 from "@/assets/service/wafy.png";

const icons = [Ruler, FileCheck, Map, Palette, HardHat, Shield, Lightbulb, MapPin];
import { useNavigate } from "react-router-dom";
import { SERVICE_LINKS } from "@/constants/links";

const serviceImages = [
  service1,
  service2,
  service3,
  service4,
  service5,
  service6,
  service7,
  service8
];

const ServicesSection = () => {
  const { t, dir, lang } = useLanguage();
  const { isDark } = useTheme();
  const navigate = useNavigate(); 
  const isRTL = dir === "rtl";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true); // 🔥 حالة التشغيل التلقائي
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null); // 🔥 مرجع للـ interval

  const services = t.engineeringServices?.items || [];
  const totalItems = services.length;

  // 🔥 دالة التنقل التالي
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
    setShowDetails(false);
  }, [totalItems]);

  // 🔥 دالة التنقل السابق
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setShowDetails(false);
  }, [totalItems]);

  // 🔥 تشغيل الحركة التلقائية
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying && !isDragging) {
        nextSlide();
      }
    }, 3000); // يتغير كل 3 ثواني
  }, [isAutoPlaying, isDragging, nextSlide]);

  // 🔥 إيقاف الحركة التلقائية مؤقتاً
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // 🔥 إعادة تشغيل الحركة التلقائية بعد التفاعل
  const resetAutoPlay = useCallback(() => {
    if (isAutoPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  }, [isAutoPlaying, stopAutoPlay, startAutoPlay]);

  // 🔥 بدء الحركة التلقائية عند تحميل المكون
  useEffect(() => {
    if (totalItems > 0 && isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [totalItems, isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // مراقبة حجم الشاشة
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigateToService = (index) => {
    if (SERVICE_LINKS[index]) {
      stopAutoPlay(); // 🔥 إيقاف التشغيل التلقائي عند الضغط
      navigate(SERVICE_LINKS[index]);
    }
  };

  // 🔥 التعامل مع السهمين مع إعادة تشغيل التلقائي
  const handleNextSlide = () => {
    stopAutoPlay();
    nextSlide();
    resetAutoPlay();
  };

  const handlePrevSlide = () => {
    stopAutoPlay();
    prevSlide();
    resetAutoPlay();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    stopAutoPlay(); // 🔥 إيقاف التشغيل التلقائي عند السحب
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    resetAutoPlay(); // 🔥 إعادة التشغيل بعد السحب
  };

  // 🔥 عند الضغط على الكارد
  const handleCardClick = (idx, isActive) => {
    stopAutoPlay();
    if (isActive) {
      setShowDetails(!showDetails);
    } else {
      setActiveIndex(idx);
      setShowDetails(false);
    }
    resetAutoPlay();
  };

  // حساب المواقع بشكل متجاوب حسب حجم الشاشة
  const getItemStyle = (index) => {
    let position = index - activeIndex;
    
    if (position > totalItems / 2) position -= totalItems;
    if (position < -totalItems / 2) position += totalItems;
    
    const angle = position * (360 / totalItems);
    
    let radius = 280;
    if (windowWidth < 640) radius = 180;
    else if (windowWidth < 768) radius = 220;
    else if (windowWidth < 1024) radius = 250;
    else radius = 300;
    
    const radian = (angle * Math.PI) / 180;
    
    let x = Math.sin(radian) * radius;
    let z = Math.cos(radian) * radius;
    
    const isActive = position === 0;
    
    let scale = 1;
    let opacity = 0.7;
    let translateY = 0;
    let blur = "0px";
    let zIndex = 10;
    let brightness = "1";
    
    if (isActive) {
      scale = windowWidth < 640 ? 1.2 : windowWidth < 768 ? 1.3 : 1.4;
      opacity = 1;
      translateY = windowWidth < 640 ? -20 : -40;
      blur = "0px";
      zIndex = 50;
      brightness = "1";
    } else if (Math.abs(position) === 1) {
      scale = windowWidth < 640 ? 0.9 : 1.05;
      opacity = windowWidth < 640 ? 0.8 : 0.9;
      translateY = windowWidth < 640 ? -5 : -10;
      blur = "0px";
      zIndex = 20;
      brightness = windowWidth < 640 ? "0.7" : "0.8";
    } else if (Math.abs(position) === 2) {
      scale = windowWidth < 640 ? 0.7 : 0.85;
      opacity = windowWidth < 640 ? 0.5 : 0.6;
      translateY = 0;
      blur = windowWidth < 640 ? "1px" : "2px";
      zIndex = 5;
      brightness = windowWidth < 640 ? "0.5" : "0.6";
    } else {
      scale = windowWidth < 640 ? 0.5 : 0.7;
      opacity = windowWidth < 640 ? 0.2 : 0.3;
      translateY = 0;
      blur = windowWidth < 640 ? "3px" : "4px";
      zIndex = 1;
      brightness = windowWidth < 640 ? "0.3" : "0.4";
    }
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale}) translateY(${translateY}px)`,
      opacity: opacity,
      filter: `blur(${blur}) brightness(${brightness})`,
      zIndex: zIndex,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
    };
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.direction = isRTL ? "rtl" : "ltr";
    }
  }, [isRTL]);

  // عرض مؤشرات التحميل إذا لم تكن هناك خدمات
  if (!services.length) {
    return (
      <section className={`py-20 min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a03d] mx-auto mb-4"></div>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>جاري التحميل...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 md:py-20 min-h-screen transition-all duration-500 overflow-hidden ${
      isDark 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان المتجاوب */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-r from-[#c9a03d] to-[#e6b84e] bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent'
          }`}>
            {t.services?.title || "خدماتنا"}
          </h2>
          <p className={`text-sm mt-5 mb-11 sm:text-base md:text-lg max-w-2xl mx-auto px-4 transition-all duration-500 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {lang === 'ar' 
              ? 'استكشف خدماتنا المتميزة - اختر الخدمة المناسبة لك'
              : 'Explore our premium services - Choose the right service for you'}
          </p>
          <div className="w-20 sm:w-24 h-1 bg-[#c9a03d] mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </motion.div>

        {/* Carousel 3D Container */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[450px] sm:min-h-[550px] md:min-h-[650px]"
          style={{ perspective: windowWidth < 640 ? "800px" : "1200px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseEnter={stopAutoPlay} // 🔥 إيقاف التشغيل عند دخول الماوس
          onMouseLeave={resetAutoPlay} // 🔥 إعادة التشغيل عند خروج الماوس
        >
          <div 
            className="relative w-full h-[400px] sm:h-[480px] md:h-[550px] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {services.map((service, idx) => {
              const Icon = icons[idx % icons.length];
              const isActive = idx === activeIndex;
              const style = getItemStyle(idx);
              
              return (
                <motion.div
                  key={idx}
                  className="absolute cursor-pointer"
                  style={style}
                  onClick={() => handleCardClick(idx, isActive)}
                  whileHover={!isActive && windowWidth > 640 ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
                >
                  <div className={`
                    relative w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] rounded-2xl overflow-hidden
                    transition-all duration-500 shadow-xl
                    ${isDark 
                      ? 'bg-gray-800 shadow-gray-900/50' 
                      : 'bg-white shadow-gray-300/50'
                    }
                    ${isActive 
                      ? `ring-2 sm:ring-4 ring-[#c9a03d] shadow-[0_0_30px_rgba(201,160,61,0.4)] 
                         ${isDark ? 'shadow-[#c9a03d]/20' : 'shadow-[#c9a03d]/30'}`
                      : ''
                    }
                  `}>
                    <div className="relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] overflow-hidden">
                      <img
                        src={serviceImages[idx % serviceImages.length]}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isDark 
                          ? 'from-black/80 via-black/30 to-transparent'
                          : 'from-black/60 via-black/20 to-transparent'
                      }`} />

                      <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#c9a03d] flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300`}>
                        <Icon className="text-white" size={windowWidth < 640 ? 18 : 22} />
                      </div>
                    </div>

                    <div className={`p-3 sm:p-4 md:p-5 transition-all duration-500 ${
                      isActive && showDetails 
                        ? (isDark ? 'bg-gray-800' : 'bg-white')
                        : ''
                    }`}>
                      <h3 className={`font-bold transition-all duration-500 text-center
                        ${isActive 
                          ? `text-base sm:text-lg md:text-xl ${isDark ? 'text-[#c9a03d]' : 'text-gray-800'} mb-2 sm:mb-3` 
                          : `text-sm sm:text-base md:text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`
                        }`}
                      >
                        {service.title}
                      </h3>
                      
                      <AnimatePresence>
                        {(isActive && showDetails) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 20 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 20 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <p className={`text-xs sm:text-sm leading-relaxed mt-2 sm:mt-3 text-center ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {service.desc}
                            </p>
                            
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateToService(idx);
                              }}
                              className="mt-3 sm:mt-4 md:mt-5 w-full py-2 sm:py-2.5 rounded-lg bg-[#c9a03d] text-white font-semibold hover:bg-[#b88d2e] transition-all duration-300 shadow-lg text-xs sm:text-sm"
                            >
                              {lang === 'ar' ? 'اعرف أكثر' : 'Learn More'}
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={handlePrevSlide}
            className={`absolute left-2 sm:left-4 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full 
              transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center shadow-xl
              ${isDark 
                ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-white' 
                : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            aria-label="السابق"
          >
            <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={handleNextSlide}
            className={`absolute right-2 sm:right-4 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full 
              transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center shadow-xl
              ${isDark 
                ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-white' 
                : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            aria-label="التالي"
          >
            <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          {/* 🔥 مؤشر التشغيل التلقائي (اختياري) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isAutoPlaying ? 'bg-[#c9a03d] w-4' : 'bg-white/50'}`} />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;