import { useState, useEffect } from "react";
import Marquee from "react-marquee-slider";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/i18n/LanguageContext";

import dgc from "@/assets/skider/dgc.png";
import gm from "@/assets/skider/gm[.png";
import hgynt from "@/assets/skider/hgynt].png";
import hlhkk from "@/assets/skider/hlhkk.png";
import sda from "@/assets/skider/sda.png";
import vthu from "@/assets/skider/vthu.png";

const About = () => {
  const { isDark } = useTheme();
  const { dir } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  const partners = [
    { id: 1, name: "DGC", image: dgc },
    { id: 2, name: "GM", image: gm },
    { id: 3, name: "HGYNT", image: hgynt },
    { id: 4, name: "HLHKK", image: hlhkk },
    { id: 5, name: "SDA", image: sda },
    { id: 6, name: "VTHU", image: vthu },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="py-12"></div>;
  }

  return (
    <div className="relative py-12 w-full overflow-hidden" dir={dir}>
      <Marquee
        velocity={30}
        direction={dir === "rtl" ? "rtl" : "ltr"}
        resetAfterTries={200}
        scatterRandomly={false}
        onInit={() => {}}
        onFinish={() => {}}
      >
        {partners.map((p, index) => (
          <div key={index} className="marquee-item">
            <img
              src={p.image}
              alt={p.name}
              className="marquee-image"
              loading="lazy"
            />
          </div>
        ))}
      </Marquee>

      <style jsx>{`
        .marquee-item {
          padding: 0 40px;
          display: inline-block;
        }
        
        .marquee-image {
          height: 70px;
          padding: 10px;
          border-radius: 10px;
          transition: all 0.3s ease;
          object-fit: contain;
          width: auto;
          filter: grayscale(0.1);
        }
        
        .marquee-image:hover {
          transform: scale(1.05);
          filter: grayscale(0);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        :global(.dark) .marquee-image {
          background: #1f2937;
          filter: brightness(0.9);
        }
        
        :global(.dark) .marquee-image:hover {
          filter: brightness(1);
          background: #374151;
        }
        
        @media (max-width: 768px) {
          .marquee-item {
            padding: 0 20px;
          }
          .marquee-image {
            height: 50px;
            padding: 8px;
          }
        }
        
        @media (min-width: 1280px) {
          .marquee-image {
            height: 90px;
            padding: 12px;
          }
          .marquee-item {
            padding: 0 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;