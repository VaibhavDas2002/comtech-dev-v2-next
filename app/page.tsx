import { DataService } from '@/lib/store/dataService';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromotionsBanner } from '@/components/home/PromotionsBanner';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { LatestBlogsSection } from '@/components/home/LatestBlogsSection';
import { HomeContactSection } from '@/components/home/HomeContactSection';

export const revalidate = 60; // Revalidate at most every minute

export default async function HomePage() {
  const [services, products, promotions, testimonials, blogs] = await Promise.all([
    DataService.getServices(),
    DataService.getProducts(),
    DataService.getPromotions(),
    DataService.getTestimonials(),
    DataService.getBlogs(),
  ]);

  return (
    <div className="space-y-0">
      <HeroSection />
      <ServicesGrid services={services.filter((s) => s.is_active)} />
      <FeaturedProducts products={products} />
      <PromotionsBanner promotions={promotions.filter((p) => p.is_active)} />
      <WhyChooseUs />
      <TestimonialsSection testimonials={testimonials.filter((t) => t.is_featured)} />
      <LatestBlogsSection blogs={blogs.filter((b) => b.is_published)} />
      <HomeContactSection />
    </div>
  );
}
