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
  DocumentImage,
  UserAccount,
  MasterLocation,
  MasterBrand,
} from '../types';
import {
  initialServices,
  initialProducts,
  initialBlogs,
  initialPromotions,
  initialGallery,
  initialTestimonials,
  initialEnquiries,
  initialUsers,
  initialMasterLocations,
  initialMasterBrands,
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
  __comtech_documents__?: DocumentImage[];
  __comtech_users__?: UserAccount[];
  __comtech_master_locations__?: MasterLocation[];
  __comtech_master_brands__?: MasterBrand[];
};

if (!globalStore.__comtech_services__) globalStore.__comtech_services__ = [...initialServices];
if (!globalStore.__comtech_products__) globalStore.__comtech_products__ = [...initialProducts];
if (!globalStore.__comtech_blogs__) globalStore.__comtech_blogs__ = [...initialBlogs];
if (!globalStore.__comtech_promotions__) globalStore.__comtech_promotions__ = [...initialPromotions];
if (!globalStore.__comtech_gallery__) globalStore.__comtech_gallery__ = [...initialGallery];
if (!globalStore.__comtech_testimonials__) globalStore.__comtech_testimonials__ = [...initialTestimonials];
globalStore.__comtech_enquiries__ = []; // Cleared / reset from db as requested
if (!globalStore.__comtech_settings__) globalStore.__comtech_settings__ = { ...defaultSettings };
if (!globalStore.__comtech_documents__) globalStore.__comtech_documents__ = [];
if (!globalStore.__comtech_users__) globalStore.__comtech_users__ = [...initialUsers];
if (!globalStore.__comtech_master_locations__) globalStore.__comtech_master_locations__ = [...initialMasterLocations];
if (!globalStore.__comtech_master_brands__) globalStore.__comtech_master_brands__ = [...initialMasterBrands];

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
    const prefix = enquiry.type === 'service_appointment' ? 'APT' : 'COM';
    const newEnquiry: Enquiry = {
      id: enquiry.id || `enq-${Date.now()}`,
      ticket_number: enquiry.ticket_number || `${prefix}-${randomDigits}`,
      name: enquiry.name,
      phone: enquiry.phone,
      whatsapp_number: enquiry.whatsapp_number || enquiry.phone,
      email: enquiry.email || '',
      type: enquiry.type || 'general',
      service_or_product_name: enquiry.service_or_product_name || '',
      subject: enquiry.subject || 'Website Enquiry',
      message: enquiry.message,
      urgency: enquiry.urgency || 'normal',
      status: 'pending',
      admin_notes: enquiry.admin_notes || '',

      // Appointment specific fields
      appointment_date: enquiry.appointment_date || '',
      appointment_time_slot: enquiry.appointment_time_slot || '',
      service_mode: enquiry.service_mode || 'lab_visit',
      customer_category: enquiry.customer_category || 'Individual / Home',
      address: enquiry.address || '',
      landmark: enquiry.landmark || '',
      device_brand_model: enquiry.device_brand_model || '',
      device_serial: enquiry.device_serial || '',
      warranty_status: enquiry.warranty_status || 'Out of Warranty',
      issue_symptoms: enquiry.issue_symptoms || [],
      attachment_doc_id: enquiry.attachment_doc_id || '',
      attachment_url: enquiry.attachment_url || '',

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

  // --- Document & Image Storage (Base64) ---
  async getDocuments(): Promise<DocumentImage[]> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('document_image').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as DocumentImage[];
    } catch {
      // Fallback
    }
    return globalStore.__comtech_documents__ || [];
  },

  async getDocumentById(id: string): Promise<DocumentImage | null> {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('document_image').select('*').eq('id', id).single();
      if (!error && data) return data as DocumentImage;
    } catch {
      // Fallback
    }
    const list = await this.getDocuments();
    return list.find((d) => d.id === id) || null;
  },

  async saveDocument(doc: DocumentImage): Promise<DocumentImage> {
    const list = await this.getDocuments();
    const index = list.findIndex((d) => d.id === doc.id);
    let updatedList: DocumentImage[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = doc;
    } else {
      updatedList = [doc, ...list];
    }
    try {
      const supabase = createClient();
      await supabase.from('document_image').upsert(doc);
    } catch {
      // Fallback
    }
    globalStore.__comtech_documents__ = updatedList;
    return doc;
  },

  async deleteDocument(id: string): Promise<boolean> {
    const list = await this.getDocuments();
    const updatedList = list.filter((d) => d.id !== id);
    try {
      const supabase = createClient();
      await supabase.from('document_image').delete().eq('id', id);
    } catch {
      // Fallback
    }
    globalStore.__comtech_documents__ = updatedList;
    return true;
  },

  // --- Clear / Reset Enquiries ---
  async clearAllEnquiries(): Promise<boolean> {
    try {
      const supabase = createClient();
      await supabase.from('enquiries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    } catch {
      // Fallback
    }
    globalStore.__comtech_enquiries__ = [];
    return true;
  },

  // --- User Management ---
  async getUsers(): Promise<UserAccount[]> {
    return globalStore.__comtech_users__ || initialUsers;
  },

  async saveUser(user: UserAccount): Promise<UserAccount> {
    const list = await this.getUsers();
    const index = list.findIndex((u) => u.id === user.id);
    let updatedList: UserAccount[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = { ...user, updated_at: new Date().toISOString() };
    } else {
      updatedList = [{ ...user, created_at: new Date().toISOString() }, ...list];
    }
    globalStore.__comtech_users__ = updatedList;
    return user;
  },

  async deleteUser(id: string): Promise<boolean> {
    const list = await this.getUsers();
    globalStore.__comtech_users__ = list.filter((u) => u.id !== id);
    return true;
  },

  // --- Master Locations ---
  async getMasterLocations(): Promise<MasterLocation[]> {
    return globalStore.__comtech_master_locations__ || initialMasterLocations;
  },

  async saveMasterLocation(loc: MasterLocation): Promise<MasterLocation> {
    const list = await this.getMasterLocations();
    const index = list.findIndex((l) => l.id === loc.id);
    let updatedList: MasterLocation[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = loc;
    } else {
      updatedList = [loc, ...list];
    }
    globalStore.__comtech_master_locations__ = updatedList;
    return loc;
  },

  async deleteMasterLocation(id: string): Promise<boolean> {
    const list = await this.getMasterLocations();
    globalStore.__comtech_master_locations__ = list.filter((l) => l.id !== id);
    return true;
  },

  // --- Master Brands ---
  async getMasterBrands(): Promise<MasterBrand[]> {
    return globalStore.__comtech_master_brands__ || initialMasterBrands;
  },

  async saveMasterBrand(brand: MasterBrand): Promise<MasterBrand> {
    const list = await this.getMasterBrands();
    const index = list.findIndex((b) => b.id === brand.id);
    let updatedList: MasterBrand[];
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = brand;
    } else {
      updatedList = [brand, ...list];
    }
    globalStore.__comtech_master_brands__ = updatedList;
    return brand;
  },

  async deleteMasterBrand(id: string): Promise<boolean> {
    const list = await this.getMasterBrands();
    globalStore.__comtech_master_brands__ = list.filter((b) => b.id !== id);
    return true;
  },
};
