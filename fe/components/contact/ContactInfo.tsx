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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {details.map((item, idx) => {
        const Icon = item.icon;
        return (
          <AnimatedSection
            key={item.title}
            direction="up"
            delay={idx * 0.05}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-[#fafafa] text-gray-500 transition-colors duration-200 group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white">
              <Icon size={16} strokeWidth={1.75} />
            </div>
            <h3 className="mb-1.5 text-sm font-medium text-gray-900">
              {item.title}
            </h3>
            {item.lines.map((line) => (
              <p key={line} className="text-[13px] text-gray-500 leading-relaxed">
                {line}
              </p>
            ))}
          </AnimatedSection>
        );
      })}
    </div>
  );
}
