import { Service, Product, Blog, Promotion, GalleryItem, Enquiry, Testimonial, SiteSettings } from '../types';

export const siteSettings: SiteSettings = {
  company_sales_name: "Comtech Information Services",
  company_service_name: "Comtech Infosys",
  tagline: "Your Trusted Technology Partner for IT Sales, Advanced Chip-Level Services, CCTV & Cloud Solutions",
  phone_sales: "+91 94341 97268",
  phone_service: "+91 94743 06951",
  phone_landline: "03462-255555",
  whatsapp_number: "+919434197268",
  email_sales: "sales@comtechis.in",
  email_service: "service@comtechinfosys.in",
  email_general: "info@comtechis.in",
  address_line1: "Beside A.B.T.A Building, New DangalPara",
  address_line2: "Near Suri Bus Stand & District Court",
  city: "Suri",
  district: "Birbhum",
  state: "West Bengal",
  pincode: "731101",
  opening_hours: "Mon - Sat: 9:30 AM - 8:30 PM | Sun: Closed / Emergency On-Call",
  google_maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.5583647413627!2d87.52589531497984!3d23.90906238451152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f993d0f0c058eb%3A0x88c2b53cb1cbfd22!2sSuri%2C%20West%20Bengal%20731101!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const initialServices: Service[] = [
  {
    id: "srv-1",
    title: "CCTV Surveillance & Security Automation",
    slug: "cctv-surveillance-systems",
    category: "CCTV & Surveillance",
    division: "both",
    short_description: "End-to-end HD/IP surveillance installation, ColorVu night vision, NVR setups, mobile app streaming & annual maintenance.",
    description: "We are authorized partners for Hikvision, CP Plus, and Dahua in Birbhum. We provide commercial, institutional, and residential CCTV deployments with audio-video recording, perimeter intrusion detection, and optical fiber interconnectivity.",
    features: [
      "Full Color Night Vision (ColorVu / Full-color IP)",
      "Remote mobile streaming on iOS & Android",
      "Optical fiber long-distance video transmission",
      "Free site survey and security risk assessment",
      "1-Year onsite hardware replacement warranty"
    ],
    price_starting: "₹ 8,999 (4-Cam HD Setup)",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80",
    badge: "Most Popular in Suri",
    is_active: true,
    is_featured: true,
    created_at: "2026-01-15T10:00:00Z"
  },
  {
    id: "srv-2",
    title: "Tally Prime Sales, Custom TDL & Multi-User Cloud",
    slug: "tally-prime-solutions",
    category: "Tally Prime",
    division: "sales",
    short_description: "Certified 3-Star Tally Partner: New Silver/Gold licenses, version upgrades, custom invoice TDL, barcode generation & AWS cloud hosting.",
    description: "Optimize your business accounting and GST compliance. We offer complete Tally Prime implementation, data synchronization between head office & branches, custom invoice formats, automated WhatsApp ledger sending, and multi-user remote access.",
    features: [
      "Authorized Tally Prime Silver & Gold Licenses",
      "Custom TDL Modules (QR Code Invoice, Auto-Eway)",
      "Tally on Cloud for 24/7 anywhere access",
      "Annual Tally Software Services (TSS) renewals",
      "Dedicated onsite and remote phone support"
    ],
    price_starting: "₹ 18,000 + GST",
    image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80",
    badge: "Certified Partner",
    is_active: true,
    is_featured: true,
    created_at: "2026-01-16T10:00:00Z"
  },
  {
    id: "srv-3",
    title: "Chip-Level Laptop, Desktop & Printer Motherboard Lab",
    slug: "chip-level-motherboard-repair",
    category: "Hardware & Motherboard Lab",
    division: "service",
    short_description: "Advanced diagnostic lab equipped with BGA rework station, oscilloscope, thermal camera for dead motherboard and power IC repair.",
    description: "Comtech Infosys operates the premier chip-level service lab in Birbhum district. We repair no-power laptops, shorted motherboards, water-damaged logic boards, broken hinges, flickering displays, and thermal overheating issues with 100% genuine parts.",
    features: [
      "BGA IC Re-balling & chipset replacement",
      "Short circuit diagnosis with Thermal Imaging",
      "Liquid damage recovery & ultrasonic cleaning",
      "Screen, battery & keyboard replacement in 2 hrs",
      "30-day post-service warranty on all chip repairs"
    ],
    price_starting: "₹ 750 (Inspection & Repair)",
    image_url: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1000&q=80",
    badge: "Expert Service Lab",
    is_active: true,
    is_featured: true,
    created_at: "2026-01-17T10:00:00Z"
  },
  {
    id: "srv-4",
    title: "Custom Website Design & Enterprise Web Applications",
    slug: "website-design-development",
    category: "Website & Software",
    division: "both",
    short_description: "High-speed modern websites, ERP web portals, eCommerce stores, and custom database web applications with Next.js & React.",
    description: "Boost your brand online with search-engine optimized, mobile-responsive web applications. We design corporate landing pages, school management portals, hospital billing systems, and inventory management solutions with clean UI/UX.",
    features: [
      "Blazing-fast responsive Next.js / React apps",
      "Custom Admin Dashboard & CMS portals",
      "Integrated payment gateways (Razorpay, UPI)",
      "Free SSL, Cloudflare CDN & Domain setup",
      "1-Year complimentary maintenance & updates"
    ],
    price_starting: "₹ 12,500",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    badge: "Digital Growth",
    is_active: true,
    is_featured: true,
    created_at: "2026-01-18T10:00:00Z"
  },
  {
    id: "srv-5",
    title: "Enterprise Cybersecurity & Antivirus Deployments",
    slug: "antivirus-cybersecurity",
    category: "Antivirus & Security",
    division: "sales",
    short_description: "Endpoint protection, ransomware shields, centralized server security consoles for Quick Heal, Seqrite, and Kaspersky.",
    description: "Protect your sensitive business data, accounting ledgers, and institutional networks from zero-day ransomware, spyware, and unauthorized USB data exfiltration with centralized cloud console management.",
    features: [
      "Authorized Distributor: Quick Heal & Seqrite EPS",
      "Ransomware data backup & shadow protection",
      "Centralized admin management console",
      "Web filtering & USB peripheral access controls",
      "Special bulk discount for schools & offices"
    ],
    price_starting: "₹ 599 / Device",
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80",
    badge: "100% Genuine Keys",
    is_active: true,
    is_featured: false,
    created_at: "2026-01-19T10:00:00Z"
  },
  {
    id: "srv-6",
    title: "Corporate IT AMC & Structured Fiber Optic Networking",
    slug: "corporate-it-amc-networking",
    category: "Networking & AMC",
    division: "service",
    short_description: "Annual Maintenance Contracts (AMC), Cat6 rack cabling, optical fiber splicing, Wi-Fi mesh coverage, and firewall routing.",
    description: "Keep your office or institution running 24/7 without IT downtime. Our certified engineers handle scheduled preventive maintenance, printer servicing, server backups, network switch configurations, and emergency on-site visitations within 2 hours.",
    features: [
      "Comprehensive & Non-Comprehensive AMC plans",
      "2-Hour guaranteed emergency response in Suri",
      "Structured Cat6/Cat6A & 24-Port Server Rack setup",
      "Optical Fiber fusion splicing with OTDR testing",
      "Monthly health check audits & UPS diagnostics"
    ],
    price_starting: "₹ 4,500 / Year",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80",
    badge: "Guaranteed SLA",
    is_active: true,
    is_featured: true,
    created_at: "2026-01-20T10:00:00Z"
  }
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    title: "Hikvision 4-Channel 1080p ColorVu Night Surveillance Kit",
    slug: "hikvision-4-channel-colorvu-kit",
    category: "CCTV & Security",
    brand: "Hikvision",
    sku: "HIK-4CH-CV24",
    short_description: "Complete surveillance kit including 4x 2MP ColorVu cameras, 4-CH DVR, 1TB WD Purple HDD, 4-CH SMPS and connectors.",
    description: "Crystal clear full-color video even in total darkness. Features 20m white light range, motion detection 2.0 with human/vehicle classification, and audio recording over coaxial cable.",
    price: 13500,
    discount_price: 11200,
    warranty: "2 Years Manufacturer Warranty",
    specifications: {
      "Resolution": "1080P Full HD (1920x1080)",
      "Night Vision": "Full ColorVu Night Vision up to 20m",
      "Audio": "Built-in High Sensitivity Mic",
      "Storage": "1TB Surveillance Grade WD Purple HDD",
      "Connectivity": "HDMI, VGA, LAN Remote View App"
    },
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    is_featured: true,
    is_new: true,
    created_at: "2026-01-10T10:00:00Z"
  },
  {
    id: "prod-2",
    title: "Tally Prime Silver Single-User Official License",
    slug: "tally-prime-silver-license",
    category: "Software & Licenses",
    brand: "Tally Solutions",
    sku: "TALLY-SILVER-V4",
    short_description: "Official perpetual single-user license for GST billing, inventory, payroll, e-Way bills and e-Invoicing.",
    description: "The gold standard accounting software for Indian enterprises. Includes 1-year TSS subscription, free cloud backup configuration, and Comtech setup support.",
    price: 21240,
    discount_price: 18999,
    warranty: "1 Year Free TSS & Remote Setup",
    specifications: {
      "User Type": "Single User (Silver Edition)",
      "Compliance": "GST, TDS, TCS, e-Way Bill, e-Invoice Ready",
      "OS Support": "Windows 10 / 11 64-bit",
      "Delivery": "Instant Digital Key + USB Installer Kit"
    },
    image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    is_featured: true,
    is_new: false,
    created_at: "2026-01-11T10:00:00Z"
  },
  {
    id: "prod-3",
    title: "HP 250 G10 Commercial Business Laptop",
    slug: "hp-250-g10-core-i5-business-laptop",
    category: "Laptops & Desktops",
    brand: "HP",
    sku: "HP-250G10-I5",
    short_description: "Intel Core i5 13th Gen, 16GB DDR4 RAM, 512GB NVMe SSD, 15.6\" FHD Anti-Glare Display, Windows 11 Pro.",
    description: "Engineered for durability and business performance. High endurance battery, numeric keypad, USB-C ports, and pre-configured with licensed Windows 11 and office productivity suite.",
    price: 54990,
    discount_price: 48500,
    warranty: "1 Year Onsite Brand Warranty + 1 Year Free Service Support at Comtech",
    specifications: {
      "Processor": "Intel Core i5-1335U (10 Cores, up to 4.6 GHz)",
      "Memory": "16 GB DDR4-3200 MHz RAM",
      "Storage": "512 GB PCIe NVMe M.2 SSD",
      "Display": "15.6\" diagonal FHD (1920 x 1080) Micro-edge",
      "Weight": "1.52 kg Lightweight Dark Ash Silver"
    },
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    is_featured: true,
    is_new: true,
    created_at: "2026-01-12T10:00:00Z"
  },
  {
    id: "prod-4",
    title: "Quick Heal Total Security 2026 (3 Years / 1 PC)",
    slug: "quick-heal-total-security-3yr",
    category: "Antivirus & Cybersecurity",
    brand: "Quick Heal",
    sku: "QH-TS-3YR-1PC",
    short_description: "Next-gen AI ransomware protection, anti-keylogger, safe banking browser, USB device lock, and firewall.",
    description: "Keep your banking passwords and business files safe from modern digital threats. Comes with automated cloud malware updates and zero system slowdown.",
    price: 2499,
    discount_price: 1799,
    warranty: "3 Years Genuine Activation Guarantee",
    specifications: {
      "Validity": "3 Years Active Subscription",
      "Device Limit": "1 PC / Laptop (Windows)",
      "Key Features": "Ransomware Shield, Safe Banking, Data Vault",
      "Activation": "Instant WhatsApp/Email Key Delivery"
    },
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    is_featured: false,
    is_new: false,
    created_at: "2026-01-13T10:00:00Z"
  },
  {
    id: "prod-5",
    title: "D-Link 24-Port Gigabit Smart Managed Rackmount Switch",
    slug: "dlink-24-port-gigabit-switch",
    category: "Networking & Accessories",
    brand: "D-Link",
    sku: "DGS-1210-24",
    short_description: "24x 10/100/1000Mbps Gigabit Ports + 4 Combo SFP slots for fiber uplinks, QoS, VLAN, metal rackmount chassis.",
    description: "Designed for SME offices, educational institutions, and hospitals in Birbhum requiring high-bandwidth network distribution with zero latency.",
    price: 11800,
    discount_price: 9950,
    warranty: "3 Years Brand Warranty",
    specifications: {
      "Ports": "24 Gigabit 10/100/1000 Ports + 4 SFP Optical",
      "Switching Capacity": "56 Gbps",
      "Features": "VLAN, QoS, IGMP Snooping, Loopback Detection",
      "Form Factor": "19-inch 1U Metal Rackmount"
    },
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    is_featured: false,
    is_new: false,
    created_at: "2026-01-14T10:00:00Z"
  },
  {
    id: "prod-6",
    title: "Epson EcoTank L3250 Wi-Fi All-in-One Ink Tank Printer",
    slug: "epson-ecotank-l3250-wifi-printer",
    category: "Printers & Peripherals",
    brand: "Epson",
    sku: "EPSON-L3250-WIFI",
    short_description: "Print, Scan, Copy with ultra-low printing cost (9 paise black, 24 paise colour), Wi-Fi & Smart Panel mobile print.",
    description: "Ideal for shops, offices, and schools. High yield bottle design offers up to 4,500 black and 7,500 colour pages right out of the box.",
    price: 15499,
    discount_price: 13800,
    warranty: "1 Year or 30,000 Pages Onsite Warranty",
    specifications: {
      "Functions": "Print, Scan, Copy",
      "Connectivity": "Wi-Fi, Wi-Fi Direct, USB 2.0",
      "Page Yield": "4,500 Black / 7,500 Colour pages",
      "Print Speed": "33 ppm (Black), 15 ppm (Colour)"
    },
    image_url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",
    in_stock: true,
    is_featured: true,
    is_new: false,
    created_at: "2026-01-15T10:00:00Z"
  }
];

