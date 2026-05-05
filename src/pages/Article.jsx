import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Giscus from '@giscus/react';
import { ArrowLeft } from 'lucide-react';
import styles from './Article.module.css';

// Carrega os arquivos para obtermos o conteúdo do Markdown dinamicamente
const mdxFiles = import.meta.glob('/src/content/blog/**/*.mdx', { eager: true });

const Article = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'pt';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Procura o arquivo exato baseado no idioma e no ID da URL
  const postPath = `/src/content/blog/${currentLang}/${id}.mdx`;
  const PostModule = mdxFiles[postPath];

  if (!PostModule) {
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

  const PostContent = PostModule.default;
  const frontmatter = PostModule.frontmatter || {};

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <Link to="/blog" className={styles.backLink}>
        <ArrowLeft size={20} /> {t('nav.blog')}
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{frontmatter.category || 'SAP'}</span>
            <span className={styles.date}>{frontmatter.date || ''} • {frontmatter.readingTime || ''} {t('blog.reading_time')}</span>
          </div>
          <h1 className={styles.title}>{frontmatter.title || 'Título Indefinido'}</h1>
        </header>

        <div className={styles.content}>
          <PostContent />
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
