import { supabaseAdmin } from './supabase';
import { ConversationContext, MessageIntent } from './ai-agent';

export async function salvarContexto(telefone: string, context: ConversationContext) {
  const { error } = await supabaseAdmin
    .from('conversation_contexts')
    .upsert({
      telefone,
      context_data: context,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'telefone',
    });

  if (error) {
    console.error('Erro ao salvar contexto:', error);
  }
}

export async function buscarContexto(telefone: string): Promise<ConversationContext | null> {
  const { data, error } = await supabaseAdmin
    .from('conversation_contexts')
    .select('context_data')
    .eq('telefone', telefone)
    .single();

  if (error || !data) {
    return null;
  }

  return data.context_data as ConversationContext;
}

export async function buscarCliente(telefone: string) {
  const { data, error } = await supabaseAdmin
    .from('clientes')
    .select('*')
    .eq('telefone', telefone)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function buscarReservasCliente(telefone: string) {
  const { data, error } = await supabaseAdmin
    .from('reservas')
    .select('*')
    .eq('telefone', telefone)
    .order('created_at', { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

export async function buscarReservaPendente(telefone: string) {
  const { data, error } = await supabaseAdmin
    .from('reservas')
    .select('*')
    .eq('telefone', telefone)
    .eq('status', 'pendente')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function verificarDisponibilidade(passeio: string, data: string): Promise<boolean> {
  const dataObj = new Date(data);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (dataObj < hoje) {
    return false;
  }

  const { count, error } = await supabaseAdmin
    .from('reservas')
    .select('*', { count: 'exact', head: true })
    .eq('passeio_nome', passeio)
    .eq('data_preferida', data)
    .in('status', ['pendente', 'confirmado']);

  if (error) {
    console.error('Erro ao verificar disponibilidade:', error);
    return true;
  }

  const limite = 40;
  return (count || 0) < limite;
}

export function gerarVoucher(): string {
  const prefixo = 'CT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const aleatorio = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefixo}-${timestamp}-${aleatorio}`;
}

export async function criarReservaCompleta(dados: {
  telefone: string;
  nome: string;
  email?: string;
  passeio_nome: string;
  passeio_id: string;
  data_preferida: string;
  numero_pessoas: number;
  observacoes?: string;
}) {
  const voucher = gerarVoucher();

  const { data: cliente } = await supabaseAdmin
    .from('clientes')
    .upsert({
      telefone: dados.telefone,
      nome: dados.nome,
      email: dados.email || null,
      whatsapp: dados.telefone,
    }, {
      onConflict: 'telefone',
    })
    .select()
    .single();

  const { data: reserva, error } = await supabaseAdmin
    .from('reservas')
    .insert({
      cliente_id: cliente?.id,
      nome_cliente: dados.nome,
      telefone: dados.telefone,
      whatsapp: dados.telefone,
      email: dados.email || null,
      passeio_nome: dados.passeio_nome,
      passeio_id: dados.passeio_id,
      data_preferida: dados.data_preferida,
      numero_pessoas: dados.numero_pessoas,
      observacoes: dados.observacoes || null,
      voucher: voucher,
      status: 'pendente',
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar reserva:', error);
    return null;
  }

  return reserva;
}

export async function cancelarReserva(reservaId: string) {
  const { data, error } = await supabaseAdmin
    .from('reservas')
    .update({
      status: 'cancelado',
      updated_at: new Date().toISOString(),
    })
    .eq('id', reservaId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao cancelar reserva:', error);
    return null;
  }

  return data;
}

export async function alterarDataReserva(reservaId: string, novaData: string) {
  const disponivel = await verificarDisponibilidade('', novaData);
  
  if (!disponivel) {
    return { success: false, message: 'Data sem disponibilidade' };
  }

  const { data, error } = await supabaseAdmin
    .from('reservas')
    .update({
      data_preferida: novaData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reservaId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao alterar data:', error);
    return { success: false, message: 'Erro ao alterar data' };
  }

  return { success: true, data };
}

export function formatarVoucher(reserva: any): string {
  const data = new Date(reserva.data_preferida);
  const dataFormatada = data.toLocaleDateString('pt-BR');

  return `🎫 *VOUCHER DE RESERVA*
━━━━━━━━━━━━━━━━━━━
📋 *Código:* ${reserva.voucher}
━━━━━━━━━━━━━━━━━━━

👤 *Cliente:* ${reserva.nome_cliente}
🚤 *Passeio:* ${reserva.passeio_nome}
📅 *Data:* ${dataFormatada}
👥 *Pessoas:* ${reserva.numero_pessoas}

⏰ *Check-in:* 10:30
🚢 *Saída:* 11:00
📍 *Local:* Cais da Praia dos Anjos

⚠️ *IMPORTANTE:*
• Chegue 30 minutos antes
• Taxa de embarque: R$10 (dinheiro)
• Proibido cooler

✅ *Status:* ${reserva.status.toUpperCase()}

_Apresente este voucher no embarque._
_Caleb's Tour - O Caribe Brasileiro!_ 🌊`;
}
