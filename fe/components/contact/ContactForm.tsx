"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import AnimatedSection from "@/components/ui/AnimatedSection";

const inputClass =
  "w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5";

const textareaClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-4 focus:ring-gray-900/5";

const labelClass = "mb-1.5 block text-[13px] font-medium text-gray-600";

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
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
        <h2 className="text-base font-semibold tracking-tight text-gray-900">
          Send a message
        </h2>
        <p className="mt-1 mb-6 text-[13px] text-gray-500 leading-relaxed">
          Fill out the form and we&apos;ll get back within one business day.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-[#fafafa] p-8 text-center"
          >
            <CheckCircle2 className="text-gray-900" size={24} strokeWidth={1.75} />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Message received
              </h3>
              <p className="mx-auto mt-1.5 max-w-xs text-[13px] text-gray-500 leading-relaxed">
                Thank you for reaching out. Our team will reply shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-1 cursor-pointer text-[13px] font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className={labelClass}>
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
                <label htmlFor="email" className={labelClass}>
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
              <label htmlFor="subject" className={labelClass}>
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
              <label htmlFor="message" className={labelClass}>
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
                className={`${textareaClass} resize-none`}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={sending}
              className="group mt-2 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-5 text-[13px] font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:pointer-events-none sm:w-auto"
            >
              {sending ? "Sending..." : "Send Message"}
              {!sending && (
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              )}
            </motion.button>
          </form>
        )}
      </div>
    </AnimatedSection>
  );
}
