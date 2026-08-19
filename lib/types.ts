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
export type EnquiryType = 'general' | 'service' | 'product' | 'amc_quote' | 'cctv_survey' | 'service_appointment';
export type EnquiryUrgency = 'normal' | 'urgent' | 'critical';
export type ServiceMode = 'lab_visit' | 'onsite_visit' | 'remote_support';

export interface Enquiry {
  id: string;
  ticket_number: string;
  name: string;
  phone: string;
  whatsapp_number?: string;
  email?: string;
  type: EnquiryType;
  service_or_product_name?: string;
  subject?: string;
  message: string;
  urgency: EnquiryUrgency;
  status: EnquiryStatus;
  admin_notes?: string;
  ip_address?: string;

  // Appointment & Technical Issue details
  appointment_date?: string;
  appointment_time_slot?: string;
  service_mode?: ServiceMode;
  customer_category?: string;
  address?: string;
  landmark?: string;
  device_brand_model?: string;
  device_serial?: string;
  warranty_status?: string;
  issue_symptoms?: string[];
  attachment_doc_id?: string;
  attachment_url?: string;

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

export interface DocumentImage {
  id: string;
  file_name: string;
  mime_type: string; // 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf'
  base64_data: string;
  file_size_bytes?: number;
  created_at: string;
  updated_at?: string;
}

export type UserRole = 'Super Admin' | 'Service Technician' | 'Sales Manager' | 'Support Executive';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  avatar_url?: string;
  last_login?: string;
  created_at: string;
  updated_at?: string;
}

export interface MasterLocation {
  id: string;
  city_or_area: string;
  pincode: string;
  district: string;
  is_onsite_supported: boolean;
  estimated_eta: string;
}

export interface MasterBrand {
  id: string;
  name: string;
  category: string;
  is_authorized_partner: boolean;
  logo_url?: string;
}

export interface MasterSymptom {
  id: string;
  department: string;
  symptom_name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  typical_resolution: string;
}
