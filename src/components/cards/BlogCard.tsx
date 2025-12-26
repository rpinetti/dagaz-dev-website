import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { formatRelativeDate } from '@/lib/formatters';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  views?: number;
  category: string;
  imageUrl?: string;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  excerpt,
  date,
  readingTime,
  views,
  category,
  imageUrl,
  className,
}) => {
  return (
    <article
      className={cn(
        'bg-fjord-blue border-l-4 border-viking-gold rounded-xl overflow-hidden flex flex-col h-full shadow-md',
        'hover:border-glacial-cyan hover:shadow-cyan transition-all duration-300',
        className
      )}
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative w-full h-48 bg-fjord-blue-light overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <Badge variant="primary" className="absolute top-4 right-4 z-10">
            {category}
          </Badge>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/blog/${slug}`} className="block">
          <h3 className="font-montserrat font-semibold text-xl text-viking-gold leading-tight hover:text-glacial-cyan transition-colors mb-3">
            {title}
          </h3>
        </Link>
        <p className="font-lato text-sm text-forge-gray-light leading-relaxed mb-4 line-clamp-3 flex-grow">
          {excerpt}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-glacial-cyan border-t border-fjord-blue-light pt-4 mt-auto">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {formatRelativeDate(date)}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {readingTime} min de leitura
          </span>
          {views && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              {views} views
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;