import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DataService } from '@/lib/store/dataService';
import { formatDate } from '@/lib/utils';
import {
  Clock,
  User,
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = await DataService.getBlogBySlug(slug);
  if (!blog) return { title: 'Article Not Found | Comtech' };
  return {
    title: `${blog.meta_title || blog.title} | Comtech Knowledge Center`,
    description: blog.meta_description || blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = await DataService.getBlogBySlug(slug);
  if (!blog) {
    notFound();
  }

  const allBlogs = await DataService.getBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 2);

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
              {blog.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-white leading-[1.2]">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-cyan-500" />
              <span>{blog.author} ({blog.author_role})</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>{formatDate(blog.published_at)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{blog.reading_time_minutes} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[450px]">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl font-bold font-heading text-slate-900 dark:text-white pt-4">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
              const items = paragraph.split('\n');
              return (
                <ul key={index} className="list-disc pl-5 space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^[-*]\s*/, '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-semibold">Tags:</span>
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-700 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold font-heading">
              Need Professional Implementation in Suri?
            </h3>
            <p className="text-xs text-cyan-100">
              Our engineers provide free on-site survey and tailored quotations for businesses across Birbhum.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-xs shadow-lg hover:bg-cyan-50 transition-colors whitespace-nowrap"
          >
            Contact Suri Team
          </Link>
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="pt-8 space-y-4">
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="glass-card rounded-xl p-4 flex gap-4 items-center group border border-slate-200 dark:border-slate-800"
                >
                  <img
                    src={rel.image_url}
                    alt={rel.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {formatDate(rel.published_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
