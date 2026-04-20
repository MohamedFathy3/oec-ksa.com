import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";

import Projects from "./pages/Projects.tsx";
import Services from "./pages/Services.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Designproject from "./pages/designproject.tsx";
import Planeproject from "./pages/planeproject.tsx";
import Service from "./pages/service.tsx";
import Designprivet from "./pages/designprivet.tsx";
import Manageproject from "./pages/manageproject.tsx";
import Seperserivece from "./pages/seiperservice.tsx";
import EngineeringConsulting from "./pages/EngineeringConsulting.tsx";
import WafiOffPlanSales from "./pages/Wafi-Off-PlanSales.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />

           
              <Route path="/designproject" element={<Designproject />} />
              <Route path="/Plane" element={<Planeproject />} />
              <Route path="/Service" element={<Service />} />
              <Route path="/Designprivet" element={<Designprivet   />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/manageproject" element={<Manageproject />} />
              <Route path="/seiperserivece" element={<Seperserivece />} />
              <Route path="/EngineeringConsulting" element={<EngineeringConsulting />} />
              <Route path="/EngineeringConsulting" element={<EngineeringConsulting />} />
              <Route path="/Wafi-Off-PlanSales" element={<WafiOffPlanSales />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
