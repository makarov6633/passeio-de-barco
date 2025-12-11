import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabaseAdmin
      .from('reservas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status && status !== 'todos') {
      query = query.eq('status', status);
    }

    const { data: reservas, error } = await query;

    if (error) {
      console.error('Erro ao listar reservas:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar reservas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservas,
    });
  } catch (error) {
    console.error('Erro no endpoint de listagem:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
