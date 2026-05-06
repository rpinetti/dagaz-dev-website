import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Giscus from '@giscus/react';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import styles from './Article.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogData from '../data/blog.json';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ShareButtons } from '@/components/ShareButtons';

const Article = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [postContent, setPostContent] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const currentLang = i18n.language || 'pt';

  // Encontra os metadados no JSON
  const postsInLang = blogData[currentLang] || blogData['pt'];
  const postMetadata = postsInLang.find(p => p.id === id);

  useEffect(() => {
    if (postMetadata) {
      setLoading(true);
      fetch(postMetadata.contentFile)
        .then(res => res.text())
        .then(text => {
          setPostContent(text);
          setLoading(false);
        })
        .catch(err => {
          console.error("Erro ao carregar o artigo:", err);
          setLoading(false);
        });
    }
  }, [postMetadata]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
        <p className="text-muted-foreground uppercase tracking-widest text-xs font-code">Invocando pergaminho...</p>
      </div>
    );
  }

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
    "image": `https://dagaz.dev${postMetadata.image || '/og-image.jpg'}`,
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
        <ArrowLeft size={20} /> {t('nav.blog')}
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
        
        {/*
          IMPORTANTE: Configuração do Giscus!
          Você precisará instalar o App do Giscus no seu repositório GitHub e pegar as chaves.
          Acesse: https://giscus.app/pt para gerar as suas props exatas.
        */}
        <div className={styles.giscusWrapper}>
          <Giscus
            id="comments"
            repo="SEU_USUARIO/SEU_REPOSITORIO"
            repoId="R_kgDOM_PLACEHOLDER"
            category="Announcements"
            categoryId="DIC_kwDOM_PLACEHOLDER"
            mapping="pathname"
            term="Bem-vindo ao Blog da Dagaz!"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="transparent_dark"
            lang="pt"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
