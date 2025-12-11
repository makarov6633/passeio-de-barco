import { NextResponse } from 'next/server';
import { twilioClient } from '@/lib/twilio';
import { 
  detectIntent, 
  gerarResposta, 
  extractNome,
  extractData,
  extractNumero,
  extrairPasseio,
  normalizarData,
  formatarDataPtBr,
  ConversationContext 
} from '@/lib/ai-agent';
import {
  buscarContexto,
  salvarContexto,
  buscarCliente,
  buscarReservasCliente,
  buscarReservaPendente,
  verificarDisponibilidade,
  criarReservaCompleta,
  cancelarReserva,
  alterarDataReserva,
  formatarVoucher,
} from '@/lib/crm-functions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const from = formData.get('From')?.toString() || '';
    const body = formData.get('Body')?.toString() || '';
    
    const telefone = from.replace('whatsapp:+', '').replace('whatsapp:', '');
    
    let context = await buscarContexto(telefone);
    
    if (!context) {
      context = {
        telefone,
        historico: [],
      };
    }

    const intent = detectIntent(body, context);
    
    context.historico.push({
      mensagem: body,
      timestamp: new Date(),
      intent,
    });

    if (context.historico.length > 20) {
      context.historico = context.historico.slice(-20);
    }

    let resposta = '';

    switch (intent) {
      case 'saudacao':
        resposta = await handleSaudacao(telefone, body, context);
        break;
      
      case 'reservar':
        resposta = await handleReserva(telefone, body, context);
        break;
      
      case 'cancelar':
        resposta = await handleCancelamento(telefone, body, context);
        break;
      
      case 'alterar_data':
        resposta = await handleAlteracaoData(telefone, body, context);
        break;
      
      case 'consultar_preco':
        resposta = gerarResposta('consultar_preco');
        context.ultimaIntencao = 'consultar_preco';
        break;
      
      case 'consultar_voucher':
        resposta = await handleConsultaVoucher(telefone, body, context);
        break;
      
      case 'elogio':
        resposta = gerarResposta('elogio');
        context.ultimaIntencao = 'elogio';
        break;
      
      case 'reclamacao':
        resposta = await handleReclamacao(telefone, body, context);
        break;
      
      case 'duvida_geral':
        resposta = gerarResposta('duvida_geral');
        context.ultimaIntencao = 'duvida_geral';
        break;
      
      default:
        resposta = await handleMensagemDesconhecida(telefone, body, context);
    }

    await enviarMensagem(from, resposta);
    
    await salvarContexto(telefone, context);

    return NextResponse.json({ success: true, sent: resposta });
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleSaudacao(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  const cliente = await buscarCliente(telefone);
  
  if (cliente) {
    const respostas = [
      `Olá ${cliente.nome}! 😊 Que bom te ver de novo! Como posso te ajudar hoje?`,
      `Oi ${cliente.nome}! Seja bem-vindo(a) novamente! Em que posso te auxiliar?`,
      `E aí ${cliente.nome}! Pronto(a) para mais uma aventura? 🌊`,
    ];
    return respostas[Math.floor(Math.random() * respostas.length)];
  } else {
    return gerarResposta('saudacao');
  }
}

