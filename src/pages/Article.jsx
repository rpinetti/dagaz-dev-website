import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Giscus from '@giscus/react';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import styles from './Article.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogData from '../data/blog.json';
import blogContent from '../data/blogContent.js';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ShareButtons } from '@/components/ShareButtons';

const Article = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt';

  // Encontra os metadados no JSON (build-time)
  const postsInLang = blogData[currentLang] || blogData['pt'];
  const postMetadata = postsInLang.find(p => p.id === id);

  // Busca o conteúdo do bundle gerado (sem fetch runtime)
  const contentKey = `${currentLang}/${id}`;
  const fallbackKey = `pt/${id}`;
  const postContent = blogContent[contentKey] || blogContent[fallbackKey] || '';

  if (!postMetadata || !postContent) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h2>Artigo não encontrado.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>O pergaminho se perdeu na forja ou não está disponível neste idioma.</p>
        <Link to="/blog" style={{ color: 'var(--color-viking-gold)', marginTop: '2rem', display: 'inline-block' }}>
          Voltar para A Forja
        </Link>
      </div>
    );
  }

  // Schema de Artigo (JSON-LD) para SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postMetadata.title,
    "description": postMetadata.desc || postMetadata.summary,
    "image": `https://dagaz.dev${postMetadata.image?.startsWith('http') ? '' : postMetadata.image || '/og-image.jpg'}`,
    "datePublished": postMetadata.date,
    "author": {
      "@type": "Person",
      "name": postMetadata.author || "Caio Dagaz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dagaz Dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dagaz.dev/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dagaz.dev/artigo/${id}`
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <SEO 
        title={postMetadata.title} 
        description={postMetadata.desc || postMetadata.summary} 
        url={`/artigo/${id}`}
        type="article"
        schema={articleSchema}
      />
      <Link to="/blog" className={styles.backLink}>
        <ArrowLeft size={20} /> {t('nav.insights')}
      </Link>

      <article className={styles.article}>
        {postMetadata.image && (
          <OptimizedImage src={postMetadata.image} alt={postMetadata.title} className={styles.headerImage} />
        )}
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{postMetadata.category || 'SAP'}</span>
            <span className={styles.date}>{postMetadata.date || ''} • {postMetadata.readingTime || ''} {t('blog.reading_time')}</span>
          </div>
          <h1 className={styles.title}>{postMetadata.title || 'Título Indefinido'}</h1>
        </header>

        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postContent}
          </ReactMarkdown>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <ShareButtons 
            title={postMetadata.title} 
            url={window.location.href}
            showLabels={true} 
          />
        </div>
      </article>

      <div className={styles.commentsSection}>
        <h3 className={styles.commentsTitle}>A Mesa Redonda</h3>
        <p className={styles.commentsDesc}>Deixe seu comentário, dúvida ou adicione sua experiência sobre o tema abaixo.</p>
        
        <div className={styles.giscusWrapper}>
          <Giscus
            id="comments"
            repo="rpinetti/dagaz-comments"
            repoId="R_kgDOSWF7RQ"
            category="Blog Comments"
            categoryId="INSIRA_O_CATEGORY_ID_AQUI"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="top"
            theme="preferred_color_scheme"
            lang="pt"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
