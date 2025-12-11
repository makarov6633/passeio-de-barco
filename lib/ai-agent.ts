import { getConversationContext, saveConversationContext, getAllPaspos, getOrCreateCliente, createReserva, generateVoucher } from './supabase';
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export type IntentType = 
  | 'saudacao'
  | 'reserva'
  | 'preco'
  | 'cancelamento'
  | 'voucher'
  | 'elogio'
  | 'reclamacao'
  | 'duvida'
  | 'alteracao_data'
  | 'desconhecido';

interface ExtractedData {
  nome?: string;
  data?: string;
  numPessoas?: number;
  passeio?: string;
}

export async function detectIntent(message: string): Promise<IntentType> {
  const msg = message.toLowerCase();

  if (/\b(oi|olá|ola|bom dia|boa tarde|boa noite|hey|e ai)\b/i.test(msg)) {
    return 'saudacao';
  }

  if (/\b(reserva|reservar|agendar|quero|gostaria|marcar)\b/i.test(msg)) {
    return 'reserva';
  }

  if (/\b(quanto custa|preço|preco|valor|valores|tabela)\b/i.test(msg)) {
    return 'preco';
  }

  if (/\b(cancelar|cancelamento|desistir|desmarcar)\b/i.test(msg)) {
    return 'cancelamento';
  }

  if (/\b(voucher|comprovante|confirmação|confirmacao|código|codigo)\b/i.test(msg)) {
    return 'voucher';
  }

  if (/\b(adorei|amei|maravilhoso|excelente|perfeito|ótimo|otimo|top)\b/i.test(msg)) {
    return 'elogio';
  }

  if (/\b(problema|reclamação|reclamacao|ruim|horrível|horrivel|insatisfeito)\b/i.test(msg)) {
    return 'reclamacao';
  }

  if (/\b(mudar data|alterar data|trocar dia|outro dia)\b/i.test(msg)) {
    return 'alteracao_data';
  }

  if (/\b(como|quando|onde|horário|horario|dúvida|duvida|informação|informacao)\b/i.test(msg)) {
    return 'duvida';
  }

  return 'desconhecido';
}

export function extractData(message: string): ExtractedData {
  const data: ExtractedData = {};

  const nomeMatch = message.match(/(?:meu nome é|me chamo|sou|nome:|chamo)\s*([A-Za-zÀ-ÿ\s]{3,50})/i);
  if (nomeMatch) {
    data.nome = nomeMatch[1].trim();
  }

  const dataMatch = message.match(/\b(amanhã|hoje|segunda|terça|terca|quarta|quinta|sexta|sábado|sabado|domingo|\d{1,2}\/\d{1,2}|\d{1,2}\s+de\s+\w+)\b/i);
  if (dataMatch) {
    data.data = dataMatch[0];
  }

  const pessoasMatch = message.match(/\b(\d+)\s*(pessoa|pessoas|pax)\b/i);
  if (pessoasMatch) {
    data.numPessoas = parseInt(pessoasMatch[1]);
  }

  if (/\b(barco|arraial)\b/i.test(message)) {
    data.passeio = 'barco';
  } else if (/\b(escuna|búzios|buzios)\b/i.test(message)) {
    data.passeio = 'escuna';
  } else if (/\b(jet|jet ski|jetski)\b/i.test(message)) {
    data.passeio = 'jet';
  }

  return data;
}

export async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM!,
      to,
      body: message,
    });
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
  }
}

export async function notifyTeam(reserva: any): Promise<void> {
  const message = `🔔 NOVA RESERVA!

👤 ${reserva.nome}
📞 ${reserva.telefone}
🚤 ${reserva.passeio}
📅 ${reserva.data}
👥 ${reserva.numPessoas} pessoa(s)
🎫 Voucher: ${reserva.voucher}

Status: PENDENTE`;

  await sendWhatsAppMessage(process.env.TWILIO_BUSINESS_WHATSAPP!, message);
}

