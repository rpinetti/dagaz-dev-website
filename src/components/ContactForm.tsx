import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { trackFormSubmit } from '@/services/analytics';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
}

/**
 * Componente de formulário de contato interativo
 * Filosofia visual: Runic Cyber-Forge
 * - Validação em tempo real
 * - Feedback visual elegante
 * - Suporte a múltiplos idiomas
 */
export function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceOptions = [
    { value: 'strategy', label: t('services.items.strategy.title') },
    { value: 'development', label: t('services.items.development.title') },
    { value: 'integration', label: t('services.items.integration.title') },
    { value: 'consulting', label: t('services.items.consulting.title') },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }

    if (!formData.service) {
      newErrors.service = 'Selecione um serviço';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpar erro do campo ao começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
    if (errors.service) {
      setErrors((prev) => ({ ...prev, service: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simular envio do formulário
      // Em produção, isso seria uma chamada à API real
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log dos dados (em produção, seria enviado para um servidor)
      console.log('Formulário enviado:', formData);

      setSubmitStatus('success');
      setShowSuccess(true);
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      
      // Rastrear envio bem-sucedido
      trackFormSubmit('contact_form', 'success');

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      });

      // Fechar mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setShowSuccess(false);
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error('Erro ao enviar formulário:', error);
      
      // Rastrear erro
      trackFormSubmit('contact_form', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Mensagem de Sucesso */}
      {showSuccess && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 border border-green-500/30 bg-green-500/10 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-heading text-sm font-bold text-green-100">Mensagem enviada com sucesso!</p>
              <p className="mt-1 text-sm text-green-200">Obrigado pelo contato. Entraremos em contato em breve.</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="flex-shrink-0 text-green-400 hover:text-green-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block font-code text-[10px] uppercase tracking-[0.2em] text-slate-300 mb-2">
            Nome completo
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Seu nome"
            className={`bg-white/[0.05] border ${
              errors.name ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.08]`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 flex items-center gap-1 font-code text-[10px] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-code text-[10px] uppercase tracking-[0.2em] text-slate-300 mb-2">
            Email corporativo
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu.email@empresa.com"
            className={`bg-white/[0.05] border ${
              errors.email ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.08]`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 flex items-center gap-1 font-code text-[10px] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Empresa */}
        <div>
          <label htmlFor="company" className="block font-code text-[10px] uppercase tracking-[0.2em] text-slate-300 mb-2">
            Empresa
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            placeholder="Nome da sua empresa"
            className={`bg-white/[0.05] border ${
              errors.company ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.08]`}
            disabled={isSubmitting}
          />
          {errors.company && (
            <p className="mt-1 flex items-center gap-1 font-code text-[10px] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.company}
            </p>
          )}
        </div>

        {/* Serviço */}
        <div>
          <label htmlFor="service" className="block font-code text-[10px] uppercase tracking-[0.2em] text-slate-300 mb-2">
            Serviço de interesse
          </label>
          <Select value={formData.service} onValueChange={handleServiceChange} disabled={isSubmitting}>
            <SelectTrigger
              id="service"
              className={`bg-white/[0.05] border ${
                errors.service ? 'border-red-500/50' : 'border-white/10'
              } text-white focus:border-cyan-300/50 focus:bg-white/[0.08]`}
            >
              <SelectValue placeholder="Selecione um serviço" />
            </SelectTrigger>
            <SelectContent className="bg-[#06101b] border-white/10">
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="mt-1 flex items-center gap-1 font-code text-[10px] text-red-400">
              <AlertCircle className="h-3 w-3" /> {errors.service}
            </p>
          )}
        </div>

        {/* Mensagem */}
        <div>
          <label htmlFor="message" className="block font-code text-[10px] uppercase tracking-[0.2em] text-slate-300 mb-2">
            Mensagem
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Conte-nos sobre seu projeto e desafios..."
            rows={5}
            className={`bg-white/[0.05] border ${
              errors.message ? 'border-red-500/50' : 'border-white/10'
            } text-white placeholder-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.08] resize-none`}
            disabled={isSubmitting}
          />
          <div className="mt-2 flex justify-between items-center">
            <div>
              {errors.message && (
                <p className="flex items-center gap-1 font-code text-[10px] text-red-400">
                  <AlertCircle className="h-3 w-3" /> {errors.message}
                </p>
              )}
            </div>
            <p className="font-code text-[9px] text-slate-500">
              {formData.message.length}/500
            </p>
          </div>
        </div>

        {/* Botão de Envio */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#D4AF37] px-6 py-3 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#071423] transition hover:bg-[#f0ce61] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar mensagem'
          )}
        </Button>

        {/* Nota de Privacidade */}
        <p className="text-center font-code text-[9px] text-slate-500">
          Respeitamos sua privacidade. Seus dados serão usados apenas para responder sua mensagem.
        </p>
      </form>
    </div>
  );
}
