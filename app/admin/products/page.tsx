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
  CheckSquare,
  Square,
  PackageCheck,
  PackageX,
  Star,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

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

  // Toggle selection
  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length && products.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  // Bulk Actions
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`CONFIRM: Delete ${selectedIds.length} selected product(s)?`)) return;

    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    showToast(`${selectedIds.length} products deleted`);
    setSelectedIds([]);
  };

  const handleBulkStockToggle = (status: boolean) => {
    if (selectedIds.length === 0) return;
    setProducts((prev) =>
      prev.map((p) => (selectedIds.includes(p.id) ? { ...p, in_stock: status } : p))
    );
    showToast(`Marked ${selectedIds.length} products as ${status ? 'In Stock' : 'Out of Stock'}`);
    setSelectedIds([]);
  };

  const handleBulkFeaturedToggle = (status: boolean) => {
    if (selectedIds.length === 0) return;
    setProducts((prev) =>
      prev.map((p) => (selectedIds.includes(p.id) ? { ...p, is_featured: status } : p))
    );
    showToast(`Updated featured status for ${selectedIds.length} products`);
    setSelectedIds([]);
  };

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
    const specsArray = Object.entries(p.specifications || {}).map(([k, v]) => `${k}: ${v}`);
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
        showToast('Product saved successfully');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#E9A51A]" />
            <span>Product &amp; Hardware Inventory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage catalog items, retail pricing, discounts, and brand specifications
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold text-xs shadow-lg transition-all cursor-pointer hover:opacity-95"
          style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Bulk Action Sticky Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1f0516] border border-[#E9A51A]/40 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E9A51A] text-slate-950 font-black text-xs font-mono">
              {selectedIds.length} Products Selected
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              Inventory Bulk Actions:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkStockToggle(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Mark In-Stock</span>
            </button>

            <button
              onClick={() => handleBulkStockToggle(false)}
              className="px-3 py-1.5 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/30 hover:bg-amber-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PackageX className="w-3.5 h-3.5" />
              <span>Mark Out-of-Stock</span>
            </button>

            <button
              onClick={() => handleBulkFeaturedToggle(true)}
              className="px-3 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-[#E9A51A]" />
              <span>Feature on Home</span>
            </button>

            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 w-10 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="cursor-pointer text-slate-400 hover:text-white"
                    title="Select / Deselect All"
                  >
                    {selectedIds.length === products.length && products.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Pricing</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {products.map((p) => {
                const isSelected = selectedIds.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-[#2b0820]/60' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleSelectOne(p.id)}
                        className="cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                        )}
                      </button>
                    </td>

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
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[#E9A51A] text-[10px] font-semibold">
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
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          In Stock
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] border border-red-500/30">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Catalog Product' : 'Add New Hardware / License'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="CCTV & Security">CCTV & Security</option>
                    <option value="Software & Tally">Software & Tally</option>
                    <option value="Laptops & Desktops">Laptops & Desktops</option>
                    <option value="Networking & Accessories">Networking & Accessories</option>
                    <option value="Printers & Peripherals">Printers & Peripherals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Offer / Discount Price (₹)</label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <MediaUploader
                  value={imageUrl}
                  onChange={setImageUrl}
                  label="Product Thumbnail (Base64 Database or URL)"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500"
                  />
                  <span>Product is In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white font-bold text-xs shadow-lg cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #7B1B5A 0%, #a82479 100%)' }}
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
