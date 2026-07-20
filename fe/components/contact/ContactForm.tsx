"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedSection from "@/components/ui/AnimatedSection";

const inputClass =
  "w-full bg-gray-50 border border-gray-200 hover:border-gray-300 focus:border-indigo-600 focus:bg-white rounded-xl px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Client-side submit UX — wire to API when ready
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSubmitted(true);
    toast.success("Message sent successfully");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <AnimatedSection direction="up">
      <div className="bg-white rounded-[1.75rem] border border-gray-100 p-7 sm:p-9 lg:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.01),0_16px_40px_rgba(0,0,0,0.04)]">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-1.5">
          Send a message
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Fill out the form and we&apos;ll get back within one business day.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center"
          >
            <CheckCircle2 className="text-emerald-500" size={28} />
            <div>
              <h3 className="font-bold text-emerald-900 text-sm sm:text-base">
                Message received
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700/90 mt-1.5 max-w-xs mx-auto leading-relaxed">
                Thank you for reaching out. Our team will reply shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 text-sm font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-2 cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-gray-700 mb-2"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  className={inputClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="alex@email.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-semibold text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us a little more..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto mt-2 bg-gray-900 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              {sending ? "Sending..." : "Send Message"}
              {!sending && (
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              )}
            </motion.button>
          </form>
        )}
      </div>
    </AnimatedSection>
  );
}