async function handleReserva(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  if (!context.etapaReserva) {
    context.etapaReserva = 'inicio';
    context.dadosTemp = {};
    context.aguardandoResposta = true;
  }

  switch (context.etapaReserva) {
    case 'inicio':
      const nomeExtraido = extractNome(mensagem);
      if (nomeExtraido) {
        context.dadosTemp!.nome = nomeExtraido;
      } else {
        const cliente = await buscarCliente(telefone);
        if (cliente) {
          context.dadosTemp!.nome = cliente.nome;
        }
      }

      const passeioExtraido = extrairPasseio(mensagem);
      if (passeioExtraido) {
        context.dadosTemp!.passeio = passeioExtraido;
        context.etapaReserva = 'escolha_data';
        
        return `Ótimo! 🚤 Você escolheu: *${passeioExtraido}*

📅 Para qual data você gostaria de agendar?

Pode me dizer assim:
• "Amanhã"
• "15/12"  
• "Sábado"
• "20 de dezembro"`;
      }

      context.etapaReserva = 'escolha_passeio';
      return `Vamos fazer sua reserva! 😊

Qual passeio te interessa?

🚤 *Passeio de Barco - Arraial* (R$ 150-280)
⛵ *Escuna - Búzios*
🏄 *Jet Ski*
🏍️ *Quadriciclo*
🚙 *Buggy*
🤿 *Mergulho de Batismo*
🏙️ *City Tour Rio*
🛥️ *Lancha Privada*

Me diz qual você quer! 👇`;

    case 'escolha_passeio':
      const passeio = extrairPasseio(mensagem);
      if (!passeio) {
        return `Não entendi qual passeio você quer... 😅

Pode escrever assim:
• "Barco em Arraial"
• "Quadriciclo"
• "Jet Ski"
• "Búzios"

Qual você prefere?`;
      }

      context.dadosTemp!.passeio = passeio;
      context.etapaReserva = 'escolha_data';

      return `Perfeito! 🚤 Você escolheu: *${passeio}*

📅 Para qual data você gostaria?

Exemplos:
• "Amanhã"
• "15/12"
• "Próximo sábado"`;

    case 'escolha_data':
      const dataStr = extractData(mensagem);
      const dataNormalizada = dataStr ? normalizarData(dataStr) : null;

      if (!dataNormalizada) {
        return `Hmm, não consegui entender a data... 😅

Pode tentar assim:
• "Amanhã"
• "15/12"
• "Sábado"
• "20/12/2025"

Qual data você quer?`;
      }

      const disponivel = await verificarDisponibilidade(
        context.dadosTemp!.passeio || '',
        dataNormalizada
      );

      if (!disponivel) {
        return `Poxa! 😔 Essa data está lotada...

Temos disponibilidade para outras datas próximas. Quer escolher outra?`;
      }

      context.dadosTemp!.data = dataNormalizada;
      context.etapaReserva = 'escolha_pessoas';

      const dataObj = new Date(dataNormalizada);
      const dataFormatada = formatarDataPtBr(dataObj);

      return `Show! ✅ Disponível para *${dataFormatada}*

👥 Quantas pessoas vão?`;

    case 'escolha_pessoas':
      const pessoas = extractNumero(mensagem);
      
      if (!pessoas) {
        return `Quantas pessoas vão no passeio?

Por exemplo: "2 pessoas" ou só "2" 😊`;
      }

      context.dadosTemp!.pessoas = pessoas;

      if (!context.dadosTemp!.nome) {
        context.etapaReserva = 'confirmacao';
        return `Quase lá! 😊

Me diz seu nome completo para eu finalizar a reserva:`;
      }

      return await finalizarReserva(telefone, context);

    case 'confirmacao':
      const nome = extractNome(mensagem) || mensagem.trim();
      
      if (nome.split(' ').length < 2) {
        return `Por favor, me informe seu *nome completo* para a reserva 😊`;
      }

      context.dadosTemp!.nome = nome;
      return await finalizarReserva(telefone, context);

    default:
      return `Ops! Algo deu errado... 😅 Vamos começar de novo?

Digite *"quero reservar"* para fazer uma nova reserva!`;
  }
}

async function finalizarReserva(telefone: string, context: ConversationContext): Promise<string> {
  const dados = context.dadosTemp!;
  
  if (!dados.passeio || !dados.data || !dados.pessoas || !dados.nome) {
    context.etapaReserva = 'inicio';
    context.aguardandoResposta = false;
    return `Faltaram algumas informações... 😅 Vamos tentar de novo?

Digite *"quero reservar"*`;
  }

  const reserva = await criarReservaCompleta({
    telefone,
    nome: dados.nome,
    passeio_nome: dados.passeio,
    passeio_id: dados.passeio.toLowerCase().replace(/\s+/g, '-'),
    data_preferida: dados.data,
    numero_pessoas: dados.pessoas,
  });

  if (!reserva) {
    context.etapaReserva = undefined;
    context.aguardandoResposta = false;
    return `Ops! Tivemos um problema ao criar sua reserva... 😔

Tente novamente em alguns minutos ou entre em contato:
📱 (22) 99824-9911`;
  }

  context.etapaReserva = undefined;
  context.aguardandoResposta = false;
  context.dadosTemp = {};

  const dataObj = new Date(dados.data);
  const dataFormatada = formatarDataPtBr(dataObj);

  await enviarMensagem(
    'whatsapp:+5522998249911',
    `🔔 *NOVA RESERVA!*

👤 ${dados.nome}
📞 ${telefone}
🚤 ${dados.passeio}
📅 ${dataFormatada}
👥 ${dados.pessoas} pessoa(s)
🎫 Voucher: ${reserva.voucher}

Status: PENDENTE`
  );

  return formatarVoucher(reserva) + `

✅ *Reserva criada com sucesso!*

Nossa equipe irá confirmar em breve. Fique de olho no WhatsApp! 😊

Qualquer dúvida, estamos aqui!`;
}

