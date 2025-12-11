export type MessageIntent = 
  | 'saudacao'
  | 'reservar'
  | 'consultar_preco'
  | 'consultar_disponibilidade'
  | 'cancelar'
  | 'alterar_data'
  | 'duvida_geral'
  | 'duvida_passeio'
  | 'reclamacao'
  | 'elogio'
  | 'consultar_voucher'
  | 'confirmar_presenca'
  | 'solicitar_info'
  | 'desconhecido';

export interface ConversationContext {
  clienteId?: string;
  telefone: string;
  nome?: string;
  ultimoPasseio?: string;
  ultimaIntencao?: MessageIntent;
  aguardandoResposta?: boolean;
  etapaReserva?: 'inicio' | 'escolha_passeio' | 'escolha_data' | 'escolha_pessoas' | 'confirmacao';
  dadosTemp?: {
    passeio?: string;
    data?: string;
    pessoas?: number;
    nome?: string;
  };
  historico: Array<{
    mensagem: string;
    timestamp: Date;
    intent: MessageIntent;
  }>;
}

const saudacoes = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'e aí', 'e ai'];
const reservaKeywords = ['reservar', 'agendar', 'marcar', 'quero', 'gostaria', 'interessado', 'disponibilidade'];
const cancelarKeywords = ['cancelar', 'desmarcar', 'desistir', 'não quero mais', 'nao quero mais'];
const precoKeywords = ['preço', 'preco', 'valor', 'quanto custa', 'quanto é', 'quanto fica'];
const reclamacaoKeywords = ['problema', 'reclamar', 'reclamação', 'ruim', 'péssimo', 'pessimo', 'horrivel', 'decepcionado'];
const elogioKeywords = ['ótimo', 'otimo', 'excelente', 'maravilhoso', 'perfeito', 'adorei', 'amei', 'top', 'show'];
const duvidaKeywords = ['dúvida', 'duvida', 'como', 'onde', 'quando', 'qual', 'pode', 'posso', 'preciso'];
const voucherKeywords = ['voucher', 'comprovante', 'confirmação', 'confirmacao', 'código', 'codigo'];

export function detectIntent(mensagem: string, context?: ConversationContext): MessageIntent {
  const msg = mensagem.toLowerCase().trim();

  if (context?.aguardandoResposta && context.etapaReserva) {
    return 'reservar';
  }

  const contemPalavra = (palavras: string[]) => 
    palavras.some(palavra => msg.includes(palavra));

  if (contemPalavra(saudacoes) && msg.length < 20) {
    return 'saudacao';
  }

  if (contemPalavra(cancelarKeywords)) {
    return 'cancelar';
  }

  if (contemPalavra(voucherKeywords)) {
    return 'consultar_voucher';
  }

  if (contemPalavra(reclamacaoKeywords)) {
    return 'reclamacao';
  }

  if (contemPalavra(elogioKeywords)) {
    return 'elogio';
  }

  if (contemPalavra(reservaKeywords)) {
    return 'reservar';
  }

  if (contemPalavra(precoKeywords)) {
    return 'consultar_preco';
  }

  if (contemPalavra(duvidaKeywords)) {
    return 'duvida_geral';
  }

  const passeios = ['barco', 'arraial', 'búzios', 'buzios', 'cabo frio', 'quadriciclo', 'buggy', 'jet', 'mergulho'];
  if (contemPalavra(passeios)) {
    return 'duvida_passeio';
  }

  return 'desconhecido';
}

