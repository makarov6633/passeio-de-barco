import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { 
  sendWhatsAppToClient, 
  sendWhatsAppToBusiness, 
  formatReservaMessage, 
  formatConfirmacaoCliente 
} from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      nome_cliente,
      email,
      telefone,
      whatsapp,
      passeio_id,
      passeio_nome,
      data_preferida,
      numero_pessoas,
      observacoes,
    } = body;

    if (!nome_cliente || !telefone || !passeio_nome || !data_preferida) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    const { data: cliente, error: clienteError } = await supabaseAdmin
      .from('clientes')
      .upsert(
        {
          nome: nome_cliente,
          email: email || null,
          telefone: telefone,
          whatsapp: whatsapp || telefone,
        },
        { onConflict: 'telefone' }
      )
      .select()
      .single();

    if (clienteError) {
      console.error('Erro ao criar cliente:', clienteError);
      return NextResponse.json(
        { error: 'Erro ao salvar cliente' },
        { status: 500 }
      );
    }

    const { data: reserva, error: reservaError } = await supabaseAdmin
      .from('reservas')
      .insert({
        cliente_id: cliente.id,
        nome_cliente,
        email,
        telefone,
        whatsapp: whatsapp || telefone,
        passeio_id: passeio_id || passeio_nome,
        passeio_nome,
        data_preferida,
        numero_pessoas: numero_pessoas || 1,
        observacoes,
        status: 'pendente',
      })
      .select()
      .single();

    if (reservaError) {
      console.error('Erro ao criar reserva:', reservaError);
      return NextResponse.json(
        { error: 'Erro ao criar reserva' },
        { status: 500 }
      );
    }

    const whatsappCliente = whatsapp || telefone;
    
    await sendWhatsAppToClient(
      whatsappCliente,
      formatConfirmacaoCliente({
        nome: nome_cliente,
        passeio: passeio_nome,
        data: data_preferida,
      })
    );

    await sendWhatsAppToBusiness(
      formatReservaMessage({
        nome: nome_cliente,
        passeio: passeio_nome,
        data: data_preferida,
        pessoas: numero_pessoas || 1,
      })
    );

    return NextResponse.json({
      success: true,
      reserva,
      message: 'Reserva criada com sucesso!',
    });
  } catch (error) {
    console.error('Erro no endpoint de reserva:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
