"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedSection from "./ui/AnimatedSection";

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
    <section className="py-24 sm:py-32 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <AnimatedSection direction="up">
          <div className="relative rounded-[2rem] bg-white border border-gray-100 p-8 sm:p-12 lg:p-20 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden text-center max-w-4xl mx-auto">
            
            {/* Background design elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-200 rounded-full blur-[80px]" />
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-300 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-xl mx-auto flex flex-col items-center">
              
              {/* Mail Icon */}
              <div className="w-12 h-12 rounded-2xl bg-indigo-55/10 border border-indigo-100/50 flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
                <Mail size={20} strokeWidth={1.5} />
              </div>

              <h2 className="text-3xl sm:text-[42px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
                Subscribe to Our Newsletter
              </h2>
              
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-10">
                Join our premium community to receive early access to new arrivals, curated editorials, and exclusive events.
              </p>

              {/* Form / Success message */}
              <div className="w-full">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-6"
                  >
                    <CheckCircle2 className="text-emerald-500" size={24} />
                    <div className="text-center">
                      <h4 className="font-bold text-emerald-900 text-sm sm:text-base">Subscription Confirmed</h4>
                      <p className="text-xs sm:text-sm text-emerald-700/95 mt-1">Thank you. You have been added to our premier database.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="bg-gray-900 hover:bg-indigo-600 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group shrink-0 cursor-pointer"
                    >
                      Subscribe
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </motion.button>
                  </form>
                )}
              </div>

              {/* Notice */}
              <p className="text-[11px] text-gray-400 mt-5 leading-relaxed">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
              </p>

            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
