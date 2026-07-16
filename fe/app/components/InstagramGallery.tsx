"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { instagramPosts } from "@/app/lib/data";
import AnimatedSection from "./ui/AnimatedSection";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5.5 h-5.5 fill-current ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function InstagramGallery() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <AnimatedSection direction="up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-3 block">
              Editorial Showcase
            </span>
            <h2 className="text-3xl sm:text-[42px] lg:text-[48px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              Shop the Gallery
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              Tag <span className="font-semibold text-gray-900">@AURUM</span> in your posts to be featured in our curated lifestyle feed.
            </p>
          </AnimatedSection>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {instagramPosts.map((post, idx) => (
            <AnimatedSection
              key={post.id}
              direction="up"
              delay={idx * 0.05}
              className="group aspect-square relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm cursor-pointer"
            >
              {/* Image */}
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={post.image}
                  alt="Curated Instagram showcase"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
              </motion.div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none">
                <InstagramIcon className="mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="flex items-center gap-1 text-xs font-bold transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <Heart size={12} className="fill-white" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