export async function processMessage(telefone: string, message: string): Promise<string> {
  const context = await getConversationContext(telefone);
  const intent = await detectIntent(message);
  const extracted = extractData(message);

  let response = '';

  switch (intent) {
    case 'saudacao':
      response = '😊 Olá! Seja muito bem-vindo(a) à Caleb\'s Tour!\n\nComo posso te ajudar hoje?';
      context.lastIntent = 'saudacao';
      break;

    case 'preco':
      const passeios = await getAllPaspos();
      response = '💰 **Nossos Passeios:**\n\n';
      passeios.forEach(p => {
        response += `🚤 ${p.nome}\n`;
        if (p.preco_min && p.preco_max) {
          response += `   R$ ${p.preco_min.toFixed(2)} - R$ ${p.preco_max.toFixed(2)}\n`;
        }
        if (p.duracao) {
          response += `   ⏱️ ${p.duracao}\n`;
        }
        response += '\n';
      });
      response += 'Quer fazer uma reserva? 😊';
      break;

    case 'reserva':
      if (!context.reserva) {
        context.reserva = {};
      }

      if (extracted.passeio) {
        context.reserva.passeio = extracted.passeio;
      }
      if (extracted.data) {
        context.reserva.data = extracted.data;
      }
      if (extracted.numPessoas) {
        context.reserva.numPessoas = extracted.numPessoas;
      }
      if (extracted.nome) {
        context.reserva.nome = extracted.nome;
      }

      if (!context.reserva.passeio) {
        const passeios = await getAllPaspos();
        response = 'Vamos fazer sua reserva! 😊\n\nQual passeio te interessa?\n\n';
        passeios.forEach((p, i) => {
          response += `${i + 1}. ${p.nome}\n`;
        });
      } else if (!context.reserva.data) {
        response = 'Perfeito! Para qual data você quer reservar? 📅';
      } else if (!context.reserva.numPessoas) {
        response = '✅ Disponível! Quantas pessoas vão participar?';
      } else if (!context.reserva.nome) {
        response = 'Ótimo! Me diz seu nome completo: 😊';
      } else {
        const cliente = await getOrCreateCliente(telefone, context.reserva.nome);
        
        if (!cliente) {
          response = '❌ Erro ao criar cadastro. Tente novamente.';
          break;
        }

        const passeios = await getAllPaspos();
        const passeioEncontrado = passeios.find(p => 
          p.nome.toLowerCase().includes(context.reserva.passeio)
        );

        if (!passeioEncontrado) {
          response = '❌ Passeio não encontrado. Tente novamente.';
          break;
        }

        const voucher = generateVoucher();
        
        const reservaCriada = await createReserva({
          cliente_id: cliente.id,
          passeio_id: passeioEncontrado.id,
          data_passeio: context.reserva.data,
          num_pessoas: context.reserva.numPessoas,
          voucher,
          status: 'PENDENTE',
        });

        if (!reservaCriada) {
          response = '❌ Erro ao criar reserva. Tente novamente.';
          break;
        }

        response = `🎉 **RESERVA CRIADA COM SUCESSO!**\n\n`;
        response += `🎫 **VOUCHER:** ${voucher}\n\n`;
        response += `📋 **Resumo:**\n`;
        response += `👤 ${context.reserva.nome}\n`;
        response += `🚤 ${passeioEncontrado.nome}\n`;
        response += `📅 ${context.reserva.data}\n`;
        response += `👥 ${context.reserva.numPessoas} pessoa(s)\n\n`;
        response += `⏰ **Status:** PENDENTE DE CONFIRMAÇÃO\n\n`;
        response += `Nossa equipe vai confirmar em breve!\n`;
        response += `📞 Dúvidas? (22) 99824-9911`;

        await notifyTeam({
          nome: context.reserva.nome,
          telefone,
          passeio: passeioEncontrado.nome,
          data: context.reserva.data,
          numPessoas: context.reserva.numPessoas,
          voucher,
        });

        delete context.reserva;
      }
      break;

    case 'cancelamento':
      response = '😔 Entendi que você quer cancelar.\n\nPor favor, me passa seu voucher ou nome completo para eu localizar sua reserva.';
      break;

    case 'voucher':
      response = '🎫 Para consultar seu voucher, me passa seu nome completo ou telefone que cadastrou.';
      break;

    case 'elogio':
      response = '😍 Muito obrigado pelo feedback! Ficamos super felizes que tenha gostado!\n\n⭐ Se puder, deixe uma avaliação nas nossas redes!';
      break;

    case 'reclamacao':
      response = '😔 Sentimos muito pelo ocorrido!\n\nVamos resolver isso o quanto antes. Nossa equipe já foi notificada e vai entrar em contato com você.\n\n📞 (22) 99824-9911';
      await sendWhatsAppMessage(
        process.env.TWILIO_BUSINESS_WHATSAPP!,
        `⚠️ RECLAMAÇÃO RECEBIDA\n\nDe: ${telefone}\nMensagem: ${message}`
      );
      break;

    case 'alteracao_data':
      response = '📅 Para alterar a data da sua reserva, me passa:\n\n1. Seu voucher\n2. A nova data desejada';
      break;

    case 'duvida':
      response = '🤔 Estou aqui para ajudar!\n\nSobre o que você quer saber?\n\n• Passeios disponíveis\n• Preços\n• Horários\n• Como chegar\n• Fazer reserva';
      break;

    default:
      response = '😊 Desculpe, não entendi bem.\n\nPosso te ajudar com:\n\n• Ver passeios\n• Fazer reserva\n• Consultar voucher\n• Cancelar reserva\n\nO que você precisa?';
  }

  await saveConversationContext(telefone, context);

  return response;
}
