import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Card from '../components/Card/Card';
import SEO from '../components/SEO';
import styles from './Blog.module.css';
import { wpService } from '../services/wpService';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do WordPress sempre que o idioma, busca ou categoria mudar
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const currentLang = i18n.language || 'pt';
        const data = await wpService.getPosts({
          lang: currentLang,
          search: searchTerm,
          category: activeCategory !== 'all' ? activeCategory : null,
          per_page: 20
        });
        setPosts(data);
      } catch (err) {
        console.error("Erro ao carregar posts do WordPress:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchPosts, 300); // Debounce para busca
    return () => clearTimeout(timeoutId);
  }, [i18n.language, searchTerm, activeCategory]);

  // Sincroniza o termo de busca quando o parâmetro da URL muda
  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const categories = [
    { key: 'all', label: t('blog.categories.all') },
    { key: 'sap', label: t('blog.categories.sap') },
    { key: 'abap', label: t('blog.categories.abap') },
    { key: 'career', label: t('blog.categories.career') },
    { key: 'leadership', label: t('blog.categories.leadership') },
  ];

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <SEO 
        title={t('nav.insights')} 
        description={t('blog.description')} 
        url="/blog"
      />
      <h1 style={{ marginBottom: '0.5rem' }}>{t('nav.insights')}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        {t('blog.subtitle') || 'Artigos, tutoriais e reflexões sobre SAP, desenvolvimento e carreira.'}
      </p>

      {/* Busca */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder={t('blog.search_placeholder')} 
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Categorias (Pills) */}
      <div className={styles.categoriesWrapper}>
        {categories.map(cat => (
          <button 
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`${styles.categoryPill} ${activeCategory === cat.key ? styles.active : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-code">Lendo as Runas do WordPress...</p>
        </div>
      ) : posts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {posts.map(post => (
            <Card 
              key={post.id}
              title={post.title} 
              subtitle={`${post.date} • ${post.readingTime} ${t('blog.reading_time')}`}
              onClick={() => window.location.href = `/artigo/${post.id}`}
            >
              <p style={{ marginBottom: '1rem' }}>{post.desc}</p>
              <span className="text-highlight" style={{ fontSize: '0.875rem', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>{t('blog.read_more')} &rarr;</span>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3>Nenhum pergaminho encontrado na forja.</h3>
          <p>Tente buscar por outras palavras-chave ou categorias no WordPress.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
