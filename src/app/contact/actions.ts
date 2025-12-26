'use server';

import nodemailer from 'nodemailer';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactData) {
  try {
    // Validação básica
    if (!data.name || !data.email || !data.subject || !data.message) {
      return { success: false, error: 'Todos os campos são obrigatórios' };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: 'E-mail inválido' };
    }

    // Validar comprimento da mensagem
    if (data.message.length < 10) {
      return { success: false, error: 'A mensagem deve ter pelo menos 10 caracteres' };
    }

    // Configurar transporter (você precisa configurar as variáveis de ambiente)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email para o administrador
    await transporter.sendMail({
      from: process.env.SMTP_FROM || data.email,
      to: process.env.CONTACT_EMAIL,
      subject: `Nova mensagem de contato: ${data.subject}`,
      html: `
        <h2>Nova Mensagem de Contato</h2>
        <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Assunto:</strong> ${escapeHtml(data.subject)}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
      `,
      replyTo: data.email,
    });

    // Email de confirmação para o usuário
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Recebemos sua mensagem - Dagaz.Dev',
      html: `
        <h2>Obrigado por entrar em contato!</h2>
        <p>Olá ${escapeHtml(data.name)},</p>
        <p>Recebemos sua mensagem e responderemos em breve.</p>
        <p>Aqui está um resumo do que você nos enviou:</p>
        <hr />
        <p><strong>Assunto:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
        <hr />
        <p>Atenciosamente,<br/>Equipe Dagaz.Dev</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' };
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
