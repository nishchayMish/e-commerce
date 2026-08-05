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
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection direction="up">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
                  We&apos;d love to hear from you
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md">
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
