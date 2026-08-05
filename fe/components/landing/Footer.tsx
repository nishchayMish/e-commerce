"use client";

import Link from "next/link";

// Custom premium SVG brand icons
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const footerLinks = {
  Company: [
    { label: "Our Story", href: "/story" },
    { label: "Careers", href: "/careers" },
    { label: "Journal", href: "/journal" },
    { label: "Showrooms", href: "/showrooms" },
  ],
  Shop: [
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=best-sellers" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Private Sales", href: "/private-sales" },
  ],
  Help: [
    { label: "Order Tracking", href: "/help/tracking" },
    { label: "Fulfillment & Delivery", href: "/help/delivery" },
    { label: "Returns & Exchanges", href: "/help/returns" },
    { label: "Book a Stylist", href: "/help/stylist" },
  ],
  Policies: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Guidelines", href: "/privacy" },
    { label: "Accessibility Notice", href: "/accessibility" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialIcons = [
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
];

const paymentMethods = ["Visa", "Mastercard", "Apple Pay", "Stripe", "Amex"];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#fafafa] pt-14 pb-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-gray-200">

          {/* Logo & Bio Left */}
          <div className="col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-4">
              <span className="text-base font-semibold tracking-[0.18em] text-gray-900">
                AURUM
              </span>
            </Link>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-6 max-w-xs">
              We curate premium design and exceptional utility. Thoughtfully crafted for the modern citizen.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 transition hover:text-gray-900 hover:border-gray-300"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col items-start">
              <h4 className="text-[13px] font-medium text-gray-900 mb-3.5">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom copyright & payment methods */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} AURUM Inc. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-[11px] font-medium text-gray-500 bg-white border border-gray-200 rounded-md px-2 py-1 select-none"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
