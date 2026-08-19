'use client';

import React from 'react';
import Link from 'next/link';
import { Blog } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { BookOpen, Clock, ArrowRight, User } from 'lucide-react';

interface LatestBlogsProps {
  blogs: Blog[];
}

export function LatestBlogsSection({ blogs }: LatestBlogsProps) {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Knowledge Center &amp; Guides</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Latest Technology Insights
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Practical guides on CCTV cameras, Tally cloud migration, motherboard diagnostics, and cybersecurity.
            </p>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-slate-900/80 text-cyan-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-500" />
                      {blog.reading_time_minutes} min read
                    </span>
                    <span>•</span>
                    <span>{formatDate(blog.published_at)}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
