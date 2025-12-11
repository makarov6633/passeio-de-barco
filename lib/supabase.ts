import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Reserva = {
  id?: string;
  nome_cliente: string;
  email: string;
  telefone: string;
  whatsapp: string;
  passeio_id: string;
  passeio_nome: string;
  data_preferida: string;
  numero_pessoas: number;
  observacoes?: string;
  status: 'pendente' | 'confirmado' | 'cancelado' | 'realizado';
  valor_estimado?: number;
  created_at?: string;
  updated_at?: string;
};

export type Cliente = {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  whatsapp: string;
  total_reservas?: number;
  created_at?: string;
};
