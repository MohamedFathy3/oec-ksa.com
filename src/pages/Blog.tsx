import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogImages = [blog1, blog2, blog3];

const Blog = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title={t.blog.pageTitle} breadcrumb={t.blog.pageTitle} />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.blog.articles.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <img src={blogImages[i]} alt={article.title} loading="lazy" className="w-full h-56 object-cover" width={800} height={600} />
                <div className="p-6">
                  <p className="text-xs text-muted-foreground mb-3">{article.date}</p>
                  <h3 className="text-lg font-bold text-foreground mb-3">{article.title}</h3>
                  <button className="text-primary text-sm font-medium hover:underline">{t.blog.readMore}</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Blog;
