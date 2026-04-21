import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import contactUsImage from "@/assets/contectus.png";

const Contact = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(lang === "ar" ? "تم إرسال رسالتك بنجاح" : "Your message has been sent successfully");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.9!2d39.1760307!3d21.5833873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d0f4d900555f%3A0x24e021da68b16a1a!2sJDBE3104%2C%203104%20Younboua%2C%209054%2C%20Al%20Faisaliyyah%2C%20Jeddah%2023442%2C%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1744640000000!5m2!1sar!2ssa";

  // بيانات معلومات التواصل بالترتيب المطلوب: تليفون، خريطة، ايميل
  const contactInfo = [
    {
      icon: Phone,
      title: lang === "ar" ? "رقم الهاتف" : "Phone",
      value: "+966 500 325 298",
      link: "tel:+966500325298",
    },
    {
      icon: MapPin,
      title: lang === "ar" ? "العنوان" : "Address",
      value: lang === "ar" 
        ? "مركز ملياري مبني (ب) الدور 4 ، مكتب رقم 13، شارع ساري، جدة. المملكة العربية السعودية"
        : "Miliari MBI Center (B), 4th Floor, Office 13, Sari Street, Jeddah, Saudi Arabia",
      link: null,
    },
    {
      icon: Mail,
      title: lang === "ar" ? "البريد الإلكتروني" : "Email",
      value: "info@oec-ksa.com",
      link: "mailto:info@oec-ksa.com",
    },
  ];

  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      <section className=" relative w-full h-[550px] md:h-[600px] overflow-hidden">
        <img
          src={contactUsImage}
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover brightness-90 "
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl mt-10 md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center"
            style={{marginTop:"120px"}}
          >
            {t.contact?.pageTitle || "تواصل معنا"}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#c9a03d] mx-auto rounded-full mb-16"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="backdrop-blur-md bg-white/10 rounded-2xl p-6 w-full md:w-56 lg:w-64 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
                >
                  {/* الأيقونة */}
                  <div className="w-16 h-16 rounded-full bg-[#c9a03d]/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-[#c9a03d]/30">
                    <Icon size={30} className="text-[#c9a03d]" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white text-center mb-3">
                    {item.title}
                  </h3>
                  
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-sm text-white/80 text-center block hover:text-[#c9a03d] transition-colors break-all"
                      dir="ltr"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/80 text-center leading-relaxed">
                      {item.value}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section الخريطة والفورم */}
      <section className="py-16 md:py-20 ">
        <div className="container mx-auto px-4">

          {/* عنوان القسم */}
          <div className="text-center mb-12">
         
            <p className="text-gray-500 dark:text-gray-400 ">
              {lang === "ar" ? "يسعدنا تواصلك معنا، سوف نقوم بالرد عليك في أقرب وقت" : "We're happy to hear from you, we'll get back to you as soon as possible"}
            </p>
          </div>

          {/* MAP + FORM جنب بعض */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* 🗺️ Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-md border dark:border-gray-700 h-full"
            >
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                className="min-h-[500px]"
                style={{ border: 0 }}
                loading="lazy"
                title="Google Map"
              />
            </motion.div>

            {/* 📩 Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border dark:border-gray-700"
            >
              <div className="text-center mb-8">
                <p className="text-sm text-[#c9a03d] mb-2">{lang === "ar" ? "أرسل رسالتك" : "Send your message"}</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {lang === "ar" ? "نحن في انتظارك" : "We're waiting for you"}
                </h3>
                <div className="w-20 h-1 bg-[#c9a03d] mx-auto mt-3"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={lang === "ar" ? "الاسم الكامل" : "Full Name"}
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c9a03d]"
                />

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c9a03d]"
                />

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={lang === "ar" ? "رقم الهاتف (اختياري)" : "Phone Number (Optional)"}
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c9a03d]"
                />

                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={lang === "ar" ? "رسالتك" : "Your Message"}
                  className="w-full px-4 py-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-[#c9a03d]"
                />

                <button className="w-full py-3 bg-[#c9a03d] hover:bg-[#b58a2e] text-white rounded-lg transition-all duration-300 font-semibold hover:scale-105">
                  {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Contact;