import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageHeader from "@/components/PageHeader";
import ServicesSection from "@/components/ServicesSection";
import { useLanguage } from "@/i18n/LanguageContext";
import Hero from "@/assets/318befe74ce69087f8952bdff58ea42ab4097593.png";

const Services = () => {
  const { t } = useLanguage();

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
            className="text-[80px] md:text-[140px] font-bold text-transparent"
            style={{ WebkitTextStroke: "2px white" }}
          >
            {t.services?.title}
          </h1>
        </div>
      </section>
      <ServicesSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Services;
