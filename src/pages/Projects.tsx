import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Fuel, Coffee, Building2, Home, PaintRoller, Building } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import project1 from "@/assets/project/1.jpg";
import project2 from "@/assets/project/2.jpg";
import project3 from "@/assets/project/3.jpg";
import project4 from "@/assets/project/4.jpg";
import project5 from "@/assets/project/5.jpg";
import project6 from "@/assets/project/6.jpg";
import project7 from "@/assets/project/7.jpg";
import project8 from "@/assets/project/8.jpg";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

const projectImages = [project1, project2, project3, project4, project5, project6, project7, project8];

const projectIcons = [Fuel, Coffee, Building2, Home, Home, PaintRoller, PaintRoller, Building];

const ProjectsPreview = () => {
  const { dir, lang } = useLanguage();
  const { isDark } = useTheme();
  const isRTL = dir === "rtl";
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  // مراقبة حجم الشاشة
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // بيانات المشاريع
  const projectsData = [
    {
      id: 1,
      title: { ar: "محطة بنزين", en: "GAS STATION" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project1,
      description: { 
        ar: "محطة وقود متكاملة الخدمات تضم محلات تجارية ومناطق خدمية.",
        en: "Full-service gas station with commercial shops and service areas."
      },
      features: {
        ar: ["محطات وقود حديثة", "متجر صغير", "منطقة خدمة سيارات"],
        en: ["Modern fuel pumps", "Convenience store", "Car service area"]
      }
    },
    {
      id: 2,
      title: { ar: "مقهى", en: "CAFE" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project2,
      description: { 
        ar: "مقهى عصري بتصميم داخلي مميز وجلسات داخلية وخارجية.",
        en: "Modern cafe with distinctive interior design and indoor & outdoor seating."
      },
      features: {
        ar: ["جلسات داخلية", "جلسات خارجية", "تصميم عصري", "واي فاي مجاني"],
        en: ["Indoor seating", "Outdoor seating", "Modern design", "Free Wi-Fi"]
      }
    },
    {
      id: 3,
      title: { ar: "المركز الترفيهي", en: "ENTERTAINMENT CENTER" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project3,
      description: { 
        ar: "مركز ترفيهي متكامل يضم مناطق ألعاب ومناسبات عائلية.",
        en: "Integrated entertainment center with gaming areas and family events."
      },
      features: {
        ar: ["منطقة ألعاب", "قاعة مناسبات", "مطاعم وكافيهات", "منطقة أطفال"],
        en: ["Gaming area", "Events hall", "Restaurants & cafes", "Kids area"]
      }
    },
    {
      id: 4,
      title: { ar: "فيلا سكنية", en: "RESIDENTIAL VILLA" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project4,
      description: { 
        ar: "فيلا سكنية فاخرة بتصميم عصري ومساحات واسعة.",
        en: "Luxury residential villa with modern design and spacious areas."
      },
      features: {
        ar: ["4 غرف نوم", "حديقة خاصة", "مسبح", "موقف سيارات"],
        en: ["4 bedrooms", "Private garden", "Swimming pool", "Parking"]
      }
    },
    {
      id: 5,
      title: { ar: "فيلا سكنية", en: "RESIDENTIAL VILLA" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project5,
      description: { 
        ar: "فيلا سكنية كلاسيكية بتصميم أنيق ومساحات داخلية مريحة.",
        en: "Classic residential villa with elegant design and comfortable interiors."
      },
      features: {
        ar: ["5 غرف نوم", "صالة كبيرة", "مطبخ مجهز", "حديقة واسعة"],
        en: ["5 bedrooms", "Large hall", "Equipped kitchen", "Spacious garden"]
      }
    },
    {
      id: 6,
      title: { ar: "تصميم داخلي", en: "INTERIOR DESIGN" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project6,
      description: { 
        ar: "تصميم داخلي عصري لمكاتب إدارية بأحدث الأساليب.",
        en: "Modern interior design for administrative offices with latest styles."
      },
      features: {
        ar: ["تصميم عصري", "إضاءة حديثة", "أثاث مريح", "مساحات عملية"],
        en: ["Modern design", "Contemporary lighting", "Comfortable furniture", "Practical spaces"]
      }
    },
    {
      id: 7,
      title: { ar: "تصميم داخلي", en: "INTERIOR DESIGN" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project7,
      description: { 
        ar: "تصميم داخلي فاخر لمنازل سكنية بأسلوب كلاسيكي حديث.",
        en: "Luxury interior design for residential homes in a modern classic style."
      },
      features: {
        ar: ["تصميم فاخر", "ألوان راقية", "تشطيبات ممتازة", "توزيع مثالي"],
        en: ["Luxury design", "Elegant colors", "Excellent finishes", "Ideal distribution"]
      }
    },
    {
      id: 8,
      title: { ar: "مجمع عمراني", en: "URBAN COMPLEX" },
      location: { ar: "مدينة جدة", en: "JEDDAH CITY" },
      image: project8,
      description: { 
        ar: "مجمع عمراني متكامل يضم وحدات سكنية وتجارية وترفيهية.",
        en: "Integrated urban complex comprising residential, commercial and entertainment units."
      },
      features: {
        ar: ["وحدات سكنية", "محلات تجارية", "مناطق خضراء", "خدمات متكاملة"],
        en: ["Residential units", "Commercial shops", "Green areas", "Integrated services"]
      }
    }
  ];

  const totalItems = projectsData.length;

  // دالة التنقل التالي
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
    setShowDetails(false);
  }, [totalItems]);

  // دالة التنقل السابق
  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setShowDetails(false);
  }, [totalItems]);

  // تشغيل الحركة التلقائية
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying && !isDragging) {
        nextSlide();
      }
    }, 5000);
  }, [isAutoPlaying, isDragging, nextSlide]);

  // إيقاف الحركة التلقائية
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // إعادة تشغيل الحركة التلقائية
  const resetAutoPlay = useCallback(() => {
    if (isAutoPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  }, [isAutoPlaying, stopAutoPlay, startAutoPlay]);

  // بدء الحركة التلقائية عند تحميل المكون
  useEffect(() => {
    if (totalItems > 0 && isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [totalItems, isAutoPlaying, startAutoPlay, stopAutoPlay]);

  // دالة للتنقل لصفحة المشروع
  const handleCardClick = (projectId) => {
    stopAutoPlay();
    navigate(`/projects/${projectId}`);
    resetAutoPlay();
  };

  // التعامل مع السهمين
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

  // عند الضغط على الكارد
  const handleCardToggle = (idx, isActive) => {
    stopAutoPlay();
    if (isActive) {
      setShowDetails(!showDetails);
    } else {
      setActiveIndex(idx);
      setShowDetails(false);
    }
    resetAutoPlay();
  };

  // التنقل بالماوس
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    stopAutoPlay();
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
    resetAutoPlay();
  };

  // دالة حساب مواقع العناصر - تكبير خارق للكارد
const getItemStyle = (index) => {
  let position = index - activeIndex;
  
  if (position > totalItems / 2) position -= totalItems;
  if (position < -totalItems / 2) position += totalItems;
  
  const angle = position * (360 / totalItems);
  
  let radius = 320;
  if (windowWidth < 640) radius = 200;
  else if (windowWidth < 768) radius = 250;
  else if (windowWidth < 1024) radius = 300;
  else radius = 350;
  
  const radian = (angle * Math.PI) / 180;
  
  let x = Math.sin(radian) * radius;
  let z = Math.cos(radian) * radius;
  
  // نفس الحجم ونفس الخصائص لكل الكاردات
  return {
    transform: `translateX(${x}px) translateZ(${z}px) scale(1) translateY(0px)`,
    opacity: 1,
    filter: "blur(0px) brightness(1)",
    zIndex: position === 0 ? 50 : 20,
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  };
};
  // التحكم في لوحة المفاتيح
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

  const getText = (item, field) => {
    if (typeof item[field] === 'object') {
      return item[field][lang] || item[field].en;
    }
    return item[field];
  };

  return (
    <>  
    
    <Navbar/>
    <HeroSection/>
    
    <section className={`py-12 mt-10 sm:py-16 md:py-20 transition-all duration-500 overflow-hidden ${
      isDark 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
          style={{ marginBottom: "200px" }}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 transition-all duration-500 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {lang === 'ar' ? 'تعرف على مشاريعنا' : 'GET TO KNOW OUR PROJECTS'}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#c9a03d] mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[600px] sm:min-h-[750px] md:min-h-[900px] lg:min-h-[1000px]"
          style={{ perspective: windowWidth < 640 ? "800px" : "1200px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className="relative w-full h-[550px] sm:h-[680px] md:h-[800px] lg:h-[900px] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {projectsData.map((project, idx) => {
              const Icon = projectIcons[idx % projectIcons.length];
              const isActive = idx === activeIndex;
              const style = getItemStyle(idx);
              
              return (
                <motion.div
                  key={idx}
                  className="absolute cursor-pointer"
                  style={style}
                  onClick={() => handleCardToggle(idx, isActive)}
                >
                  <div className={`
                    relative w-[150px] sm:w-[250px] md:w-[250px] lg:w-[450px] rounded-2xl overflow-hidden
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
                    {/* الصورة - ارتفاع عملاق */}
                    <div className="relative h-[150px] sm:h-[320px] md:h-[100px] lg:h-[280px] overflow-hidden">
                      <img
                        src={project.image}
                        alt={getText(project, 'title')}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isDark 
                          ? 'from-black/80 via-black/30 to-transparent'
                          : 'from-black/60 via-black/20 to-transparent'
                      }`} />

                  
                    </div>

                    {/* المحتوى - padding كبير */}
                    <div className={`p-5 sm:p-6 md:p-7 transition-all duration-500 ${
                      isActive && showDetails 
                        ? (isDark ? 'bg-gray-800' : 'bg-white')
                        : ''
                    }`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3 sm:mb-4">
                        <h3 className={`font-bold transition-all duration-500
                          ${isActive 
                            ? `text-xl sm:text-2xl md:text-3xl ${isDark ? 'text-[#c9a03d]' : 'text-gray-800'}` 
                            : `text-lg sm:text-xl md:text-2xl ${isDark ? 'text-gray-200' : 'text-gray-700'}`
                          }`}
                        >
                          {getText(project, 'title')}
                        </h3>
                        <div className="flex items-center gap-1 text-sm sm:text-base shrink-0">
                          <MapPin size={windowWidth < 640 ? 14 : 16} className="text-[#c9a03d]" />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {getText(project, 'location')}
                          </span>
                        </div>
                      </div>
                      
                      {/* التفاصيل - تظهر للعنصر النشط */}
                      <AnimatePresence>
                        {(isActive && showDetails) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 20 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 20 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <p className={`text-sm sm:text-base md:text-lg leading-relaxed mt-2 sm:mt-3 ${
                              isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {getText(project, 'description')}
                            </p>
                            
                            {/* Features */}
                         
                            
                            {/* زر عرض التفاصيل */}
                        
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={handlePrevSlide}
            className={`absolute left-2 sm:left-4 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full 
              transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center shadow-xl
              ${isDark 
                ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-white' 
                : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
          >
            <ChevronLeft className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={handleNextSlide}
            className={`absolute right-2 sm:right-4 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full 
              transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center shadow-xl
              ${isDark 
                ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-white' 
                : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            aria-label={lang === 'ar' ? 'التالي' : 'Next'}
          >
            <ChevronRight className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          {/* مؤشر التشغيل التلقائي */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isAutoPlaying ? 'bg-[#c9a03d] w-4' : 'bg-white/50'}`} />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: ${isDark ? '#374151' : '#e5e7eb'};
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #c9a03d;
          border-radius: 10px;
        }
        @media (min-width: 768px) {
          .custom-scroll::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </section>


    <Footer/>
    </>
  
  );
};


export default ProjectsPreview;