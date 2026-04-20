import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 start-6 z-50 flex flex-col gap-3">
      <a
        href="tel:00966500325298"
        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform"
      >
        <Phone size={20} />
      </a>
      <a
        href="https://wa.me/966500325298"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle size={20} />
      </a>
    </div>
  );
};

export default FloatingButtons;