export const initialBlogs: Blog[] = [
  {
    id: "blog-1",
    title: "How to Choose the Right CCTV Camera for Your Shop or Home in Birbhum",
    slug: "how-to-choose-right-cctv-camera-guide",
    category: "Security Guides",
    excerpt: "Understand the key differences between HD Coaxial and IP Cameras, night vision ranges, and cloud backup options before installing security cameras in Suri.",
    content: `
### Why Modern Surveillance is Essential for Local Businesses

In recent years, modern surveillance has moved far beyond blurry footage that was difficult to decipher. Today, high-definition **ColorVu and DarkFighter cameras** from industry leaders like Hikvision and CP Plus allow 24/7 crystal-clear color imaging even under zero ambient street lighting.

### Key Factors to Evaluate:

1. **HD Analog vs IP Cameras:**
   - *HD Analog:* Best for budget-conscious homes and retail shops with cable distances under 100 meters.
   - *IP (Network) Cameras:* Highly scalable, uses standard Cat6 or Optical Fiber cables, supports 4K ultra-high resolution and smart AI analytics like perimeter tripwire and vehicle license plate recognition.

2. **Night Vision Capabilities:**
   - Traditional IR cameras switch to grainy black & white at night.
   - ColorVu technology uses specialized F1.0 super-apertures and warm supplemental LEDs to keep true-to-life colors visible 24 hours a day.

3. **Surveillance Hard Drives:**
   - Always insist on dedicated surveillance-grade drives like **WD Purple** or **Seagate SkyHawk**. Desktop drives fail prematurely under continuous 24/7 video write cycles.

4. **Mobile Streaming:**
   - Ensure your installer sets up secure remote streaming through Hik-Connect or CP Plus gCMOB, protected with strong encryption passwords.

*Need a free site survey in Suri or nearby areas? Contact Comtech Information Services today for expert advice!*
    `,
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    author: "Technical Team",
    author_role: "Lead Systems Engineer at Comtech",
    tags: ["CCTV", "Surveillance", "Hikvision", "Home Security", "Suri"],
    reading_time_minutes: 5,
    views_count: 420,
    meta_title: "How to Choose the Right CCTV Camera in Suri, Birbhum | Comtech Guide",
    meta_description: "Expert guide on selecting CCTV systems, night vision cameras, and NVR setups in Suri, West Bengal.",
    is_published: true,
    is_featured: true,
    published_at: "2026-02-01T09:00:00Z",
    created_at: "2026-02-01T09:00:00Z"
  },
  {
    id: "blog-2",
    title: "Tally Prime on Cloud vs Local Server: Which is Best for Your Business?",
    slug: "tally-prime-cloud-vs-local-server-comparison",
    category: "Accounting & ERP",
    excerpt: "A comprehensive breakdown of multi-user accessibility, data security, ransomware immunity, and cost efficiency when hosting Tally Prime on cloud servers.",
    content: `
### The Modern Shift to Anytime, Anywhere Accounting

Traditionally, business accountants worked exclusively from a desktop connected via local LAN cables in the office. If the proprietor traveled or wanted to check stock levels from home, they had to wait for printed statements.

With **Tally on Cloud**, your existing licensed Tally Prime runs smoothly on high-availability AWS or Azure cloud servers, allowing secure access from Windows, Mac, iPad, or Android phones.

### Advantages of Cloud Hosting:

- **100% Protection from Ransomware:** Automatic daily off-site encrypted snapshots protect your valuable financial records from malicious malware infections.
- **Simultaneous Multi-Branch Billing:** Branch shops in Bolpur, Rampurhat, and Sainthia can post vouchers simultaneously to the main company file in Suri.
- **Zero Hardware Upgrades:** No need to purchase expensive server hardware or uninterrupted power supplies in your office.

### How Comtech Helps:
As a certified Tally Partner, Comtech handles data migration, user permission hierarchies, custom voucher printing setups, and regular speed optimization.
    `,
    image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    author: "Accounting Consultant",
    author_role: "Certified Tally Professional",
    tags: ["Tally Prime", "Cloud Accounting", "GST", "ERP", "Business Growth"],
    reading_time_minutes: 6,
    views_count: 580,
    meta_title: "Tally Prime on Cloud vs Local Server | Comtech Information Services",
    meta_description: "Compare Tally Prime cloud hosting with local servers for businesses in West Bengal.",
    is_published: true,
    is_featured: true,
    published_at: "2026-02-05T11:30:00Z",
    created_at: "2026-02-05T11:30:00Z"
  },
  {
    id: "blog-3",
    title: "5 Warning Signs Your Laptop Motherboard Needs Chip-Level Servicing",
    slug: "warning-signs-laptop-motherboard-repair-guide",
    category: "Hardware Diagnostics",
    excerpt: "Learn how to detect charging IC faults, short circuits, GPU overheating, and BIOS corruption before your laptop suffers permanent hardware death.",
    content: `
### Don't Rush to Replace the Whole Motherboard!

Most service centers advise customers to replace their entire motherboard at astronomical costs (often 60-70% of the laptop's original price) when a minor 8-pin MOSFET or capacitor burns out.

At **Comtech Infosys**, our advanced diagnostic laboratory specializes in micro-soldering and chip-level component replacements, saving you up to 75% in repair expenses.

### 5 Critical Warning Symptoms:

1. **Laptop Doesn't Turn On But Charging Light Blinks:**
   - Indicates a 19V rail short circuit or a failed charging regulator IC.
2. **Laptop Shuts Down Abruptly Under Moderate Workloads:**
   - Thermal throttling caused by dried heat sink thermal paste or degraded power MOSFETs.
3. **Power On But No Display on Screen (Caps Lock Blinking):**
   - Often corrupted BIOS EEPROM firmware or disconnected RAM/GPU communication lines.
4. **USB Ports or Touchpad Not Responding:**
   - Burned Southbridge/PCH controller or electrostatic discharge diode failure.
5. **Burning Smell or Liquid Spill:**
   - Never attempt to turn on a water-damaged laptop! Immediate ultrasonic cleaning and micro-isolation are required to prevent board corrosion.
    `,
    image_url: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80",
    author: "Lab Technician",
    author_role: "Senior Hardware Specialist at Comtech Infosys",
    tags: ["Laptop Repair", "Motherboard", "Chip Level", "Diagnostics", "Suri Lab"],
    reading_time_minutes: 4,
    views_count: 730,
    meta_title: "5 Signs Your Laptop Motherboard Needs Chip-Level Repair | Comtech Infosys",
    meta_description: "Diagnostic symptoms for laptop motherboard shorts, power IC failures, and display bugs.",
    is_published: true,
    is_featured: false,
    published_at: "2026-02-10T14:00:00Z",
    created_at: "2026-02-10T14:00:00Z"
  }
];

