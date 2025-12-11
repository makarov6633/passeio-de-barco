import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Cliente {
  id?: string;
  nome: string;
  telefone: string;
  email?: string;
  created_at?: string;
}

export interface Passeio {
  id?: string;
  nome: string;
  descricao?: string;
  preco_min?: number;
  preco_max?: number;
  duracao?: string;
  local?: string;
  created_at?: string;
}

export interface Reserva {
  id?: string;
  cliente_id?: string;
  passeio_id?: string;
  data_passeio: string;
  num_pessoas: number;
  voucher: string;
  status?: string;
  observacoes?: string;
  created_at?: string;
  cliente?: Cliente;
  passeio?: Passeio;
}

export interface ConversationContext {
  id?: string;
  telefone: string;
  context: any;
  last_updated?: string;
}

export async function getOrCreateCliente(telefone: string, nome?: string): Promise<Cliente | null> {
  const { data: existing, error: searchError } = await supabase
    .from('clientes')
    .select('*')
    .eq('telefone', telefone)
    .single();

  if (existing) return existing;

  if (!nome) return null;

  const { data: newCliente, error: insertError } = await supabase
    .from('clientes')
    .insert({ nome, telefone })
    .select()
    .single();

  if (insertError) {
    console.error('Erro ao criar cliente:', insertError);
    return null;
  }

  return newCliente;
}

export async function getPasById(passeioId: string): Promise<Passeio | null> {
  const { data, error } = await supabase
    .from('passeios')
    .select('*')
    .eq('id', passeioId)
    .single();

  if (error) {
    console.error('Erro ao buscar passeio:', error);
    return null;
  }

  return data;
}

export async function getAllPaspos(): Promise<Passeio[]> {
  const { data, error } = await supabase
    .from('passeios')
    .select('*')
    .order('nome');

  if (error) {
    console.error('Erro ao buscar passeios:', error);
    return [];
  }

  return data || [];
}

export async function createReserva(reserva: Reserva): Promise<Reserva | null> {
  const { data, error } = await supabase
    .from('reservas')
    .insert(reserva)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar reserva:', error);
    return null;
  }

  return data;
}

export async function getAllReservas(): Promise<Reserva[]> {
  const { data, error } = await supabase
    .from('reservas')
    .select(`
      *,
      cliente:clientes(*),
      passeio:passeios(*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar reservas:', error);
    return [];
  }

  return data || [];
}

export async function updateReservaStatus(id: string, status: string): Promise<boolean> {
  const { error } = await supabase
    .from('reservas')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Erro ao atualizar reserva:', error);
    return false;
  }

  return true;
}

export async function getConversationContext(telefone: string): Promise<any> {
  const { data, error } = await supabase
    .from('conversation_contexts')
    .select('context')
    .eq('telefone', telefone)
    .single();

  if (error || !data) {
    return {};
  }

  return data.context || {};
}

export async function saveConversationContext(telefone: string, context: any): Promise<void> {
  const { data: existing } = await supabase
    .from('conversation_contexts')
    .select('id')
    .eq('telefone', telefone)
    .single();

  if (existing) {
    await supabase
      .from('conversation_contexts')
      .update({ context, last_updated: new Date().toISOString() })
      .eq('telefone', telefone);
  } else {
    await supabase
      .from('conversation_contexts')
      .insert({ telefone, context });
  }
}

export function generateVoucher(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  const part1 = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CT-${part1}-${part2}`;
}