export function extractNome(mensagem: string): string | null {
  const patterns = [
    /(?:me chamo|meu nome é|sou o|sou a|meu nome e)\s+([A-Za-zÀ-ÿ\s]{2,})/i,
    /^([A-Z][a-zÀ-ÿ]+(?:\s+[A-Z][a-zÀ-ÿ]+)+)$/,
  ];

  for (const pattern of patterns) {
    const match = mensagem.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return null;
}

export function extractData(mensagem: string): string | null {
  const patterns = [
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/,
    /(?:dia|para)\s+(\d{1,2})\s+de\s+(\w+)/i,
    /(amanhã|amanha|hoje|segunda|terça|terca|quarta|quinta|sexta|sábado|sabado|domingo)/i,
  ];

  for (const pattern of patterns) {
    const match = mensagem.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return null;
}

export function extractNumero(mensagem: string): number | null {
  const match = mensagem.match(/\b(\d+)\s*(?:pessoa|pessoas|pax)?\b/i);
  if (match) {
    const num = parseInt(match[1]);
    if (num >= 1 && num <= 50) {
      return num;
    }
  }
  return null;
}

export function extrairPasseio(mensagem: string): string | null {
  const msg = mensagem.toLowerCase();
  
  const mapPasseios: { [key: string]: string } = {
    'barco arraial': 'Passeio de Barco - Arraial',
    'barco': 'Passeio de Barco - Arraial',
    'arraial': 'Passeio de Barco - Arraial',
    'búzios': 'Escuna - Búzios',
    'buzios': 'Escuna - Búzios',
    'escuna': 'Escuna - Búzios',
    'cabo frio': 'Passeio de Barco - Cabo Frio',
    'quadriciclo': 'Quadriciclo',
    'quad': 'Quadriciclo',
    'buggy': 'Passeio de Buggy',
    'jet': 'Jet Ski',
    'jetski': 'Jet Ski',
    'mergulho': 'Mergulho de Batismo',
    'rio': 'City Tour Rio',
    'lancha': 'Lancha Privada',
  };

  for (const [key, value] of Object.entries(mapPasseios)) {
    if (msg.includes(key)) {
      return value;
    }
  }

  return null;
}

const respostasSaudacao = [
  "Olá! 😊 Seja muito bem-vindo(a) à Caleb's Tour! Como posso te ajudar hoje?",
  "Oi! Que bom ter você por aqui! 🌊 Vamos planejar uma aventura incrível?",
  "Olá! Prazer em falar com você! Em que posso ajudar?",
  "Oi! Bem-vindo(a) ao Caribe Brasileiro! Como posso te auxiliar?",
];

const respostasElogio = [
  "Muito obrigado pelo carinho! ❤️ Ficamos muito felizes em proporcionar essa experiência pra você! Esperamos te ver em breve novamente! 🌊",
  "Que alegria receber esse feedback! 🎉 É por mensagens assim que fazemos tudo com tanto amor! Obrigado! ☺️",
  "Uau! Ficamos radiantes com suas palavras! 🤩 Muito obrigado! Volte sempre!",
  "Isso aquece nosso coração! 💙 Obrigado por compartilhar sua experiência conosco!",
];

const respostasReclamacao = [
  "Sentimos muito pelo ocorrido! 😔 Sua experiência é muito importante pra gente. Pode me contar o que aconteceu para que possamos resolver?",
  "Peço desculpas pela situação! Queremos entender melhor o que houve. Pode me dar mais detalhes?",
  "Lamento muito! Isso não condiz com nosso padrão de atendimento. Vamos resolver isso juntos. Me conta mais?",
];

export function gerarResposta(intent: MessageIntent, context?: ConversationContext, extra?: any): string {
  const aleatorio = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  switch (intent) {
    case 'saudacao':
      return aleatorio(respostasSaudacao);
    
    case 'elogio':
      return aleatorio(respostasElogio);
    
    case 'reclamacao':
      return aleatorio(respostasReclamacao);
    
    case 'consultar_preco':
      return `📋 *Nossos Principais Passeios:*

🚤 *Passeio de Barco - Arraial do Cabo*
   • Tradicional: R$ 150 (Água + Frutas)
   • Open Bar: R$ 180 (Água, Refri, Caipirinha)
   • Open Food: R$ 280 (Open Bar + Churrasco)

🏖️ *Outros Passeios:*
   • Escuna Búzios - Consulte
   • Quadriciclo - Consulte
   • Jet Ski - Consulte
   • Mergulho de Batismo - Consulte

Qual passeio te interessa? 😊`;

    case 'duvida_geral':
      return `Estou aqui pra te ajudar! 😊

Posso te auxiliar com:
✅ Fazer uma reserva
💰 Informar preços
📅 Consultar disponibilidade
📱 Enviar voucher/comprovante
🗓️ Cancelar ou alterar data
❓ Tirar dúvidas sobre os passeios

O que você precisa?`;

    case 'consultar_voucher':
      if (context?.clienteId || context?.telefone) {
        return `Vou verificar seu voucher! ✅ 

Me confirma seu nome completo para eu localizar sua reserva?`;
      }
      return `Para consultar seu voucher, preciso do seu nome completo ou número da reserva. Pode me informar?`;

    default:
      return `Entendi! Como posso te ajudar melhor? 😊

Posso:
• Fazer uma reserva
• Consultar preços
• Tirar dúvidas sobre passeios
• Enviar voucher/comprovante

O que você precisa?`;
  }
}

export function formatarDataPtBr(data: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(data);
}

export function normalizarData(dataStr: string): string | null {
  const hoje = new Date();
  const msgLower = dataStr.toLowerCase();

  const diasSemana: { [key: string]: number } = {
    'domingo': 0, 'segunda': 1, 'terça': 2, 'terca': 2,
    'quarta': 3, 'quinta': 4, 'sexta': 5, 'sábado': 6, 'sabado': 6,
  };

  if (msgLower.includes('hoje')) {
    return hoje.toISOString().split('T')[0];
  }

  if (msgLower.includes('amanhã') || msgLower.includes('amanha')) {
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    return amanha.toISOString().split('T')[0];
  }

  for (const [dia, num] of Object.entries(diasSemana)) {
    if (msgLower.includes(dia)) {
      const proxima = new Date(hoje);
      const diff = (num - hoje.getDay() + 7) % 7 || 7;
      proxima.setDate(proxima.getDate() + diff);
      return proxima.toISOString().split('T')[0];
    }
  }

  const matchData = dataStr.match(/(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?/);
  if (matchData) {
    const dia = parseInt(matchData[1]);
    const mes = parseInt(matchData[2]) - 1;
    const ano = matchData[3] ? 
      (matchData[3].length === 2 ? 2000 + parseInt(matchData[3]) : parseInt(matchData[3])) : 
      hoje.getFullYear();
    
    const data = new Date(ano, mes, dia);
    if (!isNaN(data.getTime())) {
      return data.toISOString().split('T')[0];
    }
  }

  return null;
}
