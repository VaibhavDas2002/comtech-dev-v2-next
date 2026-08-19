'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Search,
  HardDrive,
  CheckSquare,
  Square,
  X,
  CheckCircle2,
} from 'lucide-react';
import { MediaUploader } from '@/components/ui/MediaUploader';

interface DocumentItem {
  id: string;
  file_name: string;
  mime_type: string;
  file_size_bytes: number;
  created_at: string;
  url: string;
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadValue, setUploadValue] = useState('');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  async function loadDocuments() {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleCopyUrl = (url: string, id: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stored Base64 document?')) return;
    try {
      await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      showToast('Document deleted');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length && filtered.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((d) => d.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`CONFIRM: Delete ${selectedIds.length} Base64 documents from table?`)) return;

    try {
      for (const id of selectedIds) {
        await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      }
      setDocuments((prev) => prev.filter((d) => !selectedIds.includes(d.id)));
      showToast(`${selectedIds.length} documents deleted`);
      setSelectedIds([]);
    } catch {
      alert('Error during bulk deletion');
    }
  };

  const filtered = documents.filter((d) =>
    d.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.mime_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBytes = documents.reduce((acc, curr) => acc + (curr.file_size_bytes || 0), 0);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-[#E9A51A]" />
            <span>Document &amp; Base64 Image Storage</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centralized table storing encoded PDFs, JPEGs, PNGs (Max 6MB) with real-time stream decoding
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Total Stored: </span>
            <span className="font-bold text-[#E9A51A]">
              {(totalBytes / (1024 * 1024)).toFixed(2)} MB ({documents.length} Files)
            </span>
          </div>
        </div>
      </div>

      {/* Upload Box */}
      <MediaUploader
        value={uploadValue}
        onChange={(url) => {
          setUploadValue(url);
          loadDocuments();
        }}
        label="Upload New File to document_image Table"
        description="Select any JPEG, PNG, WEBP, or PDF up to 6MB. It will be converted to Base64 with MIME type stored in PostgreSQL."
      />

      {/* Bulk Action Sticky Bar */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1f0516] border border-[#E9A51A]/40 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-[#E9A51A] text-slate-950 font-black text-xs font-mono">
              {selectedIds.length} Files Selected
            </span>
            <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
              Media Bulk Actions:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkDelete}
              className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete Files</span>
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

      {/* Documents Library */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold font-heading text-white">
              Stored Documents &amp; Media ({filtered.length})
            </h2>
            <button
              onClick={toggleSelectAll}
              className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {selectedIds.length === filtered.length && filtered.length > 0 ? (
                <CheckSquare className="w-3.5 h-3.5 text-[#E9A51A]" />
              ) : (
                <Square className="w-3.5 h-3.5" />
              )}
              <span>{selectedIds.length === filtered.length && filtered.length > 0 ? 'Deselect All' : 'Select All'}</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by file name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none focus:border-[#7B1B5A]"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading stored documents...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 glass-card rounded-2xl">
            No documents stored yet. Use the uploader above to add your first Base64 file.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => {
              const isPdf = doc.mime_type.includes('pdf');
              const isSelected = selectedIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className={`p-5 rounded-2xl bg-slate-900 border space-y-4 flex flex-col justify-between transition-all shadow-xl ${
                    isSelected ? 'border-[#E9A51A] bg-[#22071a]' : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Visual Preview with Select Checkbox */}
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                      <button
                        onClick={() => toggleSelectOne(doc.id)}
                        className="absolute top-2 right-2 z-10 p-1 rounded-lg bg-black/60 hover:bg-black/90 cursor-pointer"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-[#E9A51A]" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 hover:text-white" />
                        )}
                      </button>

                      {isPdf ? (
                        <div className="flex flex-col items-center gap-2 text-red-400">
                          <FileText className="w-12 h-12" />
                          <span className="text-xs font-bold font-mono">PDF DOCUMENT</span>
                        </div>
                      ) : (
                        <img
                          src={doc.url}
                          alt={doc.file_name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-bold text-[#E9A51A] border border-slate-700">
                        {doc.mime_type}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white line-clamp-1">
                        {doc.file_name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>{(doc.file_size_bytes / 1024).toFixed(1)} KB</span>
                        <span>•</span>
                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyUrl(doc.url, doc.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#E9A51A] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {copiedId === doc.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied URL</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View decoded file"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 cursor-pointer"
                        title="Delete from document_image table"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
