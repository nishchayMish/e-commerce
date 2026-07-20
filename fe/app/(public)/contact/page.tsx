import type { Metadata } from "next";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import AnimatedSection from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact — AURUM",
  description:
    "Get in touch with the AURUM team for styling advice, order support, or showroom visits.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHeader />
      <section className="pb-20 sm:pb-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-8">
              <AnimatedSection direction="up">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                  We&apos;d love to hear from you
                </h2>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md">
                  Whether it&apos;s a product question, a return, or booking a
                  private styling session — reach us any way that suits you.
                </p>
              </AnimatedSection>
              <ContactInfo />
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
