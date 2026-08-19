'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { formatINR } from '@/lib/utils';
import {
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  Tag,
  CheckCircle2,
  XCircle,
  X,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CCTV & Security');
  const [brand, setBrand] = useState('Hikvision');
  const [sku, setSku] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [warranty, setWarranty] = useState('1 Year Brand Warranty');
  const [imageUrl, setImageUrl] = useState('');
  const [inStock, setInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [specsStr, setSpecsStr] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle('');
    setCategory('CCTV & Security');
    setBrand('Hikvision');
    setSku('');
    setShortDesc('');
    setDescription('');
    setPrice('');
    setDiscountPrice('');
    setWarranty('1 Year Brand Warranty');
    setImageUrl('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
    setInStock(true);
    setIsFeatured(false);
    setSpecsStr('Resolution: 1080P Full HD\nConnectivity: HDMI, VGA, LAN\nStorage: 1TB Surveillance HDD');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setCategory(p.category);
    setBrand(p.brand);
    setSku(p.sku || '');
    setShortDesc(p.short_description);
    setDescription(p.description);
    setPrice(p.price ? String(p.price) : '');
    setDiscountPrice(p.discount_price ? String(p.discount_price) : '');
    setWarranty(p.warranty || '1 Year Brand Warranty');
    setImageUrl(p.image_url);
    setInStock(p.in_stock);
    setIsFeatured(p.is_featured);
    const specsArray = Object.entries(p.specifications).map(([k, v]) => `${k}: ${v}`);
    setSpecsStr(specsArray.join('\n'));
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const specsObj: Record<string, string> = {};
    specsStr.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const k = parts[0].trim();
        const v = parts.slice(1).join(':').trim();
        if (k && v) specsObj[k] = v;
      }
    });

    const payload: Partial<Product> = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      title,
      category,
      brand,
      sku,
      short_description: shortDesc,
      description,
      price: price ? Number(price) : undefined,
      discount_price: discountPrice ? Number(discountPrice) : undefined,
      warranty,
      image_url: imageUrl,
      in_stock: inStock,
      is_featured: isFeatured,
      specifications: specsObj,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        loadProducts();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-400" />
            <span>Product &amp; Hardware Inventory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage catalog items, retail pricing, discounts, and brand specifications
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Pricing</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/30">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-12 h-12 rounded-lg object-contain bg-slate-800 shrink-0 p-1"
                    />
                    <div>
                      <div className="font-bold text-white line-clamp-1">{p.title}</div>
                      <div className="text-[10px] text-slate-500">{p.sku || 'No SKU'}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-300">{p.brand}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] font-semibold">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white">
                      {p.discount_price ? formatINR(p.discount_price) : formatINR(p.price)}
                    </div>
                    {p.price && p.discount_price && (
                      <div className="text-[10px] text-slate-500 line-through">
                        {formatINR(p.price)}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {p.in_stock ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        In Stock
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px]">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-heading text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Hikvision, HP, Dell, Tally"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  >
                    <option value="CCTV & Security">CCTV &amp; Security</option>
                    <option value="Software & Licenses">Software &amp; Licenses</option>
                    <option value="Laptops & Desktops">Laptops &amp; Desktops</option>
                    <option value="Antivirus & Cybersecurity">Antivirus &amp; Cybersecurity</option>
                    <option value="Networking & Accessories">Networking &amp; Accessories</option>
                    <option value="Printers & Peripherals">Printers &amp; Peripherals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    MRP / List Price (₹)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="15000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    placeholder="12500"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="HIK-CV-4CH"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Warranty Term
                  </label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="2 Years Brand Warranty"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <MediaUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Product Photo / Datasheet"
                description="Upload JPEG/PNG/PDF (Max 6MB Base64) or enter an external Web Image URL"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Summary
                </label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specifications (Format: &quot;Key: Value&quot; per line)
                </label>
                <textarea
                  rows={3}
                  value={specsStr}
                  onChange={(e) => setSpecsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>In Stock Available</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-blue-600"
                  />
                  <span>Featured on Home Page</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
