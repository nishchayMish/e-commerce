"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#fafafa] border-b border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.04)] text-center max-w-3xl mx-auto">
            <div className="max-w-lg mx-auto flex flex-col items-center">

              {/* Mail Icon */}
              <div className="w-9 h-9 rounded-lg bg-[#fafafa] border border-gray-200 flex items-center justify-center text-gray-500 mb-4">
                <Mail size={16} strokeWidth={1.75} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
                Subscribe to Our Newsletter
              </h2>

              <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed mb-6">
                Join our premium community to receive early access to new arrivals, curated editorials, and exclusive events.
              </p>

              {/* Form / Success message */}
              <div className="w-full">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-[#fafafa] p-5"
                  >
                    <CheckCircle2 className="text-gray-900" size={18} />
                    <div className="text-center">
                      <h4 className="text-[13px] font-medium text-gray-900">Subscription Confirmed</h4>
                      <p className="text-[13px] text-gray-500 mt-0.5">Thank you. You have been added to our premier database.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5"
                    />
                    <motion.button
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                    >
                      Subscribe
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </motion.button>
                  </form>
                )}
              </div>

              {/* Notice */}
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>

            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
