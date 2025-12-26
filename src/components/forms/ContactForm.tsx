'use client';

import React, { useState, FormEvent } from 'react';
import { sendContactEmail } from '@/app/contact/actions';
import Button from '@/components/ui/Button';

interface FormState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ loading: true, error: null, success: false });

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setFormState({ loading: false, error: null, success: true });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setFormState({ loading: false, error: null, success: false }), 5000);
      } else {
        setFormState({ loading: false, error: result.error || 'Erro ao enviar mensagem', success: false });
      }
    } catch (err) {
      setFormState({
        loading: false,
        error: 'Erro ao enviar mensagem. Tente novamente.',
        success: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {formState.success && (
        <div className="bg-success/20 border border-success text-success p-4 rounded-lg">
          ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      {formState.error && (
        <div className="bg-error/20 border border-error text-error p-4 rounded-lg">
          ✗ {formState.error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block font-montserrat font-semibold text-glacial-cyan mb-2">
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-fjord-blue border border-fjord-blue-light rounded-lg font-lato text-runic-white placeholder-forge-gray-light focus:outline-none focus:border-glacial-cyan focus:ring-2 focus:ring-glacial-cyan/30 transition-all"
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-montserrat font-semibold text-glacial-cyan mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-fjord-blue border border-fjord-blue-light rounded-lg font-lato text-runic-white placeholder-forge-gray-light focus:outline-none focus:border-glacial-cyan focus:ring-2 focus:ring-glacial-cyan/30 transition-all"
          placeholder="seu.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-montserrat font-semibold text-glacial-cyan mb-2">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-fjord-blue border border-fjord-blue-light rounded-lg font-lato text-runic-white placeholder-forge-gray-light focus:outline-none focus:border-glacial-cyan focus:ring-2 focus:ring-glacial-cyan/30 transition-all"
          placeholder="Assunto da mensagem"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-montserrat font-semibold text-glacial-cyan mb-2">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-fjord-blue border border-fjord-blue-light rounded-lg font-lato text-runic-white placeholder-forge-gray-light focus:outline-none focus:border-glacial-cyan focus:ring-2 focus:ring-glacial-cyan/30 transition-all resize-none"
          placeholder="Escreva sua mensagem aqui..."
        />
      </div>

      <div className="flex gap-4 justify-center">
        <Button type="submit" variant="primary" size="lg" disabled={formState.loading} className="min-w-48">
          {formState.loading ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
          disabled={formState.loading}
        >
          Limpar
        </Button>
      </div>
    </form>
  );
}
