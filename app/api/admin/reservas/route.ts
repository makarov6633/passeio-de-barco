import { NextResponse } from 'next/server';
import { getAllReservas } from '@/lib/supabase';

export async function GET() {
  try {
    const reservas = await getAllReservas();
    return NextResponse.json(reservas);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    return NextResponse.json({ error: 'Erro ao buscar reservas' }, { status: 500 });
  }
}