async function handleCancelamento(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  const reserva = await buscarReservaPendente(telefone);
  
  if (!reserva) {
    const reservas = await buscarReservasCliente(telefone);
    const reservasAtivas = reservas.filter(r => r.status === 'confirmado');
    
    if (reservasAtivas.length === 0) {
      return `Não encontrei nenhuma reserva ativa no seu nome... 🤔

Tem certeza que tem uma reserva conosco?`;
    }

    return `Vi que você tem reserva(s) confirmada(s).

Para cancelar, preciso que você me informe o código do voucher ou a data da reserva.

Qual você quer cancelar?`;
  }

  await cancelarReserva(reserva.id);

  await enviarMensagem(
    'whatsapp:+5522998249911',
    `⚠️ *CANCELAMENTO*

Cliente: ${reserva.nome_cliente}
Telefone: ${telefone}
Passeio: ${reserva.passeio_nome}
Data: ${new Date(reserva.data_preferida).toLocaleDateString('pt-BR')}
Voucher: ${reserva.voucher}`
  );

  return `Tudo certo! ✅ Sua reserva foi cancelada.

Se mudar de ideia, é só me chamar! Estamos sempre aqui! 😊

Até breve! 👋`;
}

async function handleAlteracaoData(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  const reserva = await buscarReservaPendente(telefone);
  
  if (!reserva) {
    return `Não encontrei reserva pendente pra alterar... 🤔

Você tem certeza que tem uma reserva conosco?`;
  }

  const novaDataStr = extractData(mensagem);
  const novaData = novaDataStr ? normalizarData(novaDataStr) : null;

  if (!novaData) {
    return `Qual a nova data que você quer?

Exemplos:
• "Amanhã"
• "20/12"
• "Próximo sábado"`;
  }

  const resultado = await alterarDataReserva(reserva.id, novaData);

  if (!resultado.success) {
    return `Infelizmente essa data não tem disponibilidade... 😔

Quer tentar outra data?`;
  }

  const dataFormatada = formatarDataPtBr(new Date(novaData));

  return `Pronto! ✅ Data alterada com sucesso!

*Nova data:* ${dataFormatada}

Qualquer outra coisa, é só chamar! 😊`;
}

async function handleConsultaVoucher(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  const reservas = await buscarReservasCliente(telefone);
  
  if (reservas.length === 0) {
    return `Não encontrei nenhuma reserva no seu telefone... 🤔

Você tem certeza que já fez uma reserva conosco?`;
  }

  const reservaAtiva = reservas.find(r => r.status === 'confirmado' || r.status === 'pendente');
  
  if (!reservaAtiva) {
    return `Não encontrei reserva ativa no momento... 

Quer fazer uma nova reserva? É só me dizer! 😊`;
  }

  return formatarVoucher(reservaAtiva);
}

async function handleReclamacao(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  await enviarMensagem(
    'whatsapp:+5522998249911',
    `⚠️ *RECLAMAÇÃO*

Telefone: ${telefone}
Mensagem: "${mensagem}"

Responder urgente!`
  );

  return gerarResposta('reclamacao') + `

Um membro da nossa equipe entrará em contato em breve para resolver isso! 

Obrigado pela paciência! 🙏`;
}

async function handleMensagemDesconhecida(telefone: string, mensagem: string, context: ConversationContext): Promise<string> {
  if (context.aguardandoResposta) {
    return await handleReserva(telefone, mensagem, context);
  }

  return gerarResposta('desconhecido');
}

async function enviarMensagem(to: string, mensagem: string) {
  try {
    await twilioClient.messages.create({
      body: mensagem,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: to,
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  }
}
