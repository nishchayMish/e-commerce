import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import TrendingProducts from "./components/TrendingProducts";
import FlashSale from "./components/FlashSale";
import BestSellers from "./components/BestSellers";
import WhyShopWithUs from "./components/WhyShopWithUs";
import Brands from "./components/Brands";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import InstagramGallery from "./components/InstagramGallery";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Brands />
        <Categories />
        <TrendingProducts />
        <FlashSale />
        <BestSellers />
        <WhyShopWithUs />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}