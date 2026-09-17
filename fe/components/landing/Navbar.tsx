"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const { user, loading: authLoading } = useAuth();
  const { cartCount } = useCart();
  const initial = user?.username?.[0]?.toUpperCase() ?? "";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-base font-semibold tracking-[0.18em] text-gray-900 select-none">
                AURUM
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-gray-500 transition hover:text-gray-900 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center gap-0.5">
              {/* Search — desktop */}
              <button
                className="hidden lg:flex w-9 h-9 rounded-lg items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                aria-label="Search"
              >
                <Search size={16} />
              </button>

              {/* Wishlist — desktop */}
              <button
                className="hidden lg:flex w-9 h-9 rounded-lg items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                aria-label="Wishlist"
              >
                <Heart size={16} />
              </button>

              {/* Cart — always visible */}
              <Link href="/cart">
                <button
                  className="relative cursor-pointer w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                  aria-label="Cart"
                >
                  <ShoppingBag size={16} />
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-gray-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center leading-none ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Profile — desktop only; mobile sees account inside menu */}
              {!authLoading && (
                user ? (
                  <button
                    type="button"
                    className="hidden lg:flex ml-1.5 w-8 h-8 rounded-full items-center justify-center text-[11px] font-semibold text-white bg-gray-900"
                    aria-label={`Signed in as ${user.username}`}
                  >
                    {initial}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="hidden lg:flex ml-0.5 w-9 h-9 rounded-lg items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
                    aria-label="Sign in"
                  >
                    <User size={16} />
                  </Link>
                )
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile Menu ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-16 lg:hidden"
          >
            <motion.nav
              className="flex flex-col px-6 pt-6 h-[calc(100dvh-4rem)]"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {/* Account status */}
              {!authLoading && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="mb-2 pb-5 border-b border-gray-100"
                >
                  {user ? (
                    <div className="flex items-center gap-3">
                      <span className="flex w-11 h-11 shrink-0 rounded-full items-center justify-center text-sm font-semibold text-white bg-gray-900">
                        {initial}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                          Signed in
                        </p>
                        <p className="truncate text-base font-semibold text-gray-900">
                          {user.username}
                        </p>
                        <p className="truncate text-[13px] text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        Welcome to AURUM
                      </p>
                      <p className="mt-0.5 text-[13px] text-gray-500">
                        Sign in to sync your cart and wishlist.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-lg font-medium text-gray-900 border-b border-gray-100 transition hover:text-gray-500"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Secondary actions moved out of header */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
                className="flex gap-2 pt-5"
              >
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-[13px] font-medium text-gray-700"
                  aria-label="Search"
                >
                  <Search size={15} /> Search
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-[13px] font-medium text-gray-700"
                  aria-label="Wishlist"
                >
                  <Heart size={15} /> Wishlist
                </button>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="mt-auto pt-8 pb-8"
              >
                {!user && (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary flex w-full items-center justify-center gap-2"
                  >
                    <User size={14} /> Sign In
                  </Link>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
