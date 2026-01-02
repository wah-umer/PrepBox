import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import WhyPrepBox from "@/components/WhyPrepBox";
import QuickBenefits from "@/components/QuickBenefits";
import Reviews from "@/components/Reviews";
import WhatsAppSupport from "@/components/WhatsAppSupport";

export default function Home() {
  return (
    <div>
      <Hero />
      <QuickBenefits />
      <FeaturedProducts />
      <Categories />
      <WhyPrepBox />
      <Reviews />
      <WhatsAppSupport />
    </div>
  );
}

