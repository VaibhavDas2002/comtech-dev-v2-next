export type DivisionType = 'sales' | 'service' | 'both';

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: 'IT Consultancy' | 'Website & Software' | 'Tally Prime' | 'Antivirus & Security' | 'CCTV & Surveillance' | 'Hardware & Motherboard Lab' | 'Networking & AMC';
  division: DivisionType;
  short_description: string;
  description: string;
  features: string[];
  price_starting?: string;
  image_url: string;
  badge?: string;
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  brand: string;
  sku?: string;
  short_description: string;
  description: string;
  price?: number;
  discount_price?: number;
  warranty?: string;
  specifications: Record<string, string>;
  image_url: string;
  in_stock: boolean;
  is_featured: boolean;
  is_new?: boolean;
  created_at?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  author_role: string;
  tags: string[];
  reading_time_minutes: number;
  views_count: number;
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  is_featured: boolean;
  published_at: string;
  created_at?: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discount_text: string;
  description: string;
  coupon_code?: string;
  valid_until?: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
  bg_gradient?: string;
  is_active: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'CCTV Installation' | 'Motherboard Repair Lab' | 'Server & Networking' | 'Showroom & Retail' | 'Client Deployments';
  image_url: string;
  description: string;
  location?: string;
  is_featured: boolean;
  created_at?: string;
}

export type EnquiryStatus = 'pending' | 'contacted' | 'quoted' | 'in_progress' | 'resolved' | 'cancelled';
export type EnquiryType = 'general' | 'service' | 'product' | 'amc_quote' | 'cctv_survey';
export type EnquiryUrgency = 'normal' | 'urgent' | 'critical';

export interface Enquiry {
  id: string;
  ticket_number: string;
  name: string;
  phone: string;
  email?: string;
  type: EnquiryType;
  service_or_product_name?: string;
  subject?: string;
  message: string;
  urgency: EnquiryUrgency;
  status: EnquiryStatus;
  admin_notes?: string;
  ip_address?: string;
  created_at: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  location: string;
  avatar_url?: string;
  rating: number;
  review: string;
  service_type: string;
  is_featured: boolean;
  created_at?: string;
}

export interface SiteSettings {
  company_sales_name: string;
  company_service_name: string;
  tagline: string;
  phone_sales: string;
  phone_service: string;
  phone_landline: string;
  whatsapp_number: string;
  email_sales: string;
  email_service: string;
  email_general: string;
  address_line1: string;
  address_line2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  opening_hours: string;
  google_maps_embed_url: string;
}