export const initialPromotions: Promotion[] = [
  {
    id: "promo-1",
    title: "Full-Color Night CCTV 4-Camera Security Bundle",
    subtitle: "Complete Setup for Shops, Offices & Residences in Birbhum",
    badge: "Festive Special Offer",
    discount_text: "Save 25% On Full Installation",
    description: "Includes 4x Hikvision/CP Plus 2MP ColorVu Cameras, 4-Channel HD DVR, 1TB Surveillance Hard Drive, Power Supply, Connectors, and Free Professional Onsite Cabling & Mobile Setup.",
    coupon_code: "SURICCTV25",
    valid_until: "2026-09-30",
    cta_text: "Book Free Site Survey",
    cta_link: "/contact?intent=cctv_promo",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    bg_gradient: "from-blue-900 via-indigo-900 to-slate-900",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "promo-2",
    title: "Tally Prime Upgrade & Custom WhatsApp TDL Pack",
    subtitle: "Automate GST Invoicing & Instant Ledger Sharing",
    badge: "Business Upgrade Deal",
    discount_text: "Free 1 Custom TDL Module",
    description: "Purchase or renew your Tally Prime Silver or Gold license with Comtech and receive a free WhatsApp direct invoice sending module + 1 year priority telephone support.",
    coupon_code: "TALLYFAST",
    valid_until: "2026-08-31",
    cta_text: "Claim Tally Offer",
    cta_link: "/contact?intent=tally_promo",
    image_url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    bg_gradient: "from-emerald-950 via-teal-900 to-slate-900",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "promo-3",
    title: "Corporate Annual Maintenance Contract (AMC) Kickstart",
    subtitle: "Zero IT Downtime Guarantee for Schools, Offices & Clinics",
    badge: "Institutional Saver",
    discount_text: "Get 2 Months Free on 1-Year AMC",
    description: "Comprehensive desktop, printer, CCTV, and network maintenance with guaranteed 2-hour turnaround time in Suri, quarterly preventive servicing, and backup equipment standby.",
    coupon_code: "CORPAMC14",
    valid_until: "2026-10-15",
    cta_text: "Request AMC Proposal",
    cta_link: "/contact?intent=amc_promo",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    bg_gradient: "from-purple-950 via-slate-900 to-black",
    is_active: true,
    created_at: "2026-01-01T00:00:00Z"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Hikvision IP CCTV Setup at Commercial Complex",
    category: "CCTV Installation",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1000&q=80",
    description: "32-Camera IP system with optical fiber backbone and centralized 32-CH NVR monitoring station in Suri.",
    location: "Commercial Arcade, Suri",
    is_featured: true,
    created_at: "2026-01-05T00:00:00Z"
  },
  {
    id: "gal-2",
    title: "Chip-Level Diagnostic Lab & Micro-Soldering Station",
    category: "Motherboard Repair Lab",
    image_url: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1000&q=80",
    description: "High-precision BGA rework and thermal camera board diagnosis at Comtech Infosys Service Center.",
    location: "Comtech Infosys Lab, DangalPara",
    is_featured: true,
    created_at: "2026-01-06T00:00:00Z"
  },
  {
    id: "gal-3",
    title: "24-Port Server Rack & Structured Cat6 Cabling",
    category: "Server & Networking",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80",
    description: "Clean rack patch management, Gigabit smart switches, and firewall setup for an educational institution.",
    location: "District Training Institute, Birbhum",
    is_featured: true,
    created_at: "2026-01-07T00:00:00Z"
  },
  {
    id: "gal-4",
    title: "Comtech IT Retail & Hardware Showroom",
    category: "Showroom & Retail",
    image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80",
    description: "Genuine laptops, desktop accessories, Tally boxes, Quick Heal retail counter and demonstration area.",
    location: "New DangalPara, Suri",
    is_featured: true,
    created_at: "2026-01-08T00:00:00Z"
  },
  {
    id: "gal-5",
    title: "School Computer Lab 40-Seat Workstation Deployment",
    category: "Client Deployments",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    description: "Complete setup with Core i5 desktops, centralized antivirus server, and UPS power backup.",
    location: "Higher Secondary Academy, Birbhum",
    is_featured: true,
    created_at: "2026-01-09T00:00:00Z"
  },
  {
    id: "gal-6",
    title: "Optical Fiber Fusion Splicing & OTDR Testing",
    category: "Server & Networking",
    image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    description: "Low-loss core alignment fusion splicing for 4-core outdoor armored fiber cables.",
    location: "Industrial Estate, Suri",
    is_featured: false,
    created_at: "2026-01-10T00:00:00Z"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Anirban Mukherjee",
    designation: "Managing Director",
    company: "Aarogyam PolyClinic & Diagnostic Lab",
    location: "Suri, Birbhum",
    rating: 5,
    review: "Comtech Infosys installed our 16-channel ColorVu CCTV system and manages our clinic's entire IT network. Whenever an emergency arises, their engineer arrives within an hour. Outstanding local support!",
    service_type: "CCTV & IT AMC",
    is_featured: true,
    created_at: "2026-01-20T00:00:00Z"
  },
  {
    id: "test-2",
    name: "Rajesh Agarwal",
    designation: "Proprietor",
    company: "Maa Tara Traders (Wholesale & Retail)",
    location: "New DangalPara, Suri",
    rating: 5,
    review: "We have been buying Tally licenses, custom invoice TDLs and HP business laptops from Comtech Information Services for the last 8 years. 100% genuine products with fair pricing.",
    service_type: "Tally Prime & Hardware Sales",
    is_featured: true,
    created_at: "2026-01-22T00:00:00Z"
  },
  {
    id: "test-3",
    name: "Prof. S. K. Roy",
    designation: "Head of Administration",
    company: "Vivekananda Educational Trust",
    location: "Birbhum, WB",
    rating: 5,
    review: "When our principal's Dell XPS laptop motherboard shorted with critical examination records inside, authorized service center asked for a full board change. Comtech repaired the board in 24 hours at a fraction of the cost.",
    service_type: "Chip-Level Motherboard Lab",
    is_featured: true,
    created_at: "2026-01-25T00:00:00Z"
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: "enq-1",
    ticket_number: "COM-748921",
    name: "Subham Sen",
    phone: "9832145670",
    email: "subham.sen@gmail.com",
    type: "cctv_survey",
    service_or_product_name: "CCTV Surveillance & Security Automation",
    subject: "Requirement of 8 HD Cameras for warehouse",
    message: "Need a free site survey for our new godown located on Sainthia Road, Suri. Want night vision with mobile app view.",
    urgency: "urgent",
    status: "pending",
    admin_notes: "Customer called on morning. Scheduled site survey for tomorrow 3 PM.",
    created_at: "2026-02-18T11:45:00Z"
  },
  {
    id: "enq-2",
    ticket_number: "COM-619204",
    name: "Priyanka Mondal",
    phone: "9475189230",
    email: "pmondal.acc@yahoo.com",
    type: "product",
    service_or_product_name: "Tally Prime Silver Single-User Official License",
    subject: "New GST Business Registration - Tally Silver Quote",
    message: "Starting a new hardware store in Suri market. Please share best price for Tally Prime Silver + Barcode printing TDL.",
    urgency: "normal",
    status: "quoted",
    admin_notes: "Quotation sent via WhatsApp at ₹18,000 + GST. Waiting for GST certificate from customer.",
    created_at: "2026-02-17T15:20:00Z"
  },
  {
    id: "enq-3",
    ticket_number: "COM-883109",
    name: "Tapas Kumar Dey",
    phone: "9434055214",
    type: "service",
    service_or_product_name: "Chip-Level Laptop, Desktop & Printer Motherboard Lab",
    subject: "Lenovo ThinkPad no power issue",
    message: "Laptop suddenly died during thunder last night. Charging LED does not turn on. Need quick inspection.",
    urgency: "critical",
    status: "in_progress",
    admin_notes: "Board checked by lab technician. Primary 19V rail capacitor shorted. Replaced & under 4-hour burn test.",
    created_at: "2026-02-16T10:10:00Z"
  }
];
