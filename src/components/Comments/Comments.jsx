import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { wpService } from '../../services/wpService';
import styles from './Comments.module.css';
import { MessageSquare, Send, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Comments = ({ postId }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });

  const fetchComments = async () => {
    setLoading(true);
    const data = await wpService.getComments(postId);
    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) {
      toast.error(t('comments.error_fields') || 'Por favor, preencha todos os campos.');
      return;
    }

    setSubmitting(true);
    const result = await wpService.submitComment({
      postId,
      name: formData.name,
      email: formData.email,
      content: formData.content
    });

    if (result.success) {
      toast.success(t('comments.success') || 'Comentário enviado! Aguardando moderação.');
      
      // Captura o lead automaticamente em segundo plano
      wpService.submitLead(formData.email, 'blog_comment', formData.name)
        .catch(err => console.error('Erro ao capturar lead do comentário:', err));

      setFormData({ name: '', email: '', content: '' });
      // Se o WordPress permitir comentários imediatos, poderíamos recarregar aqui
      // fetchComments(); 
    } else {
      toast.error(result.error || t('comments.error_submit') || 'Erro ao enviar comentário.');
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <MessageSquare size={24} className="text-primary" />
        {t('comments.title') || 'A Mesa Redonda'}
      </h3>
      <p className={styles.description}>
        {t('comments.description') || 'Deixe seu comentário, dúvida ou adicione sua experiência sobre o tema abaixo.'}
      </p>

      {/* Formulário de Comentário */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div className={styles.field}>
            <label htmlFor="name">{t('comments.label_name') || 'Nome'}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('comments.placeholder_name') || 'Seu nome'}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">{t('comments.label_email') || 'E-mail'}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('comments.placeholder_email') || 'seu@email.com'}
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="content">{t('comments.label_content') || 'Mensagem'}</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder={t('comments.placeholder_content') || 'O que você achou deste pergaminho?'}
            rows={4}
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? (
            <span className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
          ) : (
            <Send size={18} />
          )}
          {submitting ? t('comments.btn_submitting') || 'Enviando...' : t('comments.btn_submit') || 'Publicar Comentário'}
        </button>
      </form>

      {/* Lista de Comentários */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loader}>
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    {comment.avatar ? (
                      <img src={comment.avatar} alt={comment.author} />
                    ) : (
                      <User size={20} />
                    )}
                  </div>
                  <span className={styles.authorName}>{comment.author}</span>
                </div>
                <div className={styles.dateInfo}>
                  <Calendar size={14} />
                  <span>{comment.date}</span>
                </div>
              </div>
              <div 
                className={styles.commentContent}
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            <p>{t('comments.no_comments') || 'Ainda não há comentários nesta forja. Seja o primeiro!'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
