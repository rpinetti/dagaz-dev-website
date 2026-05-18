const BASE_URL = import.meta.env.VITE_WP_API_URL || 'https://cms.dagaz.dev/wp-json';

/**
 * WordPress API Service
 */
export const wpService = {
  /**
   * Fetch posts with optional filters
   * @param {Object} options - { lang, category, search, per_page }
   */
  async getPosts({ lang = 'pt', category = null, search = '', per_page = 10 } = {}) {
    const url = new URL(`${BASE_URL}/wp/v2/posts`);
    
    // Filtros básicos
    url.searchParams.append('_embed', 'true'); // Traz imagens e metadados
    url.searchParams.append('per_page', per_page);
    
    if (search) url.searchParams.append('search', search);
    if (category && category !== 'all') {
      // Nota: Categorias no WP usam ID numérico. 
      // Se você passar a chave 'sap', precisaremos mapear para o ID do WP.
      // Por enquanto, passamos direto.
      url.searchParams.append('category_name', category);
    }
    
    // Suporte a Polylang/WPML (ajuste conforme o plugin)
    url.searchParams.append('lang', lang);

    try {
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Falha ao carregar posts');
      const posts = await response.json();
      
      return posts.map(post => this.formatPost(post));
    } catch (error) {
      console.error('Erro no wpService.getPosts:', error);
      return [];
    }
  },

  /**
   * Fetch a single post by its slug
   */
  async getPostBySlug(slug, lang = 'pt') {
    const url = new URL(`${BASE_URL}/wp/v2/posts`);
    url.searchParams.append('slug', slug);
    url.searchParams.append('_embed', 'true');
    url.searchParams.append('lang', lang);

    try {
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Falha ao carregar artigo');
      const posts = await response.json();
      
      if (posts.length === 0) return null;
      return this.formatPost(posts[0]);
    } catch (error) {
      console.error('Erro no wpService.getPostBySlug:', error);
      return null;
    }
  },

  /**
   * Fetch comments for a specific post
   */
  async getComments(postId) {
    const url = new URL(`${BASE_URL}/wp/v2/comments`);
    url.searchParams.append('post', postId);
    url.searchParams.append('per_page', 100);
    url.searchParams.append('order', 'asc');

    try {
      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Falha ao carregar comentários');
      const comments = await response.json();
      
      return comments.map(comment => ({
        id: comment.id,
        author: comment.author_name,
        date: new Date(comment.date).toLocaleDateString('pt-BR'),
        content: comment.content.rendered,
        avatar: comment.author_avatar_urls?.['96'] || null
      }));
    } catch (error) {
      console.error('Erro no wpService.getComments:', error);
      return [];
    }
  },

  /**
   * Submit a new comment
   */
  async submitComment({ postId, name, email, content }) {
    try {
      const response = await fetch(`${BASE_URL}/wp/v2/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: postId,
          author_name: name,
          author_email: email,
          content: content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar comentário');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erro no wpService.submitComment:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Captura lead de e-mail (Newsletter / E-book / Comentários)
   */
  async submitLead(email, source = 'home', name = '') {
    try {
      const response = await fetch(`${BASE_URL}/dagaz/v1/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar e-mail');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erro no wpService.submitLead:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Helper to format WP response to our frontend format
   */
  formatPost(wpPost) {
    // Busca a imagem destacada (featured media)
    const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredMedia?.source_url || '/og-image.jpg';

    return {
      id: wpPost.slug, // Usamos o slug como ID para as rotas do frontend
      wp_id: wpPost.id,
      title: wpPost.title?.rendered,
      desc: wpPost.excerpt?.rendered?.replace(/<[^>]*>/g, ''), // Remove HTML do resumo
      content: wpPost.content?.rendered,
      date: new Date(wpPost.date).toLocaleDateString('pt-BR'),
      image: imageUrl,
      category: wpPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights',
      categoryKey: wpPost._embedded?.['wp:term']?.[0]?.[0]?.slug || 'all',
      readingTime: Math.ceil(wpPost.content?.rendered?.split(' ').length / 200) + ' min',
      author: wpPost._embedded?.['author']?.[0]?.name || 'Dagaz Dev'
    };
  }
};
