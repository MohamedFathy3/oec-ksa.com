import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaSnapchat } from "react-icons/fa";
import logo from "@/assets/logo.png";
import barkcodeImage from "@/assets/barkcode.png";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { lang, dir } = useLanguage();
  const isRTL = dir === "rtl";

  const quickLinks = [
    { to: "/", label: lang === 'ar' ? "الرئيسية" : "Home" },
    { to: "/about", label: lang === 'ar' ? "من نحن" : "About Us" },
    { to: "/services", label: lang === 'ar' ? "خدماتنا" : "Services" },
    { to: "/projects", label: lang === 'ar' ? "مشاريعنا" : "Projects" },
    { to: "/contact", label: lang === 'ar' ? "تواصل معنا" : "Contact Us" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/osusaletqan/?locale=ar_AR" },
    { icon: FaTwitter, href: "https://twitter.com" },
    { icon: FaLinkedin, href: "https://linkedin.com" },
    { icon: FaYoutube, href: "https://www.youtube.com/@osusaletqan" },
    { icon: FaInstagram, href: "https://www.instagram.com/oecaletqan/" },
    { icon: FaSnapchat, href: "https://www.snapchat.com/@oecaletqan" },
  ];

  return (
    <footer className="bg-black text-gray-300 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الأعمدة المتجاوبة - كل شيء في المنتصف */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          
          {/* العمود الأول: اللوجو والشعار */}
          <div className="text-center">
            <div className="flex flex-col items-center mb-4">
              <img 
                src={logo} 
                alt="logo" 
                className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-cover"
                loading="lazy"
              />
            </div>
            
            {/* النص بالجرادينت الذهبي */}
            <div className="mt-4">
          
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="text-center">
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 pb-2 border-b-2 border-[#F5C542] inline-block">
              {lang === 'ar' ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-[#F5C542] transition-colors duration-300 text-sm sm:text-base block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: بيانات التواصل */}
          <div className="text-center">
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 pb-2 border-b-2 border-[#F5C542] inline-block">
              {lang === 'ar' ? "بيانات التواصل" : "Contact Info"}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              
              {/* العنوان */}
              <div className="flex gap-3 justify-center">
                <MapPin className="text-[#F5C542] mt-1 shrink-0" size={18} />
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-center max-w-[250px]">
                  {lang === 'ar' 
                    ? "مركز ميليباري، مبنى ب، الدور الرابع، مكتب رقم 13، شارع صاري، جدة، المملكة العربية السعودية"
                    : "Millibari Center, Building B, 4th Floor, Office No. 13, Sari Street, Jeddah, Saudi Arabia"}
                </p>
              </div>
              
              {/* رقم الهاتف */}
              <div className="flex gap-3 items-center justify-center">
                <Phone className="text-[#F5C542] shrink-0" size={18} />
                <a 
                  href="tel:+966500325298" 
                  className="text-gray-400 hover:text-[#F5C542] transition-colors duration-300 text-sm sm:text-base"
                  dir="ltr"
                >
                  +966 50 032 5298
                </a>
              </div>
              
              {/* البريد الإلكتروني */}
              <div className="flex gap-3 items-center justify-center">
                <Mail className="text-[#F5C542] shrink-0" size={18} />
                <a 
                  href="mailto:info@oec-ksa.com" 
                  className="text-gray-400 hover:text-[#F5C542] transition-colors duration-300 text-sm sm:text-base break-all"
                >
                  info@oec-ksa.com
                </a>
              </div>

              {/* الموقع الإلكتروني */}
              <div className="flex gap-3 items-center justify-center">
                <Globe className="text-[#F5C542] shrink-0" size={18} />
                <a 
                  href="https://www.oec-ksa.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#F5C542] transition-colors duration-300 text-sm sm:text-base break-all"
                >
                  www.oec-ksa.com
                </a>
              </div>
            </div>

            {/* أيقونات السوشيال ميديا */}
            <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8 justify-center">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#F5C542] hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label={`Social media link ${idx + 1}`}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* العمود الرابع: الباركود */}
          <div className="text-center">
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 pb-2 border-b-2 border-[#F5C542] inline-block">
              {lang === 'ar' ? "تابعنا" : "Follow Us"}
            </h3>
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-xl inline-block">
                <img 
                  src={barkcodeImage} 
                  alt="Barcode" 
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-3">
              {lang === 'ar' ? 'امسح الرمز لمتابعتنا' : 'Scan the code to follow us'}
            </p>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="text-center pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-800">
          <p className="text-gray-500 text-[10px] sm:text-xs">
            © {new Date().getFullYear()} {lang === 'ar' ? 'شركة أسس الإتقان للاستشارات الهندسية' : 'Ousos Al-Itqan Engineering Consultancy Company'} - 
            {lang === 'ar' ? ' جميع الحقوق محفوظة' : ' All Rights Reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;