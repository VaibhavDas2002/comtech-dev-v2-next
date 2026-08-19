import { createClient } from '@/utils/supabase/client';
import {
  Service,
  Product,
  Blog,
  Promotion,
  GalleryItem,
  Enquiry,
  Testimonial,
  SiteSettings,
} from '../types';
import {
  initialServices,
  initialProducts,
  initialBlogs,
  initialPromotions,
  initialGallery,
  initialTestimonials,
  initialEnquiries,
  siteSettings as defaultSettings,
} from './seedData';

// Global server-side in-memory state store
const globalStore = globalThis as unknown as {
  __comtech_services__?: Service[];
  __comtech_products__?: Product[];
  __comtech_blogs__?: Blog[];
  __comtech_promotions__?: Promotion[];
  __comtech_gallery__?: GalleryItem[];
  __comtech_testimonials__?: Testimonial[];
  __comtech_enquiries__?: Enquiry[];
  __comtech_settings__?: SiteSettings;
};

if (!globalStore.__comtech_services__) globalStore.__comtech_services__ = [...initialServices];
if (!globalStore.__comtech_products__) globalStore.__comtech_products__ = [...initialProducts];
if (!globalStore.__comtech_blogs__) globalStore.__comtech_blogs__ = [...initialBlogs];
if (!globalStore.__comtech_promotions__) globalStore.__comtech_promotions__ = [...initialPromotions];
if (!globalStore.__comtech_gallery__) globalStore.__comtech_gallery__ = [...initialGallery];
if (!globalStore.__comtech_testimonials__) globalStore.__comtech_testimonials__ = [...initialTestimonials];
if (!globalStore.__comtech_enquiries__) globalStore.__comtech_enquiries__ = [...initialEnquiries];
if (!globalStore.__comtech_settings__) globalStore.__comtech_settings__ = { ...defaultSettings };

