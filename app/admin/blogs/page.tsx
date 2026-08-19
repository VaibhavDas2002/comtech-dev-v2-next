'use client';

import React, { useState, useEffect } from 'react';
import { Blog } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Clock,
  X,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Security Guides');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('Technical Team');
  const [authorRole, setAuthorRole] = useState('Lead Systems Engineer');
  const [tagsStr, setTagsStr] = useState('CCTV, Hikvision, Security');
  const [readingTime, setReadingTime] = useState('5');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const openCreateModal = () => {
    setEditingBlog(null);
    setTitle('');
    setCategory('Security Guides');
    setExcerpt('');
    setContent('### Introduction\n\nWrite your guide content here...\n\n### Key Tips:\n- Step 1\n- Step 2');
    setImageUrl('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80');
    setAuthor('Technical Team');
    setAuthorRole('Lead Systems Engineer');
    setTagsStr('CCTV, Hikvision, Security');
    setReadingTime('5');
    setIsPublished(true);
    setIsFeatured(false);
    setModalOpen(true);
  };

  const openEditModal = (b: Blog) => {
    setEditingBlog(b);
    setTitle(b.title);
    setCategory(b.category);
    setExcerpt(b.excerpt);
    setContent(b.content);
    setImageUrl(b.image_url);
    setAuthor(b.author);
    setAuthorRole(b.author_role);
    setTagsStr(b.tags.join(', '));
    setReadingTime(String(b.reading_time_minutes));
    setIsPublished(b.is_published);
    setIsFeatured(b.is_featured);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<Blog> = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title,
      category,
      excerpt,
      content,
      image_url: imageUrl,
      author,
      author_role: authorRole,
      tags,
      reading_time_minutes: Number(readingTime) || 5,
      is_published: isPublished,
      is_featured: isFeatured,
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        loadBlogs();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <span>Tech Guides &amp; Blog Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish knowledgebase articles, SEO guides, tutorials and tutorials
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Published Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/30">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={b.image_url}
                      alt={b.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                    />
                    <div>
                      <div className="font-bold text-white line-clamp-1">{b.title}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <span>{b.reading_time_minutes} min read</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300 text-[10px] font-semibold">
                      {b.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{b.author}</td>
                  <td className="p-4 text-slate-400">{formatDate(b.published_at)}</td>
                  <td className="p-4">
                    {b.is_published ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(b)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
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
                {editingBlog ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
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
                    <option value="Security Guides">Security Guides</option>
                    <option value="Accounting & ERP">Accounting &amp; ERP</option>
                    <option value="Hardware Diagnostics">Hardware Diagnostics</option>
                    <option value="Cloud & Networking">Cloud &amp; Networking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Reading Time (Min)
                  </label>
                  <input
                    type="number"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <MediaUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Article Cover Image / Document PDF"
                description="Upload JPEG/PNG/PDF (Max 6MB Base64) or enter an external Web Image URL"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Short Excerpt / Meta Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Article Body (Supports Markdown formatting) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="CCTV, Hikvision, Security, Suri"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-purple-600"
                  />
                  <span>Published on Public Website</span>
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
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
