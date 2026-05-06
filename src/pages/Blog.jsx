import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Card from '../components/Card/Card';
import SEO from '../components/SEO';
import styles from './Blog.module.css';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('all');
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do blog dinamicamente
  useEffect(() => {
    fetch('/content/blog.json')
      .then(res => res.json())
      .then(data => {
        const postsArray = Object.entries(data).flatMap(([lang, posts]) => {
          return posts.map(post => ({
            ...post,
            lang
          }));
        });
        setAllPosts(postsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar blog.json:", err);
        setLoading(false);
      });
  }, []);

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

  // Filtra primeiro pelo idioma atual, depois por busca e categoria
  const filteredPosts = allPosts.filter(post => {
    // 1. Filtro de idioma
    const currentLang = i18n.language || 'pt';
    if (post.lang !== currentLang) return false;

    // 2. Filtro de busca
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.desc.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 3. Filtro de categoria
    // Nota: o categoryKey do MDX pode não bater exatamente com as chaves (ex: "Desenvolvimento"), 
    // precisaremos mapear isso melhor depois, ou considerar "all" como default para fallback
    const matchesCategory = activeCategory === 'all' || post.categoryKey.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <SEO 
        title={t('nav.insights')} 
        description={t('blog.description')} 
        url="/blog"
      />
      <h1 style={{ marginBottom: '0.5rem' }}>{t('nav.insights')}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Artigos, tutoriais e reflexões sobre SAP, desenvolvimento e carreira.
      </p>

      {/* Busca */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder={t('blog.search_placeholder')} 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          <p className="text-muted-foreground uppercase tracking-widest text-xs font-code">Lendo as Runas...</p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {filteredPosts.map(post => (
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
          <p>Tente buscar por outras palavras-chave ou categorias.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
