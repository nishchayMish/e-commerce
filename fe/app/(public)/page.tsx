import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";
import TrendingProducts from "@/components/landing/TrendingProducts";
import FlashSale from "@/components/landing/FlashSale";
import BestSellers from "@/components/landing/BestSellers";
import WhyShopWithUs from "@/components/landing/WhyShopWithUs";
import Brands from "@/components/landing/Brands";
import Testimonials from "@/components/landing/Testimonials";
import Newsletter from "@/components/landing/Newsletter";
import InstagramGallery from "@/components/landing/InstagramGallery";

export default function Home() {
  return (
    <>
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
    </>
  );
}
