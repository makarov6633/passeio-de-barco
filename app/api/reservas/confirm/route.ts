import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendWhatsAppToClient, formatConfirmacaoFinal } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reserva_id, data_confirmada, horario, local } = body;

    if (!reserva_id) {
      return NextResponse.json(
        { error: 'ID da reserva é obrigatório' },
        { status: 400 }
      );
    }

    const { data: reserva, error: updateError } = await supabaseAdmin
      .from('reservas')
      .update({
        status: 'confirmado',
        data_confirmada: data_confirmada || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reserva_id)
      .select()
      .single();

    if (updateError || !reserva) {
      console.error('Erro ao confirmar reserva:', updateError);
      return NextResponse.json(
        { error: 'Erro ao confirmar reserva' },
        { status: 500 }
      );
    }

    await sendWhatsAppToClient(
      reserva.whatsapp,
      formatConfirmacaoFinal({
        nome: reserva.nome_cliente,
        passeio: reserva.passeio_nome,
        data: data_confirmada || reserva.data_preferida,
        horario: horario || '10:30',
        local: local || 'Cais da Praia dos Anjos - Arraial do Cabo',
      })
    );

    return NextResponse.json({
      success: true,
      reserva,
      message: 'Reserva confirmada!',
    });
  } catch (error) {
    console.error('Erro ao confirmar reserva:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
