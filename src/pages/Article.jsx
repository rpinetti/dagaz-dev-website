import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import styles from './Article.module.css';
import { wpService } from '../services/wpService';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ShareButtons } from '@/components/ShareButtons';
import Comments from '../components/Comments/Comments';

const Article = () => {
  const { id } = useParams(); // 'id' aqui é o slug do post
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const currentLang = i18n.language || 'pt';
        const data = await wpService.getPostBySlug(id, currentLang);
        setPost(data);
      } catch (err) {
        console.error("Erro ao carregar artigo do WordPress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, i18n.language]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-muted-foreground uppercase tracking-widest text-xs font-code">Invocando o conhecimento do WordPress...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h2>Artigo não encontrado.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>O pergaminho se perdeu na forja ou não está disponível neste idioma no WordPress.</p>
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
    "headline": post.title,
    "description": post.desc,
    "image": post.image?.startsWith('http') ? post.image : `https://dagaz.dev${post.image || '/og-image.jpg'}`,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "Dagaz Dev"
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
      "@id": `https://dagaz.dev/artigo/${post.id}`
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <SEO 
        title={post.title} 
        description={post.desc} 
        url={`/artigo/${post.id}`}
        type="article"
        schema={articleSchema}
      />
      <Link to="/blog" className={styles.backLink}>
        <ArrowLeft size={20} /> {t('nav.insights')}
      </Link>

      <article className={styles.article}>
        {post.image && (
          <OptimizedImage src={post.image} alt={post.title} className={styles.headerImage} />
        )}
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{post.date} • {post.readingTime}</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
        </header>

        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div className="mt-12 border-t border-border pt-8">
          <ShareButtons 
            title={post.title} 
            url={window.location.href}
            showLabels={true} 
          />
        </div>
      </article>

      <div className={styles.commentsSection}>
        <Comments postId={post.wp_id} />
      </div>
    </div>
  );
};

export default Article;
