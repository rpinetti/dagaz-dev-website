import React from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/cn';
import { formatRelativeDate } from '@/lib/formatters';

interface ProjectCardProps {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string | null;
  updated_at: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  html_url,
  stargazers_count,
  forks_count,
  language,
  updated_at,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-fjord-blue border border-fjord-blue-light rounded-xl p-6 flex flex-col gap-4 shadow-md',
        'hover:border-glacial-cyan hover:shadow-cyan transition-all duration-300',
        className
      )}
    >
      <div className="flex justify-between items-start gap-3">
        <Link href={html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          <svg className="w-5 h-5 text-glacial-cyan" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            {/* GitHub Icon SVG Path */}
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2.0 0 .15.21.55.14A7.98 7.98 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <h3 className="font-montserrat font-semibold text-lg text-glacial-cyan hover:text-viking-gold transition-colors">
            {name}
          </h3>
        </Link>
        <a href={html_url} target="_blank" rel="noopener noreferrer" className="text-viking-gold hover:text-glacial-cyan transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>

      <p className="font-lato text-sm text-forge-gray-light leading-relaxed line-clamp-2 flex-grow">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {language && <Badge variant="outline">{language}</Badge>}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-viking-gold border-t border-fjord-blue-light pt-4 mt-auto">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {/* Star Icon SVG Path */}
            <path fillRule="evenodd" d="M10.788 3.212a.75.75 0 011.424 0l2.077 4.212a.75.75 0 00.574.438l4.686.679a.75.75 0 01.416 1.279l-3.397 3.322a.75.75 0 00-.215.664l.805 4.661a.75.75 0 01-1.088.791L12 15.056l-4.183 2.201a.75.75 0 01-1.088-.79l.805-4.661a.75.75 0 00-.215-.664L3.212 9.82a.75.75 0 01.416-1.28l4.686-.679a.75.75 0 00.574-.438l2.077-4.212z" clipRule="evenodd" />
          </svg>
          {stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {/* Fork Icon SVG Path */}
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-2.72 2.72a.75.75 0 101.06 1.06L12 13.06l2.72 2.72a.75.75 0 101.06-1.06L13.06 12l2.72-2.72a.75.75 0 10-1.06-1.06L12 10.94l-2.72-2.72z" clipRule="evenodd" />
          </svg>
          {forks_count}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {formatRelativeDate(updated_at)}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;