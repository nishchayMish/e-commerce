"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { instagramPosts } from "@/lib/data";
import AnimatedSection from "@/components/ui/AnimatedSection";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={`w-4 h-4 fill-current ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function InstagramGallery() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <AnimatedSection direction="up">
            <span className="eyebrow mb-2 block">
              Editorial Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
              Shop the Gallery
            </h2>
            <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed">
              Tag <span className="font-medium text-gray-900">@AURUM</span> in your posts to be featured in our curated lifestyle feed.
            </p>
          </AnimatedSection>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post, idx) => (
            <AnimatedSection
              key={post.id}
              direction="up"
              delay={idx * 0.04}
              className="group aspect-square relative rounded-lg overflow-hidden bg-[#fafafa] border border-gray-200 transition-[border-color,box-shadow] duration-200 hover:border-gray-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] cursor-pointer"
            >
              {/* Image */}
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white pointer-events-none">
                <InstagramIcon className="mb-1.5" />
                <div className="flex items-center gap-1 text-[11px] font-medium tabular-nums">
                  <Heart size={11} className="fill-white" />
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