export const DataService = {
  // --- Site Settings ---
  async getSettings(): Promise<SiteSettings> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) return data as SiteSettings;
    } catch {
      // Fallback
    }
    return globalStore.__comtech_settings__ || defaultSettings;
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    try {
      const supabase = createClient();
      await supabase.from('site_settings').upsert({ id: 'default', ...updated });
    } catch {
      // Local fallback
    }
    globalStore.__comtech_settings__ = updated;
    return updated;
  },

  // --- Services ---
  async getServices(): Promise<Service[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Service[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_services__ || initialServices;
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const list = await this.getServices();
    return list.find((s) => s.slug === slug) || null;
  },

  async saveService(service: Service): Promise<Service> {
    const list = await this.getServices();
    const index = list.findIndex((s) => s.id === service.id);
    let updatedList: Service[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = service;
    } else {
      updatedList = [service, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('services').upsert(service);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_services__ = updatedList;
    return service;
  },

  async deleteService(id: string): Promise<boolean> {
    const list = await this.getServices();
    const updatedList = list.filter((s) => s.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('services').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_services__ = updatedList;
    return true;
  },

  // --- Products ---
  async getProducts(): Promise<Product[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Product[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_products__ || initialProducts;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const list = await this.getProducts();
    return list.find((p) => p.slug === slug || p.id === slug) || null;
  },

  async saveProduct(product: Product): Promise<Product> {
    const list = await this.getProducts();
    const index = list.findIndex((p) => p.id === product.id);
    let updatedList: Product[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = product;
    } else {
      updatedList = [product, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('products').upsert(product);
    } catch {
      // Fallback
    }
    globalStore.__comtech_products__ = updatedList;
    return product;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const list = await this.getProducts();
    const updatedList = list.filter((p) => p.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('products').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_products__ = updatedList;
    return true;
  },

  // --- Blogs ---
  async getBlogs(): Promise<Blog[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('blogs').select('*').order('published_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Blog[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_blogs__ || initialBlogs;
  },

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    const list = await this.getBlogs();
    return list.find((b) => b.slug === slug) || null;
  },

  async saveBlog(blog: Blog): Promise<Blog> {
    const list = await this.getBlogs();
    const index = list.findIndex((b) => b.id === blog.id);
    let updatedList: Blog[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = blog;
    } else {
      updatedList = [blog, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('blogs').upsert(blog);
    } catch {
      // Fallback
    }
    globalStore.__comtech_blogs__ = updatedList;
    return blog;
  },

  async deleteBlog(id: string): Promise<boolean> {
    const list = await this.getBlogs();
    const updatedList = list.filter((b) => b.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('blogs').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_blogs__ = updatedList;
    return true;
  },

  // --- Promotions ---
  async getPromotions(): Promise<Promotion[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Promotion[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_promotions__ || initialPromotions;
  },

  async savePromotion(promo: Promotion): Promise<Promotion> {
    const list = await this.getPromotions();
    const index = list.findIndex((p) => p.id === promo.id);
    let updatedList: Promotion[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = promo;
    } else {
      updatedList = [promo, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('promotions').upsert(promo);
    } catch {
      // Fallback
    }
    globalStore.__comtech_promotions__ = updatedList;
    return promo;
  },

  async deletePromotion(id: string): Promise<boolean> {
    const list = await this.getPromotions();
    const updatedList = list.filter((p) => p.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('promotions').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_promotions__ = updatedList;
    return true;
  },

  // --- Gallery ---
  async getGallery(): Promise<GalleryItem[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as GalleryItem[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_gallery__ || initialGallery;
  },

  async saveGalleryItem(item: GalleryItem): Promise<GalleryItem> {
    const list = await this.getGallery();
    const index = list.findIndex((g) => g.id === item.id);
    let updatedList: GalleryItem[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = item;
    } else {
      updatedList = [item, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('gallery_items').upsert(item);
    } catch {
      // Fallback
    }
    globalStore.__comtech_gallery__ = updatedList;
    return item;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    const list = await this.getGallery();
    const updatedList = list.filter((g) => g.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('gallery_items').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_gallery__ = updatedList;
    return true;
  },

  // --- Testimonials ---
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Testimonial[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_testimonials__ || initialTestimonials;
  },

  async saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    const list = await this.getTestimonials();
    const index = list.findIndex((t) => t.id === testimonial.id);
    let updatedList: Testimonial[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = testimonial;
    } else {
      updatedList = [testimonial, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('testimonials').upsert(testimonial);
    } catch {
      // Fallback
    }
    globalStore.__comtech_testimonials__ = updatedList;
    return testimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const list = await this.getTestimonials();
    const updatedList = list.filter((t) => t.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('testimonials').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_testimonials__ = updatedList;
    return true;
  },

  // --- Enquiries / CRM Leads ---
  async getEnquiries(): Promise<Enquiry[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Enquiry[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_enquiries__ || initialEnquiries;
  },

  async createEnquiry(enquiry: Omit<Enquiry, 'id' | 'ticket_number' | 'created_at' | 'status'> & { id?: string; ticket_number?: string; status?: string }): Promise<Enquiry> {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newEnquiry: Enquiry = {
      id: enquiry.id || `enq-${Date.now()}`,
      ticket_number: enquiry.ticket_number || `COM-${randomDigits}`,
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email || '',
      type: enquiry.type || 'general',
      service_or_product_name: enquiry.service_or_product_name || '',
      subject: enquiry.subject || 'Website Enquiry',
      message: enquiry.message,
      urgency: enquiry.urgency || 'normal',
      status: 'pending',
      admin_notes: enquiry.admin_notes || '',
      created_at: new Date().toISOString(),
    };

    const list = await this.getEnquiries();
    const updatedList = [newEnquiry, ...list];

    try {
      const supabase = createClient();
      await supabase.from('enquiries').insert(newEnquiry);
    } catch {
      // Local fallback
    }

    globalStore.__comtech_enquiries__ = updatedList;
    return newEnquiry;
  },

  async updateEnquiry(id: string, updates: Partial<Enquiry>): Promise<Enquiry | null> {
    const list = await this.getEnquiries();
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) return null;

    const updated = { ...list[index], ...updates, updated_at: new Date().toISOString() };
    const updatedList = [...list];
    updatedList[index] = updated;

    try {
      const supabase = createClient();
      await supabase.from('enquiries').update(updates).eq('id', id);
    } catch {
      // Local fallback
    }

    globalStore.__comtech_enquiries__ = updatedList;
    return updated;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    const list = await this.getEnquiries();
    const updatedList = list.filter((e) => e.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('enquiries').delete().eq('id', id);
    } catch {
      // Local fallback
    }
    globalStore.__comtech_enquiries__ = updatedList;
    return true;
  },
};
