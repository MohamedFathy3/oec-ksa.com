import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Fuel, Coffee, Building2, Home, PaintRoller, Building } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const projectImages = [project1, project2, project3, project4, project5, project6, project7, project8];

// أيقونات مختلفة للمشاريع
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
  const containerRef = useRef(null);

  // مراقبة حجم الشاشة
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // بيانات المشاريع - title بس
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

  // التنقل بالسهمين
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
    setShowDetails(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setShowDetails(false);
  };

  // دالة للتنقل لصفحة المشروع
  const handleCardClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // التنقل بالماوس
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // حساب مواقع العناصر في الشكل الدائري 3D
  const getItemStyle = (index) => {
    let position = index - activeIndex;
    
    if (position > totalItems / 2) position -= totalItems;
    if (position < -totalItems / 2) position += totalItems;
    
    const angle = position * (360 / totalItems);
    
    let radius = 320;
    if (windowWidth < 640) radius = 180;
    else if (windowWidth < 768) radius = 220;
    else if (windowWidth < 1024) radius = 270;
    else radius = 320;
    
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
      scale = windowWidth < 640 ? 1.2 : windowWidth < 768 ? 1.3 : 1.45;
      opacity = 1;
      translateY = windowWidth < 640 ? -20 : -45;
      blur = "0px";
      zIndex = 50;
      brightness = "1";
    } else if (Math.abs(position) === 1) {
      scale = windowWidth < 640 ? 0.9 : 1.08;
      opacity = windowWidth < 640 ? 0.8 : 0.9;
      translateY = windowWidth < 640 ? -8 : -15;
      blur = "0px";
      zIndex = 20;
      brightness = windowWidth < 640 ? "0.7" : "0.8";
    } else if (Math.abs(position) === 2) {
      scale = windowWidth < 640 ? 0.7 : 0.88;
      opacity = windowWidth < 640 ? 0.5 : 0.6;
      translateY = 0;
      blur = windowWidth < 640 ? "1px" : "2px";
      zIndex = 5;
      brightness = windowWidth < 640 ? "0.5" : "0.6";
    } else {
      scale = windowWidth < 640 ? 0.5 : 0.72;
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

  // التحكم في لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
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

  // دالة للحصول على النص حسب اللغة
  const getText = (item, field) => {
    if (typeof item[field] === 'object') {
      return item[field][lang] || item[field].en;
    }
    return item[field];
  };

  return (
<>
  <Navbar />
   <HeroSection />

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
          className="text-center mb-10 sm:mb-16"
          style={{margin:"150px"}}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 transition-all duration-500 ${
            isDark
          }`}>
            {lang === 'ar' ? 'تعرف على مشاريعنا' : 'GET TO KNOW OUR PROJECTS'}
          </h2>
         
          <div className="w-20 sm:w-24 h-1 bg-[#c9a03d] mx-auto mt-4 sm:mt-6 rounded-full"></div>
        </motion.div>

        {/* Carousel 3D Container */}
        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[450px] sm:min-h-[550px] md:min-h-[650px] lg:min-h-[700px]"
          style={{ perspective: windowWidth < 640 ? "800px" : "1200px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[600px] flex items-center justify-center"
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
                 
                  whileHover={!isActive && windowWidth > 640 ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
                >
                  <div className={`
                    relative w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] rounded-2xl overflow-hidden
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
                    {/* الصورة */}
                    <div className="relative h-[160px] sm:h-[200px] md:h-[240px] lg:h-[260px] overflow-hidden">
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

                      {/* الأيقونة */}
                      <div className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#c9a03d] flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300`}>
                        <Icon className="text-white" size={windowWidth < 640 ? 18 : 22} />
                      </div>

                      {/* رقم المشروع */}
                     
                    </div>

                    {/* المحتوى - title بس من غير type */}
                    <div className={`p-3 sm:p-4 md:p-5 transition-all duration-500 ${
                      isActive && showDetails 
                        ? (isDark ? 'bg-gray-800' : 'bg-white')
                        : ''
                    }`}>
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2 sm:mb-3">
                        <h3 className={`font-bold transition-all duration-500
                          ${isActive 
                            ? `text-base sm:text-lg md:text-xl ${isDark ? 'text-[#c9a03d]' : 'text-gray-800'}` 
                            : `text-sm sm:text-base md:text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`
                          }`}
                        >
                          {getText(project, 'title')}
                        </h3>
                        <div className="flex items-center gap-1 text-[10px] sm:text-xs shrink-0">
                          <MapPin size={windowWidth < 640 ? 10 : 12} className="text-[#c9a03d]" />
                          <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                            {getText(project, 'location')}
                          </span>
                        </div>
                      </div>
                      
                   

                      {/* مؤشر للضغط */}
                      
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* أزرار التنقل */}
          <button
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 md:left-8 lg:left-10 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full 
              transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center shadow-xl
              ${isDark 
                ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-white' 
                : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
          >
            <ChevronLeft className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 md:right-8 lg:right-10 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full 
              transition-all duration-300 hover:scale-110 z-20 flex items-center justify-center shadow-xl
              ${isDark 
                ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-white' 
                : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            aria-label={lang === 'ar' ? 'التالي' : 'Next'}
          >
            <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
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
       <Footer />

</>
 
  );
};

export default ProjectsPreview;