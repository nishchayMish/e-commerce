import { Mail, MapPin, Phone, Clock } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const details = [
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@aurum.store", "support@aurum.store"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (800) 555-0182", "Mon–Fri, 9am–6pm EST"],
  },
  {
    icon: MapPin,
    title: "Showroom",
    lines: ["128 Mercer Street", "New York, NY 10012"],
  },
  {
    icon: Clock,
    title: "Hours",
    lines: ["Weekdays 10am – 7pm", "Weekends 11am – 5pm"],
  },
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      {details.map((item, idx) => {
        const Icon = item.icon;
        return (
          <AnimatedSection
            key={item.title}
            direction="up"
            delay={idx * 0.05}
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-colors duration-300 mb-4">
              <Icon size={17} strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
            {item.lines.map((line) => (
              <p key={line} className="text-sm text-gray-500 leading-relaxed">
                {line}
              </p>
            ))}
          </AnimatedSection>
        );
      })}
    </div>
  );
}
