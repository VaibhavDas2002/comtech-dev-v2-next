'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface MediaUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  allowPdf?: boolean;
}

const MAX_BYTES = 6 * 1024 * 1024; // 6 MB

export function MediaUploader({
  value,
  onChange,
  label = 'Media / Document Attachment',
  description = 'Upload an Image or PDF (Max 6MB Base64) or enter an external Web URL',
  allowPdf = true,
}: MediaUploaderProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>(
    value && !value.startsWith('/api/documents') && !value.startsWith('data:') ? 'url' : 'upload'
  );
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPdf =
    value?.toLowerCase().endsWith('.pdf') ||
    value?.includes('application/pdf') ||
    (value && value.includes('/api/documents/') && value.toLowerCase().includes('.pdf'));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate size (6 MB)
    if (file.size > MAX_BYTES) {
      setErrorMessage(
        `File size ${(file.size / (1024 * 1024)).toFixed(2)} MB exceeds the maximum 6 MB limit.`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate MIME type
    const mime = file.type.toLowerCase();
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowPdf) validMimes.push('application/pdf');

    if (!validMimes.includes(mime)) {
      setErrorMessage(
        `Invalid file type "${file.type}". Please select a JPEG, PNG, WEBP, or PDF file.`
      );
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsUploading(true);

    try {
      // Read as Base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        // Post to /api/documents to save in document_image table
        const res = await fetch('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file_name: file.name,
            mime_type: file.type,
            base64_data: base64Data,
          }),
        });

        const data = await res.json();
        if (data.success && data.url) {
          onChange(data.url);
          setSuccessMessage(
            `Stored "${file.name}" in document_image table (${(file.size / 1024).toFixed(1)} KB Base64).`
          );
        } else {
          setErrorMessage(data.error || 'Failed to upload document');
        }
        setIsUploading(false);
      };

      reader.onerror = () => {
        setErrorMessage('Failed to read file from local disk.');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload error';
      setErrorMessage(msg);
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    onChange('');
    setErrorMessage(null);
    setSuccessMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-white font-heading">
            {label}
          </label>
          <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              activeTab === 'upload'
                ? 'bg-[#7B1B5A] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File (Base64)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
              activeTab === 'url'
                ? 'bg-[#7B1B5A] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Web Link / URL</span>
          </button>
        </div>
      </div>

      {/* Upload Mode */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-6 text-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-950/80 group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className="hidden"
            />
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-[#E9A51A]">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="text-xs font-semibold">Encoding to Base64 &amp; Storing in DB...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-slate-800 text-[#E9A51A] group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-white">
                  Click or drag file to upload
                </div>
                <div className="text-[11px] text-slate-400">
                  JPEG, PNG, WebP or PDF (Max 6 MB)
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* URL Mode */}
      {activeTab === 'url' && (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/... or https://..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      )}

      {/* Status Alerts */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#c44a8a]/10 border border-[#c44a8a]/25 text-[#c44a8a] text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Live Decoded Preview */}
      {value && (
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            {isPdf ? (
              <div className="w-14 h-14 rounded-lg bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center text-red-400 shrink-0">
                <FileText className="w-6 h-6" />
                <span className="text-[9px] font-bold uppercase mt-0.5">PDF</span>
              </div>
            ) : (
              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                <img
                  src={value}
                  alt="Decoded Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="overflow-hidden">
              <span className="text-[10px] uppercase font-bold text-[#E9A51A] block">
                {isPdf ? 'Decoded PDF Document' : 'Decoded Image Preview'}
              </span>
              <span className="text-xs text-white font-mono truncate block max-w-sm">
                {value}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              title="Open full decoded file in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
              title="Remove media"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

