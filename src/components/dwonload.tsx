import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Download, FileText, CheckCircle, Shield, Zap, ArrowRight, ExternalLink } from "lucide-react";

const DownloadSection = () => {
  const { t, lang } = useLanguage();
  const { isDark } = useTheme();
  const isRTL = lang === "ar";
  const [isDownloading, setIsDownloading] = useState(false);

  // رابط Google Drive (استبدله برابطك)
  const driveLink = "https://drive.google.com/file/d/19DWru85m_WtAfLFfuxLdjo2FQDXwnDVp/view";

  // دالة فتح الرابط
  const handleOpenDrive = () => {
    setIsDownloading(true);
    
    // فتح الرابط في تبويب جديد
    window.open(driveLink, "_blank", "noopener,noreferrer");
    
    // إعادة تعيين حالة التحميل بعد ثانية
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  // بيانات المميزات
  const features = [
    {
      icon: CheckCircle,
      title: t.download.features.quality,
      color: "#10b981"
    },
    {
      icon: Shield,
      title: t.download.features.secure,
      color: "#3b82f6"
    },
    {
      icon: Zap,
      title: t.download.features.free,
      color: "#f59e0b"
    }
  ];

  return (
    <section className={`py-20 md:py-28 transition-all duration-500 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* الجانب الأيمن - المحتوى النصي */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-start"
          >
            {/* الشارة الصغيرة */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              isDark ? 'bg-[#c9a03d]/20' : 'bg-[#c9a03d]/10'
            }`}>
              <FileText className="w-4 h-4 text-[#c9a03d]" />
              <span className="text-sm font-medium text-[#c9a03d]">
                {isRTL ? "ملف تعريف الشركة" : "Company Profile"}
              </span>
            </div>

            {/* العنوان */}
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {t.download.title}
            </h2>
            
            {/* العنوان الفرعي */}
            <p className={`text-lg md:text-xl mb-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t.download.subtitle}
            </p>
            
            {/* الوصف */}
            <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t.download.desc}
            </p>

            {/* معلومات الملف */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-8 ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <FileText className="w-5 h-5 text-[#c9a03d]" />
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t.download.fileInfo}
              </span>
            </div>

            {/* قائمة المميزات */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-sm`}
                >
                  <feature.icon className="w-4 h-4" style={{ color: feature.color }} />
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* زر فتح الرابط على Drive */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenDrive}
              disabled={isDownloading}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-[#c9a03d] hover:bg-[#b88d2e] text-gray-900' 
                  : 'bg-gray-800 hover:bg-gray-900 text-white'
              } ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isRTL ? "جاري التحويل..." : "Redirecting..."}</span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-5 h-5" />
                  <span>{isRTL ? "عرض الملف على Drive" : "View on Drive"}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* الجانب الأيسر - صورة أو أيقونة كبيرة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center"
          >
            <a 
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <div className={`relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                isDark ? 'bg-gradient-to-br from-[#c9a03d]/20 to-transparent' : 'bg-gradient-to-br from-[#c9a03d]/10 to-transparent'
              }`}>
                {/* الدائرة الخارجية */}
                <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-[#c9a03d]/30 animate-spin-slow"></div>
                
                {/* الدائرة الداخلية */}
                <div className={`w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-2xl flex items-center justify-center ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-2xl`}>
                  <FileText className="w-24 h-24 md:w-32 md:h-32 text-[#c9a03d]" />
                </div>
                
                {/* جزيئات متحركة */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#c9a03d]/20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#c9a03d]/10 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-[#c9a03d]/30 animate-bounce"></div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* أضف الـ CSS الإضافي */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default DownloadSection;