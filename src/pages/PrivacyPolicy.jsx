import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {

  return (
    <div className="container" style={{ padding: '6rem 0', maxWidth: '800px' }}>
      <SEO 
        title="Política de Privacidade" 
        description="Leia a política de privacidade da Dagaz.Dev e saiba como cuidamos dos seus dados." 
        url="/privacidade"
      />
      <h1 style={{ color: 'var(--color-viking-gold)', marginBottom: '2rem' }}>Política de Privacidade</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Última atualização: 28 de Abril de 2026</p>

      <div style={{ color: 'var(--text-primary)', lineHeight: '1.8' }}>
        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>1. O Pacto da Forja (Aviso Geral)</h2>
        <p>A Dagaz.Dev respeita a sua privacidade. Este documento explica como coletamos, usamos e protegemos os seus dados ao acessar o nosso portal, baixar o e-book "As 9 Runas" ou interagir com os nossos formulários de consultoria e mentoria.</p>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>2. Dados Coletados</h2>
        <p>Coletamos as seguintes informações quando você interage com o nosso site:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <li><strong>Dados de Contato:</strong> Nome, e-mail e empresa (quando você preenche nossos formulários de captação de leads, contatos ou solicita o download do e-book).</li>
          <li><strong>Interações no Blog:</strong> Comentários realizados através da plataforma Giscus são atrelados à sua conta pública do GitHub e armazenados na aba Discussions do nosso repositório, estando sujeitos à política de privacidade do próprio GitHub.</li>
          <li><strong>Navegação Analítica:</strong> Dados anônimos de acesso (páginas visitadas, tempo de leitura) através de ferramentas como Google Analytics para melhorar a qualidade técnica dos nossos artigos (A Forja).</li>
        </ul>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>3. Uso dos Dados</h2>
        <p>Não vendemos seus dados para terceiros. O seu e-mail e nome serão utilizados estritamente para:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <li>Envio do material gratuito solicitado (e-book).</li>
          <li>Resposta a contatos profissionais de consultoria SAP ou mentoria.</li>
          <li>Envio esporádico de novos conteúdos técnicos relevantes (Newsletters), com a opção clara de descadastramento (opt-out) a qualquer momento.</li>
        </ul>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>4. Segurança</h2>
        <p>Tratamos seus dados com a precisão e segurança de um Jarl protegendo seu território. Nosso site é seguro (HTTPS) e utilizamos serviços de formulários profissionais (Formspree) e integrações seguras (Calendly) para garantir a integridade dos seus dados no trânsito das informações.</p>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>5. Contato</h2>
        <p>Se tiver qualquer dúvida sobre como tratamos os seus dados, envie um e-mail para privacidade@dagaz.dev ou utilize a nossa <Link to="/contato" style={{ color: 'var(--color-viking-gold)' }}>página de contato</Link>.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
