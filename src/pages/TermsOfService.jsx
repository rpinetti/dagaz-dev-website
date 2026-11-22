import React from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {

  return (
    <div className="container" style={{ padding: '6rem 0', maxWidth: '800px' }}>
      <SEO 
        title="Termos de Uso" 
        description="Confira os termos de uso do portal Dagaz.Dev." 
        url="/termos"
      />
      <h1 style={{ color: 'var(--color-viking-gold)', marginBottom: '2rem' }}>Termos de Uso</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Última atualização: 28 de Abril de 2026</p>

      <div style={{ color: 'var(--text-primary)', lineHeight: '1.8' }}>
        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>1. Aceitação dos Termos</h2>
        <p>Ao acessar e utilizar o site Dagaz.Dev, bem como os conteúdos gratuitos, pagos, mentorias e e-books associados, você concorda plenamente com os termos estabelecidos neste documento. Caso não concorde, evite consumir o nosso conteúdo ou contratar nossos serviços.</p>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>2. Propriedade Intelectual</h2>
        <p>Todo o conteúdo publicado no blog (A Forja), o design do site, as logomarcas, os e-books (incluindo "As 9 Runas") e materiais de treinamento são propriedades exclusivas da Dagaz.Dev. É terminantemente proibida a cópia, revenda, distribuição não autorizada ou plagio dos artigos, textos ou identidade visual baseada na mitologia nórdica criada para a marca.</p>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>3. Uso do Código e Responsabilidade (Isenção)</h2>
        <p>Os códigos-fonte (ABAP, Fiori, React, entre outros) fornecidos no blog ou materiais didáticos são para fins educacionais e referenciais. A aplicação desses códigos em ambientes de produção corporativos é de inteira responsabilidade do leitor. A Dagaz.Dev não se responsabiliza por indisponibilidades, corrupção de dados ou perdas financeiras resultantes do mau uso dos tutoriais sem as devidas validações arquiteturais (QAS/PRD).</p>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>4. Consultoria e Mentoria</h2>
        <p>Os contatos realizados através dos formulários não geram vínculo empregatício ou obrigação imediata de prestação de serviço. Contratos de consultoria SAP S/4HANA ou mentoria técnica serão formalizados separadamente, mediante propostas comercias e assinaturas legais.</p>

        <h2 style={{ color: 'var(--color-glacial-cyan)', marginTop: '2rem' }}>5. Alteração dos Termos</h2>
        <p>A Dagaz.Dev reserva-se o direito de alterar as regras deste pacto a qualquer momento. Quaisquer modificações relevantes serão atualizadas nesta página. Continuar a usar o portal após tais mudanças constituirá a sua aceitação dos novos termos.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
